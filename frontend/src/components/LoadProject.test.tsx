import { screen } from "@testing-library/react";
import { vi } from "vitest";

import { renderWithProviders } from "../utils/test-utils";

import { VALID_TOKEN, VALID_USER } from "../tests/fixtures/auth";

import LoadProject from "./LoadProject";

import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import { STORAGE_KEY } from "../constants";

import projectsStore from "../tests/fixtures/projectsStore";
import { User } from "../types/Auth";
import { saveProjectToStorage } from "../utils/storage";

const renderComponent = (loggedIn = true) => {
  const { password, ...user } = VALID_USER;

  const authData = loggedIn
    ? {
        user,
        accessToken: VALID_TOKEN,
        expired: 3600,
      }
    : {
        user: {} as User,
        expired: 0,
        accessToken: "",
      };

  renderWithProviders(
    <MemoryRouter>
      <LoadProject />
    </MemoryRouter>,
    {
      preloadedState: {
        auth: {
          data: authData,
        },
        projects: projectsStore,
      },
    }
  );
};

describe("LoadProject", () => {
  describe("when click button", () => {
    it("should open modal", async () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /load/i });
      await user.click(button);

      const modalHeader = screen.getByRole("heading", {
        name: /load project/i,
      });
      expect(modalHeader).toBeInTheDocument();
    });
  });

  describe("when logged in", () => {
    it("should render user's projects", async () => {
      renderComponent();

      const button = screen.getByRole("button", { name: /load/i });
      await user.click(button);

      const deleteButtons = await screen.findAllByRole("button", {
        name: /delete/i,
      });
      expect(deleteButtons).toHaveLength(3);
    });
  });

  describe("when not logged in", () => {
    it("should render user's projects from localStorage", async () => {
      const getItemSpy = vi.spyOn(Storage.prototype, "getItem");

      afterEach(() => {
        localStorage.clear();
      });

      const { data: project } = projectsStore;

      saveProjectToStorage(project);

      renderComponent(false);

      const button = screen.getByRole("button", { name: /load/i });
      await user.click(button);

      const deleteButtons = await screen.findAllByRole("button", {
        name: /delete/i,
      });

      expect(deleteButtons).toHaveLength(1);
      expect(getItemSpy).toHaveBeenCalledWith(STORAGE_KEY);
    });
  });
});
