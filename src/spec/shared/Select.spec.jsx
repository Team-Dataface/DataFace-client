import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Select from "../../components/shared/Select";

describe("Select", () => {
  const mockUpdateFieldType = vi.fn();
  const options = ["Option 1", "Option 2", "Option 3"];
  const index = 0;

  it("renders with given options", () => {
    const { getByRole } = render(
      <Select
        options={options}
        updateFieldType={mockUpdateFieldType}
        index={index}
      />,
    );

    const select = getByRole("combobox");

    expect(select.children.length).toBe(options.length);
    options.forEach((option, idx) => {
      expect(select.children[idx]).toHaveTextContent(option);
    });
  });

  it("triggers updateFieldType on option select", () => {
    const { getByRole } = render(
      <Select
        options={options}
        updateFieldType={mockUpdateFieldType}
        index={index}
      />,
    );

    const select = getByRole("combobox");
    fireEvent.change(select, { target: { value: options[1] } });

    expect(mockUpdateFieldType).toHaveBeenCalledWith(index, expect.anything());
    expect(mockUpdateFieldType).toHaveBeenCalledTimes(1);
  });
});
