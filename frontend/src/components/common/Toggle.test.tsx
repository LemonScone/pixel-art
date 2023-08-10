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
  checked = true,
}: {
  label?: string;
  disabled?: boolean;
  onChange?: () => void;
  checked?: boolean;
}) => {
  render(
    <Toggle
      id="test"
      label={label}
      disabled={disabled}
      onChange={onChange}
      checked={checked}
    />
  );
};

describe("Toggle", () => {
  describe("when rendered", () => {
    it("should render with label", () => {
      const label = "test label";
      const checked = true;
      renderComponent({ label, checked });

      const checkbox = screen.getByRole("checkbox", {
        name: label,
      });
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });
  });

  describe("when enabled", () => {
    it("should call onChange handler", async () => {
      const disabled = false;
      const label = "test label";
      const onChange = vi.fn();
      const checked = true;
      renderComponent({ label, disabled, onChange, checked });

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
      const checked = true;
      renderComponent({ label, disabled, onChange, checked });

      const checkbox = screen.getByRole("checkbox", {
        name: label,
      });

      await user.click(checkbox);

      expect(onChange).not.toHaveBeenCalled();
      expect(checkbox).toBeChecked();
    });
  });
});
