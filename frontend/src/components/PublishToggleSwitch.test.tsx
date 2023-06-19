import { render, screen } from "@testing-library/react";
import PublishToggleSwitch from "./PublishToggleSwitch";

describe("PublishToggleSwitch", () => {
  it("should render ON, OFF text", () => {
    render(<PublishToggleSwitch />);

    expect(screen).toHaveTextContent("ON");
    expect(screen).toHaveTextContent("OFF");
  });
});
