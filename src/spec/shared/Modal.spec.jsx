import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Modal from "../../components/shared/Modal";

describe("Modal", () => {
  const mockOnClick = vi.fn();
  const modalContent = <div>Modal Content</div>;

  it("renders correctly with children", () => {
    const { getByText } = render(
      <Modal onClick={mockOnClick}>{modalContent}</Modal>,
    );

    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("closes when the close button is clicked", () => {
    const { getByAltText } = render(
      <Modal onClick={mockOnClick}>{modalContent}</Modal>,
    );

    const closeButton = getByAltText("close button");
    fireEvent.click(closeButton);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
