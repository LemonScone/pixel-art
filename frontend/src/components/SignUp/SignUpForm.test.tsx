import { screen } from "@testing-library/react";

import SignUpForm from "./SignUpForm";

import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";

const renderComponent = () => {
  renderWithProviders(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>,
    {
      preloadedState: {},
    }
  );
};

describe("SignUpForm", () => {
  describe("when renderd", () => {
    it("should have email, username, password fields, show password checkbox, a sign up button", () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const usernameField = screen.getByRole("textbox", { name: /username/i });
      const passwordField = screen.getByLabelText(/^Password$/);
      const showPassword = screen.getByRole("checkbox", {
        name: /show password/i,
      });

      const signUpButton = screen.getByRole("button", { name: /Sign Up/i });

      expect(emailField).toBeInTheDocument();
      expect(usernameField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
      expect(showPassword).toBeInTheDocument();
      expect(signUpButton).toBeInTheDocument();
    });
  });

  describe("when check show password checkbox", () => {
    it("should render text type password field", async () => {
      renderComponent();

      const showPassword = screen.getByRole("checkbox", {
        name: /show password/i,
      });

      await user.click(showPassword);

      const passwordField = screen.getByLabelText(/^Password$/);
      expect(passwordField).toHaveAttribute("type", "text");
    });
  });
});
