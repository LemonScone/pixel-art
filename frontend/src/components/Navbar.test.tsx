import { renderWithProviders } from "../utils/test-utils";

import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "./Navbar";

import { VALID_TOKEN, VALID_USER } from "../tests/fixtures/auth";

import user from "@testing-library/user-event";

import { Auth } from "../types/Auth";

const renderComponent = ({ auth }: { auth: Auth }) => {
  renderWithProviders(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
    {
      preloadedState: {
        auth: {
          data: auth,
        },
      },
    }
  );
};

describe("Navbar", () => {
  describe("when the user is not authenticated", () => {
    it("should show sign in button", async () => {
      renderComponent({
        auth: {
          user: { userId: "", nickname: "", current: 0, provider: "" },
          accessToken: "",
        },
      });

      const signInButton = screen.getByText(/sign in/i);

      expect(signInButton).toBeInTheDocument();
    });
  });
  describe("when the user is authenticated", () => {
    it("should show sign out button", async () => {
      const auth = {
        user: VALID_USER,
        accessToken: VALID_TOKEN,
      };
      renderComponent({ auth });

      const signOutButton = screen.getByRole("button", {
        name: /sign out/i,
      });

      expect(signOutButton).toBeInTheDocument();
      await user.click(signOutButton);

      const signInButton = screen.getByText(/sign in/i);
      expect(signInButton).toBeInTheDocument();
    });
  });
});