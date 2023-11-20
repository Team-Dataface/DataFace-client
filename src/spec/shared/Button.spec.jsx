import { render } from "@testing-library/react";
import Button from "../../components/shared/Button";

describe("Button", () => {
  it("renders well", () => {
    const { getByText } = render(<Button>submit</Button>);

    expect(getByText("submit")).toBeInTheDocument();
  });

  it("class is applied well", () => {
    const { getByText } = render(
      <Button className="test">submit</Button>,
    );

    expect(getByText("submit")).toHaveClass("test");
  });

  it("type is applied well", () => {
    const { getByText } = render(
      <Button type="submit">Submit</Button>
    );

    const button = getByText("Submit");

    expect(button.type).toBe("submit");
  });
});
