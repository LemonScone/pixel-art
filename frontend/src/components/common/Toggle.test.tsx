import { vi } from "vitest";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import Toggle from "./Toggle";

const renderComponent = ({
  label = "test label",
  disabled = false,
  onChange = () => {
    /* onChange */
  },
}: {
  label?: string;
  disabled?: boolean;
  onChange?: () => void;
}) => {
  render(
    <Toggle id="test" label={label} disabled={disabled} onChange={onChange} />
  );
};

describe("Toggle", () => {
  describe("when rendered", () => {
    it("should render with label", () => {
      const label = "test label";
      renderComponent({ label });

      const checkbox = screen.getByRole("checkbox", {
        name: label,
      });
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe("when enabled", () => {
    it("should call onChange handler", async () => {
      const disabled = false;
      const label = "test label";
      const onChange = vi.fn();
      renderComponent({ label, disabled, onChange });

      const checkbox = screen.getByRole("checkbox", {
        name: label,
      });

      await user.click(checkbox);

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe("when disabled", () => {
    it("should not call onChange handler", async () => {
      const disabled = true;
      const label = "test label";
      const onChange = vi.fn();
      renderComponent({ label, disabled, onChange });

      const checkbox = screen.getByRole("checkbox", {
        name: label,
      });

      await user.click(checkbox);

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
