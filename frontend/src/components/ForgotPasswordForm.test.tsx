import { screen } from "@testing-library/react";

import { renderWithProviders } from "../utils/test-utils";

import { MemoryRouter } from "react-router-dom";

import { INVALID_USER, VALID_USER } from "../tests/fixtures/auth";

import ForgotPasswordForm from "./ForgotPasswordForm";

import user from "@testing-library/user-event";

const renderComponent = () => {
  renderWithProviders(
    <MemoryRouter>
      <ForgotPasswordForm />
    </MemoryRouter>,
    {
      preloadedState: {},
    }
  );
};

describe("ForgotPasswordForm", () => {
  describe("when renderd", () => {
    it("should have email, password input fields, a submit button", () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const submitButton = screen.getByRole("button", { name: /Email me/i });

      expect(emailField).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe("the form is submitted", () => {
    describe("the email is invalid", () => {
      it("should show Email validation message", async () => {
        renderComponent();

        const submitButton = screen.getByRole("button", { name: /Email me/i });

        const emailField = screen.getByRole("textbox", { name: /email/i });
        await user.click(emailField);
        await user.keyboard("invalid");

        await user.click(submitButton);

        const emailInvalidMessage = screen.getByText(
          /Please enter a valid email./i
        );
        expect(emailInvalidMessage).toBeInTheDocument();
      });
    });

    describe("Unused Email is entered", () => {
      it("should show validation message", async () => {
        renderComponent();

        const submitButton = screen.getByRole("button", { name: /Email me/i });

        const emailField = screen.getByRole("textbox", { name: /email/i });

        await user.click(emailField);
        await user.keyboard(INVALID_USER.email);

        await user.click(submitButton);

        const validationMessage = screen.getByText(
          /No account found for this email address./i
        );
        expect(validationMessage).toBeInTheDocument();
      });
    });

    describe("the email is valid", () => {
      it("should show complete message and return to sign in button", async () => {
        renderComponent();

        const submitButton = screen.getByRole("button", { name: /Email me/i });

        const emailField = screen.getByRole("textbox", { name: /email/i });
        await user.click(emailField);
        await user.keyboard(VALID_USER.email);

        await user.click(submitButton);

        const message = screen.getByText(
          /Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder./i
        );
        expect(message).toBeInTheDocument();
        const returnToSignIn = screen.getByRole("link", {
          name: /Return to Sign in/i,
        });
        expect(returnToSignIn).toBeInTheDocument();
      });
    });
  });
});
