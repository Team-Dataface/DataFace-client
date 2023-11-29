import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { showDeleteRelationshipModalAtom } from "../../../../atoms/atoms";

import DeleteRelationshipModal from "../../../../components/Modals/DeleteRelationship/DeleteRelationshipModal";

const queryClient = new QueryClient();

const mocks = {
  setShowDeleteRelationshipModal: vi.fn(),
};

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === showDeleteRelationshipModalAtom) {
        return mocks.setShowDeleteRelationshipModal;
      }
      return vi.fn();
    },
  };
});

describe("DeleteRelationshipModal", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <DeleteRelationshipModal />
        </Provider>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders title well", () => {
    const title = screen.getByText("Deleting this portal will also remove the existing relationships. Are you sure you want to proceed?");
    expect(title).toBeInTheDocument;
  });

  it("closes the modal when cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(mocks.setShowDeleteRelationshipModal).toHaveBeenCalledWith(false);
  });

  it("closes the modal when close button is clicked", () => {
    const closeButton = screen.getByAltText("close button");

    fireEvent.click(closeButton);

    expect(mocks.setShowDeleteRelationshipModal).toHaveBeenCalledWith(false);
  });
});
