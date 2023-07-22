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
    it("should show sign in, sign up button", async () => {
      renderComponent({
        auth: {
          user: { email: "", username: "", current: 0, provider: "" },
          accessToken: "",
          expired: 0,
        },
      });

      const signInButton = screen.getByText(/sign in/i);
      const signUpButton = screen.getByText(/sign up/i);

      expect(signInButton).toBeInTheDocument();
      expect(signUpButton).toBeInTheDocument();
    });
  });
  describe("when the user is authenticated", () => {
    it("should show sign out button", async () => {
      const auth = {
        user: VALID_USER,
        accessToken: VALID_TOKEN,
        expired: 0,
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

    it("should not show sign up button", async () => {
      const auth = {
        user: VALID_USER,
        accessToken: VALID_TOKEN,
        expired: 0,
      };
      renderComponent({ auth });

      const signOutButton = screen.getByRole("button", {
        name: /sign out/i,
      });

      expect(signOutButton).toBeInTheDocument();
      await user.click(signOutButton);

      const signUpButton = screen.getByText(/sign up/i);
      expect(signUpButton).toBeInTheDocument();
    });
  });
});
