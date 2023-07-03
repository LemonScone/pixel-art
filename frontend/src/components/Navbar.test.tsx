import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Navbar from "./Navbar";
import AuthContext, { AuthContextData } from "../contexts";

import { VALID_USER } from "../tests/fixtures/auth";

import { vi } from "vitest";

import user from "@testing-library/user-event";
import { Auth } from "../contexts/AuthContext";

const renderComponent = ({ auth }: Partial<AuthContextData>) => {
  const signIn = vi.fn();
  const signOut = vi.fn();

  render(
    <MemoryRouter>
      <AuthContext.Provider value={{ auth: auth as Auth, signIn, signOut }}>
        <Navbar />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return { signIn, signOut };
};

describe("Navbar", () => {
  describe("when the user is not authenticated", () => {
    it("should show sign in button", async () => {
      renderComponent({ auth: {} as Auth });

      const signInButton = screen.getByText(/sign in/i);

      expect(signInButton).toBeInTheDocument();
    });
  });
  describe("when the user is authenticated", () => {
    it("should show sign out button", async () => {
      const auth = {
        user: VALID_USER,
        accessToken: "example token",
      };
      const { signOut } = renderComponent({
        auth,
      });

      const signOutButton = screen.getByRole("button", {
        name: /sign out/i,
      });

      expect(signOutButton).toBeInTheDocument();
      await user.click(signOutButton);
      expect(signOut).toHaveBeenCalled();
    });
  });
});
