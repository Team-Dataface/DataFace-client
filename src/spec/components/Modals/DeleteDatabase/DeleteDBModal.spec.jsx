import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { showDeleteDBModalAtom } from "../../../../atoms/atoms";

import DeleteDBModal from "../../../../components/Modals/DeleteDatabase/DeleteDBModal";

const queryClient = new QueryClient();

const mocks = {
  setShowDeleteDBModal: vi.fn(),
};

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === showDeleteDBModalAtom) {
        return mocks.setShowDeleteDBModal;
      }
      return vi.fn();
    },
  };
});

describe("DeleteDBModal", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <DeleteDBModal />
        </Provider>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders title well", () => {
    expect(screen.getByText("Are you sure you want to permanently delete this database?")).toBeInTheDocument;
  });

  it("closes the modal when cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(mocks.setShowDeleteDBModal).toHaveBeenCalledWith(false);
  });

  it("closes the modal when close button is clicked", () => {
    const closeButton = screen.getByAltText("close button");

    fireEvent.click(closeButton);

    expect(mocks.setShowDeleteDBModal).toHaveBeenCalledWith(false);
  });
});
