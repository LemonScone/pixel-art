import { render, screen } from "@testing-library/react";
import PublishToggleSwitch from "./PublishToggleSwitch";

describe("PublishToggleSwitch", () => {
  it("should render toggle switch", async () => {
    render(<PublishToggleSwitch />);

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toBeInTheDocument();

    const on = screen.getByText(/on/i);
    const off = screen.getByText(/off/i);
    expect(on).toBeInTheDocument();
    expect(off).toBeInTheDocument();
  });
});
