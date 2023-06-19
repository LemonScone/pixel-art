import { screen } from "@testing-library/react";
import { render } from "../utils/test-utils";
import { vi } from "vitest";
import user from "@testing-library/user-event";

import ToolConatiner from "./ToolConatiner";
import { INITIAL_TOOL_OPTIONS } from "../constants";

const renderComponent = () => {
  const onChageTool = vi.fn();
  const onChangeToolSize = vi.fn();

  render(
    <ToolConatiner
      selectedTool="pen"
      toolOptions={INITIAL_TOOL_OPTIONS}
      onChangeToolSize={onChangeToolSize}
      onChangeTool={onChageTool}
    />
  );

  return { onChageTool, onChangeToolSize };
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
      const eyeDropperButton = screen.getByRole("button", {
        name: /eye dropper/i,
      });
      const MoveButton = screen.getByRole("button", {
        name: /move/i,
      });

      expect(undoButton).toBeInTheDocument();
      expect(redoButton).toBeInTheDocument();
      expect(bucketButton).toBeInTheDocument();
      expect(pencilButton).toBeInTheDocument();
      expect(eraserButton).toBeInTheDocument();
      expect(eyeDropperButton).toBeInTheDocument();
      expect(MoveButton).toBeInTheDocument();
    });
  });

  describe("when click tools", () => {
    it("calls onChangeTool", async () => {
      const { onChageTool } = renderComponent();

      const pencilButton = screen.getByRole("button", {
        name: /pencil/i,
      });

      await user.click(pencilButton);

      expect(onChageTool).toHaveBeenCalled();
      expect(onChageTool).toHaveBeenCalledWith({ tool: "pen" });

    });
  });
});
