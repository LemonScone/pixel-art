import { screen } from "@testing-library/react";

import user from "@testing-library/user-event";

import PublishToggleSwitch from "./PublishToggleSwitch";
import { renderWithProviders } from "../utils/test-utils";
import { VALID_TOKEN, VALID_USER } from "../tests/fixtures/auth";
import { User } from "../types/Auth";
import projectsStore from "../tests/fixtures/projectsStore";

const renderComponent = ({ loggedIn = false }: { loggedIn?: boolean }) => {
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

  renderWithProviders(<PublishToggleSwitch />, {
    preloadedState: {
      auth: {
        data: authData,
      },
      projects: {
        present: projectsStore,
        past: [],
        future: [],
      },
    },
  });
};

describe("PublishToggleSwitch", () => {
  it("should render toggle switch", async () => {
    renderComponent({});

    const toggleSwitch = screen.getByRole("switch");
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).not.toBeChecked();

    const on = screen.getByText(/on/i);
    const off = screen.getByText(/off/i);
    expect(on).toBeInTheDocument();
    expect(off).toBeInTheDocument();
  });

  describe("when logged in", () => {
    it("should enable switch click", async () => {
      renderComponent({ loggedIn: true });

      const toggleSwitch = screen.getByRole("switch");
      await user.click(toggleSwitch);
      expect(toggleSwitch).toBeChecked();
    });
  });

  describe("when not logged in", () => {
    it("should disable switch click", async () => {
      renderComponent({});

      const toggleSwitch = screen.getByRole("switch");
      await user.click(toggleSwitch);
      expect(toggleSwitch).not.toBeChecked();
    });
  });
});
