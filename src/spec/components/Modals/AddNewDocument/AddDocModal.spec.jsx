import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { showAddDocumentModalAtom } from '../../../../atoms/atoms';

import AddDocModal from "../../../../components/Modals/AddNewDocument/AddDocModal";

const queryClient = new QueryClient();

const mocks = {
  setShowAddDocumentModal: vi.fn(),
};

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === showAddDocumentModalAtom) {
        return mocks.setShowAddDocumentModal;
      }
      return vi.fn();
    },
  };
});

describe("AddDocModal", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <AddDocModal />
        </Provider>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders title well", () => {
    expect(screen.getByText("Add New Document")).toBeInTheDocument;
  });

  it("renders add button and submit button well", () => {
    const closeButton = screen.getByAltText("close button");
    const submitButton = screen.getByText("Submit");

    expect(closeButton).toBeInTheDocument;
    expect(submitButton).toBeInTheDocument;
  });

  it("closes the modal when close button is clicked", () => {
    const closeButton = screen.getByAltText("close button");

    fireEvent.click(closeButton);

    expect(mocks.setShowAddDocumentModal).toHaveBeenCalledWith(false);
  });
});
