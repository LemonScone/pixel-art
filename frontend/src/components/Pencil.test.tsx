import { screen, within } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import user from "@testing-library/user-event";

import Pencil from "./Pencil";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = () => {
  renderWithProviders(
    <Pencil />,
    {
      preloadedState: {
        projects: { ...projectsStore, selectedTool: "pen" },
      },
    },
    true
  );
};

describe("Pencil", () => {
  describe("when rendered", () => {
    it("should render a pencil button", () => {
      renderComponent();

      const pencilButton = screen.getByRole("button", {
        name: /pencil/i,
      });
      expect(pencilButton).toBeInTheDocument();
      expect(pencilButton).toHaveClass("bg-primary-color-600");
      expect(pencilButton).toHaveClass("hover:bg-primary-color");
      expect(pencilButton).toHaveClass("focus:ring-offset-primary-color");
      expect(pencilButton).toHaveClass("text-gray-900");
    });

    test("the size select toolbar should not be visible", () => {
      renderComponent();

      const sizeSelectToolbar = screen.getByRole("toolbar", {
        hidden: true,
      });
      expect(sizeSelectToolbar).not.toBeVisible();
    });
  });

  describe("when click the pencil button", () => {
    it("should show the size select toolbar", async () => {
      renderComponent();

      const pencilButton = screen.getByRole("button", {
        name: /pencil/i,
      });
      await user.click(pencilButton);

      const sizeSelectToolbar = screen.getByRole("toolbar", {
        name: /select pencil size/i,
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

      const pencilButton = screen.getByRole("button", {
        name: /pencil/i,
      });
      await user.click(pencilButton);

      const sizeSelectToolbar = screen.getByRole("toolbar", {
        name: /select pencil size/i,
      });

      const sizeButton = within(sizeSelectToolbar).getByRole("button", {
        name: "2",
      });

      await user.click(sizeButton);

      expect(sizeButton).toHaveClass("bg-gray-200");
    });
  });
});
