import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";
import user from "@testing-library/user-event";

import ToolConatiner from "./ToolContainer";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = () => {
  renderWithProviders(
    <ToolConatiner />,
    {
      preloadedState: {
        projects: {
          present: { ...projectsStore, selectedTool: "pen" },
          past: [],
          future: [],
        },
      },
    },
    true
  );
};

describe("ToolContainer", () => {
  describe("when rendered", () => {
    it("should render tool buttons", () => {
      renderComponent();

      const undoButton = screen.getByRole("button", {
        name: /undo/i,
      });
      const redoButton = screen.getByRole("button", {
        name: /redo/i,
      });
      const bucketButton = screen.getByRole("button", {
        name: /bucket/i,
      });
      const pencilButton = screen.getByRole("button", {
        name: /pencil/i,
      });
      const eraserButton = screen.getByRole("button", {
        name: /eraser/i,
      });
      const MoveButton = screen.getByRole("button", {
        name: /move/i,
      });

      expect(undoButton).toBeInTheDocument();
      expect(redoButton).toBeInTheDocument();
      expect(bucketButton).toBeInTheDocument();
      expect(pencilButton).toBeInTheDocument();
      expect(eraserButton).toBeInTheDocument();
      expect(MoveButton).toBeInTheDocument();
    });
  });

  describe("when click the eraser button after pen toolbar visible", () => {
    it("shows eraser toolbar and pen toolbar is not visible", async () => {
      renderComponent();

      const pencilButton = screen.getByRole("button", {
        name: /pencil/i,
      });
      await user.click(pencilButton);

      const penSizeSelectToolbar = screen.getByRole("toolbar", {
        name: /select pencil size/i,
      });

      expect(penSizeSelectToolbar).toBeVisible();

      const eraserButton = screen.getByRole("button", {
        name: /eraser/i,
      });
      await user.click(eraserButton);

      const eraserSizeSelectToolbar = screen.getByRole("toolbar", {
        name: /select eraser size/i,
      });

      expect(eraserSizeSelectToolbar).toBeVisible();
      expect(penSizeSelectToolbar).not.toBeVisible();
    });
  });
});
