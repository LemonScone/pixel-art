import { render, screen } from "@testing-library/react";

import user from "@testing-library/user-event";

import PixelSize from "./PixelSize";
import { vi } from "vitest";

const renderComponent = ({ value }: { value: number }) => {
  const onChangePixelSize = vi.fn();

  render(<PixelSize value={value} onChangePixelSize={onChangePixelSize} />);

  return { onChangePixelSize };
};

describe("PixelSize", () => {
  describe("when rendered", () => {
    it("should render input that has defaultValue", () => {
      const value = 10;
      renderComponent({ value });

      const input = screen.getByRole("spinbutton") as HTMLInputElement;
      expect(input.valueAsNumber).toBe(value);
    });

    it("calls onChangePixelSize when the input changes", async () => {
      const value = 1;
      const { onChangePixelSize } = renderComponent({ value });

      const input = screen.getByRole("spinbutton") as HTMLInputElement;

      await user.click(input);
      await user.keyboard("[backspace]");
      await user.keyboard("2");

      expect(onChangePixelSize).toHaveBeenCalled();
      expect(onChangePixelSize).toHaveBeenCalledWith(12);
    });
  });
});
