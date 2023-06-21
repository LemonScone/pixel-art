import { render, screen } from "@testing-library/react";

import { vi } from "vitest";

import user from "@testing-library/user-event";

import NumberPicker from "./NumberPicker";

const renderComponent = ({
  name = "width",
  value = 20,
}: {
  name?: string;
  value?: number;
}) => {
  const onIncrease = vi.fn();
  const onDecrease = vi.fn();

  render(
    <NumberPicker
      value={value}
      name={name}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
    />
  );

  return { onIncrease, onDecrease };
};

describe("NumberPicker", () => {
  describe("when rendered", () => {
    it("should render name label", () => {
      const name = "height";
      renderComponent({ name });

      const nameLabel = screen.getByLabelText(name);
      expect(nameLabel).toBeInTheDocument();

      const nameInput = screen.getByRole("spinbutton", { name });
      expect(nameInput).toBeInTheDocument();
    });

    it("should render '-', '+' button", () => {
      renderComponent({});

      const decreaseButton = screen.getByRole("button", { name: "-" });
      const increaseButton = screen.getByRole("button", { name: "+" });

      expect(decreaseButton).toBeInTheDocument();
      expect(increaseButton).toBeInTheDocument();
    });

    it("should render input that has defaultValue and disabled", () => {
      const value = 10;
      const name = "input";
      renderComponent({ value, name });

      const input = screen.getByRole("spinbutton", {
        name,
      }) as HTMLInputElement;
      expect(input).toBeDisabled();
      expect(input.valueAsNumber).toBe(value);
    });
  });

  describe("when click increase button", () => {
    it("calls onIncrease", async () => {
      const { onIncrease } = renderComponent({});

      const increseButton = screen.getByRole("button", { name: "+" });

      await user.click(increseButton);
      expect(onIncrease).toHaveBeenCalled();
    });
  });

  describe("when click decrease button", () => {
    it("calls onDecrease", async () => {
      const { onDecrease } = renderComponent({});

      const decreseButton = screen.getByRole("button", { name: "-" });

      await user.click(decreseButton);
      expect(onDecrease).toHaveBeenCalled();
    });
  });
});
