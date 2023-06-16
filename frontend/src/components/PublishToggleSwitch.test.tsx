import { render } from "@testing-library/react";
import PublishToggleSwitch from "./PublishToggleSwitch";

describe("PublishToggleSwitch", () => {
  it("should render ON, OFF text", () => {
    const { container } = render(<PublishToggleSwitch />);

    expect(container).toHaveTextContent("ON");
    expect(container).toHaveTextContent("OFF");
  });
});
