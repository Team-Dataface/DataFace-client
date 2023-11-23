import { render } from "@testing-library/react";
import Loading from "../../components/shared/Loading";

describe("Loading", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Loading />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("has correct structure", () => {
    const { container } = render(<Loading />);

    expect(container.firstChild).toHaveClass("fixed");
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("justify-center");
    expect(container.firstChild).toHaveClass("items-center");

    const spinner = container.querySelector(".animate-spin");

    expect(spinner).toBeInTheDocument();
    expect(container.querySelectorAll(".border-4").length).toBe(2);
  });

  it("has correct spinner animation", () => {
    const { container } = render(<Loading />);
    const spinnerParts = container.querySelectorAll(".border-4");

    expect(spinnerParts[0]).toHaveClass("animate-spin");
    expect(spinnerParts[1]).toHaveClass("animate-spin-reverse");
  });
});
