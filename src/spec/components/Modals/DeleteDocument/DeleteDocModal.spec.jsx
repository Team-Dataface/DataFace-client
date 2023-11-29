import { fireEvent, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { showDeleteDocumentModalAtom, isLastDocumentAtom } from "../../../../atoms/atoms";

import DeleteDocModal from "../../../../components/Modals/DeleteDocument/DeleteDocModal";

const queryClient = new QueryClient();

const mocks = {
  setShowDeleteDocumentModal: vi.fn(),
  setIsLastDocument: vi.fn(),
  isLastDocument: false,
};

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === showDeleteDocumentModalAtom) {
        return mocks.setShowDeleteDocumentModal;
      }
      return vi.fn();
    },
    useAtom: (atom) => {
      if (atom === isLastDocumentAtom) {
        return [mocks.isLastDocument, mocks.setIsLastDocument];
      }
      return [];
    },
  };
});

describe("DeleteDocModal in normal pattern", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <DeleteDocModal />
        </Provider>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders delete confirmation message", () => {
    expect(screen.getByText("Are you sure you want to permanently delete this document?")).toBeInTheDocument;
  });

  it("renders delete button well", () => {
    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toBeInTheDocument;
  });

  it("closes the modal when cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(cancelButton);

    expect(mocks.setShowDeleteDocumentModal).toHaveBeenCalledWith(false);
  });

  it("closes the modal when close button is clicked", () => {
    const closeButton = screen.getByAltText("close button");

    fireEvent.click(closeButton);

    expect(mocks.setShowDeleteDocumentModal).toHaveBeenCalledWith(false);
  });
});

describe("DeleteDocModal in edge case", () => {
  beforeEach(() => {
    mocks.isLastDocument = true;

    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <DeleteDocModal />
        </Provider>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders warning well", () => {
    expect(screen.getByText("Please ensure that the database contains at least one document before proceeding")).toBeInTheDocument;
  });

  it("renders cancel button well", () => {
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument;
  });
});

