import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test-utils";

import { MemoryRouter } from "react-router-dom";

import { VALID_USER } from "../../tests/fixtures/auth";

import SignInForm from "./SignInForm";

import user from "@testing-library/user-event";

const renderComponent = () => {
  renderWithProviders(
    <MemoryRouter>
      <SignInForm />
    </MemoryRouter>,
    {
      preloadedState: {},
    }
  );
};

describe("SignInForm", () => {
  describe("when renderd", () => {
    it("should have email, password input fields, a sign in button", () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const passwordField = screen.getByLabelText(/password/i);
      const signInButton = screen.getByRole("button", { name: /Sign In/i });

      expect(emailField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
      expect(signInButton).toBeInTheDocument();
    });
  });

  describe("the form is submitted", () => {
    describe("the email is invalid", () => {
      it("should show Email validation message", async () => {
        renderComponent();

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        const emailField = screen.getByRole("textbox", { name: /email/i });
        await user.click(emailField);
        await user.keyboard("invalid");

        const passwordField = screen.getByLabelText(/password/i);
        await user.click(passwordField);
        await user.keyboard("mypassword");

        await user.click(signInButton);

        const emailInvalidMessage = screen.getByText(
          /Please enter a valid email./i
        );
        expect(emailInvalidMessage).toBeInTheDocument();
      });
    });

    describe("invalid Email or Password are entered", () => {
      it("should show validation message", async () => {
        renderComponent();

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        const emailField = screen.getByRole("textbox", { name: /email/i });
        const passwordField = screen.getByLabelText(/password/i);

        await user.click(emailField);
        await user.keyboard("invalid@invalid.com");
        await user.click(passwordField);
        await user.keyboard("1234");
        await user.click(signInButton);

        const emailValidMesage = screen.getByText(
          /Sorry, we can't find an account with this email./i
        );
        expect(emailValidMesage).toBeInTheDocument();
      });
    });
  });

  describe("If the Email is not entered and the password is entered.", () => {
    it("should show Email validation message", async () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(emailField);
      await user.click(passwordField);
      await user.keyboard("1234");

      const emailInvalidMessage = screen.getByText(/Email is required./i);
      expect(emailInvalidMessage).toBeInTheDocument();
    });

    it("should not show Password validation message", async () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(emailField);
      await user.click(passwordField);
      await user.keyboard("1234");

      const passwordInvalidMessage = screen.queryByText(
        /Password is required./i
      );
      expect(passwordInvalidMessage).not.toBeInTheDocument();
    });
  });

  describe("If the Password is not entered and the Email is entered.", () => {
    it("should show Password validation message", async () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(passwordField);
      await user.click(emailField);
      await user.keyboard(VALID_USER.email);

      const passwordInvalidMessage = screen.getByText(/Password is required./i);
      expect(passwordInvalidMessage).toBeInTheDocument();
    });

    it("should not show Email validation message", async () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(passwordField);
      await user.click(emailField);
      await user.keyboard(VALID_USER.email);

      const emailInvalidMessage = screen.queryByText(/Email is required./i);
      expect(emailInvalidMessage).not.toBeInTheDocument();
    });
  });

  describe("If the Email is invalid and the Password is entered", () => {
    it("should show Email validation message", async () => {
      renderComponent();

      const emailField = screen.getByRole("textbox", { name: /email/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(emailField);
      await user.keyboard("invalid@");
      await user.click(passwordField);

      const emailInvalidMessage = screen.getByText(
        /Please enter a valid email./i
      );
      expect(emailInvalidMessage).toBeInTheDocument();
    });
  });
});
