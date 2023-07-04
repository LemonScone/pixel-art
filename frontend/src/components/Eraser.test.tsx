import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import user from "@testing-library/user-event";

import Eraser from "./Eraser";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = () => {
  renderWithProviders(
    <Eraser />,
    {
      preloadedState: {
        projects: { ...projectsStore, selectedTool: "eraser" },
      },
    },
    true
  );
};

describe("Eraser", () => {
  describe("when rendered", () => {
    it("should render a eraser button", () => {
      renderComponent();

      const eraserButton = screen.getByRole("button", {
        name: /eraser/i,
      });
      expect(eraserButton).toBeInTheDocument();
      expect(eraserButton).toHaveClass("bg-primary-color-600");
      expect(eraserButton).toHaveClass("hover:bg-primary-color");
      expect(eraserButton).toHaveClass("focus:ring-offset-primary-color");
      expect(eraserButton).toHaveClass("text-gray-900");
    });

    test("the size select toolbar should not be visible", () => {
      renderComponent();

      const sizeSelectToolbar = screen.getByRole("toolbar", {
        hidden: true,
      });
      expect(sizeSelectToolbar).not.toBeVisible();
    });
  });

  describe("when click the eraser button", () => {
    it("should show the size select toolbar", async () => {
      renderComponent();

      const eraserButton = screen.getByRole("button", {
        name: /eraser/i,
      });
      await user.click(eraserButton);

      const sizeSelectToolbar = screen.getByRole("toolbar", {
        name: /select eraser size/i,
      });

      expect(sizeSelectToolbar).toBeVisible();

      const sizeButton = within(sizeSelectToolbar).getByRole("button", {
        name: "1",
      });

      expect(sizeButton).toHaveClass("bg-gray-200");
    });
  });

  describe("when click the button in toolbar", () => {
    it("calls onChangeToolSize", async () => {
      renderComponent();

      const eraserButton = screen.getByRole("button", {
        name: /eraser/i,
      });
      await user.click(eraserButton);

      const sizeSelectToolbar = screen.getByRole("toolbar", {
        name: /select eraser size/i,
      });

      const sizeButton = within(sizeSelectToolbar).getByRole("button", {
        name: "2",
      });

      await user.click(sizeButton);
      expect(sizeButton).toHaveClass("bg-gray-200");
    });
  });
});
