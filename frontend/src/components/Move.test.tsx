import { screen } from "@testing-library/react";
import Move from "./Move";
import { renderWithProviders } from "../utils/test-utils";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = () => {
  renderWithProviders(<Move />, {
    preloadedState: {
      projects: {
        present: { ...projectsStore, selectedTool: "move" },
        past: [],
        future: [],
      },
    },
  });
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
