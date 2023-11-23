import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { showCreateDBModalAtom } from '../../../../atoms/atoms';

import CreateDBModal from "../../../../components/Modals/CreateNewDatabase/CreateDBModal"

const queryClient = new QueryClient();

const mocks = {
  setShowCreateDBModal: vi.fn(),
  navigate: vi.fn(),
};

vi.mock("jotai", async () => {
  const actualJotai = await vi.importActual("jotai");

  return {
    ...actualJotai,
    useSetAtom: (atom) => {
      if (atom === showCreateDBModalAtom) {
        return mocks.setShowCreateDBModal;
      }
      return vi.fn();
    },
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

describe("AddDocModal", () => {
  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider>
          <CreateDBModal />
        </Provider>
      </QueryClientProvider>
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders title well", () => {
    expect(screen.getByText("Create New Database")).toBeInTheDocument;
  });

  it("renders add and submit buttons well", () => {
    const closeButton = screen.getByAltText("close button");
    const submitButton = screen.getByText("Submit");

    expect(closeButton).toBeInTheDocument;
    expect(submitButton).toBeInTheDocument;
  });

  it("renders input well", () => {
    const dbNameInput = screen.getByLabelText("Database Name");

    fireEvent.change(dbNameInput, { target: { value: "Test" } });

    expect(dbNameInput.value).toBe("Test");
  });

  it("closes the modal when close button is clicked", () => {
    const closeButton = screen.getByAltText("close button");

    fireEvent.click(closeButton);

    expect(mocks.setShowCreateDBModal).toHaveBeenCalledWith(false);
  });

  it("should add one more input when add button is clicked", async () => {
    const addButton = screen.getByAltText("add button");

    fireEvent.click(addButton);

    const FieldNameInputs = screen.getAllByTestId("field name");
    expect(FieldNameInputs.length).toBe(2);
  });

  it("should delete input when bin button is clicked", async () => {
    const addButton = screen.getByAltText("add button");

    fireEvent.click(addButton);

    const binButton = screen.getAllByAltText("bin icon");

    fireEvent.click(binButton[1]);

    const FieldNameInputs = screen.getAllByTestId("field name");

    expect(FieldNameInputs.length).toBe(1);
  });

  it("should not submit when database's name is empty", () => {
    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);

    const warning = screen.getByText("Database's name cannot be empty.");

    expect(warning).toBeInTheDocument;
  });

  it("should not submit when field's name is empty", async () => {
    const dbNameInput = screen.getByLabelText("Database Name");

    fireEvent.change(dbNameInput, { target: { value: "Test" } });

    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);

    const warning = screen.getByText("Field's name cannot be empty.");

    expect(warning).toBeInTheDocument;
  });

  it("should not submit when field's names are duplicated", async () => {
    const dbNameInput = screen.getByLabelText("Database Name");

    fireEvent.change(dbNameInput, { target: { value: "Test" } });

    const addButton = screen.getByAltText("add button");

    fireEvent.click(addButton);

    const FieldNameInputs = screen.getAllByTestId("field name");

    FieldNameInputs.forEach(input => {
      fireEvent.change(input, { target: { value: "Test" } });
    });

    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);

    const warning = screen.getByText("Field's name cannot be same.");

    expect(warning).toBeInTheDocument;
  });
});
