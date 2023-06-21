import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import user from "@testing-library/user-event";

import PublishToggleSwitch from "./PublishToggleSwitch";

const renderComponent = ({ checked }: { checked: boolean }) => {
  const onToggleSwitch = vi.fn();

  const { rerender } = render(
    <PublishToggleSwitch checked={checked} onToggleSwitch={onToggleSwitch} />
  );

  return { onToggleSwitch, rerender };
};
describe("PublishToggleSwitch", () => {
  it("should render toggle switch", async () => {
    renderComponent({ checked: true });

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toBeInTheDocument();

    const on = screen.getByText(/on/i);
    const off = screen.getByText(/off/i);
    expect(on).toBeInTheDocument();
    expect(off).toBeInTheDocument();
  });

  it("calls onToggleSwitch when switch click", async () => {
    const { onToggleSwitch } = renderComponent({ checked: true });

    const toggleSwitch = screen.getByRole("switch");
    await user.click(toggleSwitch);

    expect(onToggleSwitch).toHaveBeenCalled();
  });
});
