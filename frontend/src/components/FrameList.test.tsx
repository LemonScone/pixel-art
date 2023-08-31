import { screen } from "@testing-library/react";

import { renderWithProviders } from "../utils/test-utils";

import user from "@testing-library/user-event";

import projectsStore, { exampleState } from "../tests/fixtures/projectsStore";

import FrameList from "./FrameList";
import { vitest } from "vitest";

const renderComponent = (project = projectsStore) => {
  const preloadedState = {
    projects: {
      present: { ...projectsStore, project },
      past: [],
      future: [],
    },
  };
  renderWithProviders(<FrameList />, {
    preloadedState,
  });
};

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vitest.fn();
});

describe("FrameList", () => {
  describe("when click add button", () => {
    it("should render 1 more frame", async () => {
      renderComponent();

      const newButton = screen.getByRole("button", { name: /new/i });
      await user.click(newButton);

      const deleteButton = screen.getAllByRole("button", { name: /delete/i });

      expect(deleteButton).toHaveLength(2);
    });
  });

  describe("when only one frame rendered", () => {
    it("should render disabled delete button", () => {
      renderComponent();

      const deleteButton = screen.getByRole("button", { name: /delete/i });
      expect(deleteButton).toBeDisabled();
    });
  });

  describe("when click copy button", () => {
    it("should render 1 more copy frame", async () => {
      renderComponent();

      const copyButton = screen.getByRole("button", { name: /copy/i });
      await user.click(copyButton);

      const deleteButton = screen.getAllByRole("button", { name: /delete/i });
      expect(deleteButton).toHaveLength(2);
    });
  });

  describe("when click delete button", () => {
    it("should render 1 less frame", async () => {
      const COLS = 5;
      const ROWS = 5;

      const grid = Array.from({ length: COLS * ROWS }, () => "");
      const project = exampleState(grid, COLS, ROWS);

      const id = 1;
      project.data.frameIds.push(id);
      project.data.indexedFrames[id] = {
        id,
        projectId: project.data.id,
        grid,
        animateInterval: 10,
      };

      renderComponent(project);

      const deleteButton = screen.getAllByRole("button", { name: /delete/i });
      await user.click(deleteButton[0]);

      const copyButton = screen.getAllByRole("button", { name: /copy/i });
      expect(copyButton).toHaveLength(1);
    });
  });
});
