import { screen } from "@testing-library/react";

import ResetPasswordForm from "./ResetPasswordForm";

import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../utils/test-utils";
import { INVALID_USER, VALID_USER } from "../tests/fixtures/auth";

const renderComponent = () => {
  renderWithProviders(
    <MemoryRouter>
      <ResetPasswordForm />
    </MemoryRouter>,
    {
      preloadedState: {},
    }
  );
};

describe("ResetPasswordForm", () => {
  describe("when renderd", () => {
    it("should have password, confirm password fields, a change password button", () => {
      renderComponent();

      const passwordField = screen.getByLabelText(/^Password$/);
      const confirmPasswordField = screen.getByLabelText(/^Confirm password$/);

      const changePasswordButton = screen.getByRole("button", {
        name: /Change Password/i,
      });

      expect(passwordField).toBeInTheDocument();
      expect(confirmPasswordField).toBeInTheDocument();
      expect(changePasswordButton).toBeInTheDocument();
    });
  });

  describe("If the Password is not entered and the Confirm Password is entered.", () => {
    it("should show Password validation message", async () => {
      renderComponent();

      const passwordField = screen.getByLabelText(/^Password/i);
      const confirmPasswordField = screen.getByLabelText(/^Confirm Password/i);

      await user.click(passwordField);
      await user.click(confirmPasswordField);
      await user.keyboard(VALID_USER.password);

      const passwordInvalidMessage = screen.getByText(/Password is required./i);
      expect(passwordInvalidMessage).toBeInTheDocument();
    });
  });

  describe("If the Password is invalid", () => {
    it("should show Password validation message", async () => {
      renderComponent();

      const passwordField = screen.getByLabelText(/^Password/i);
      const confirmPasswordField = screen.getByLabelText(/^Confirm password/i);

      await user.click(passwordField);
      await user.keyboard(INVALID_USER.password);

      await user.click(confirmPasswordField);

      const passwordInvalidMessage = screen.getByText(
        /Password must be at least 4 characters, no more than 20 characters, and contain letters and numbers./i
      );
      expect(passwordInvalidMessage).toBeInTheDocument();
    });
  });

  describe("the form is submitted", () => {
    describe("the password and confirm password do not match", async () => {
      it("should show Password validation message", async () => {
        renderComponent();

        const changePasswordButton = screen.getByRole("button", {
          name: /Change Password/i,
        });

        const passwordField = screen.getByLabelText(/^Password/i);
        const confirmPasswordField =
          screen.getByLabelText(/^Confirm Password/i);

        await user.click(passwordField);
        await user.keyboard(VALID_USER.password);

        await user.click(confirmPasswordField);
        await user.keyboard(INVALID_USER.password);

        await user.click(changePasswordButton);

        const passwordInvalidMessage = screen.getByText(
          /Password confirmation doesn't match the password./i
        );
        expect(passwordInvalidMessage).toBeInTheDocument();
      });
    });
  });
});
