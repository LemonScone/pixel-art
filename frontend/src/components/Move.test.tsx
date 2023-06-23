import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Move from "./Move";

const renderComponent = () => {
  const onChageTool = vi.fn();

  render(<Move selected={true} onChangeTool={onChageTool} />);
};

describe("Move", () => {
  describe("when rendered", () => {
    it("should render a move button", () => {
      renderComponent();

      const moveButton = screen.getByRole("button", {
        name: /move/i,
      });
      expect(moveButton).toBeInTheDocument();
      expect(moveButton).toHaveClass("bg-primary-color-600");
      expect(moveButton).toHaveClass("hover:bg-primary-color");
      expect(moveButton).toHaveClass("focus:ring-offset-primary-color");
      expect(moveButton).toHaveClass("text-gray-900");
    });
  });
});
