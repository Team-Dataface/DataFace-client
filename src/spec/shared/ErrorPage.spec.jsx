import { vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ErrorPage from "../../components/shared/ErrorPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ErrorPage", () => {
  const error = { status: 500, message: "Server Error" };
  const originalLocation = window.location;

  beforeEach(() => {
    delete global.window.location;
    global.window.location = { ...originalLocation, reload: vi.fn() };

    render(
      <MemoryRouter>
        <ErrorPage error={error} />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    global.window.location = originalLocation;
  });

  it("displays the correct error message and status", () => {
    expect(screen.getByText(`Error Code: ${error.status}`)).toBeInTheDocument();
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });

  it("navigates to login on button click", () => {
    fireEvent.click(screen.getByText("Login"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("has a retry button that is clickable", () => {
    const retryButton = screen.getByText("Retry");

    expect(retryButton).toBeInTheDocument();
    expect(() => fireEvent.click(retryButton)).not.toThrow();
  });
});
