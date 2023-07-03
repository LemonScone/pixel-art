import { screen } from "@testing-library/react";

import SignInForm from "./SignInForm";

import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../utils/test-utils";

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
    it("should have id, password input fields, a sign in button", () => {
      renderComponent();

      const idField = screen.getByRole("textbox", { name: /id/i });
      const passwordField = screen.getByLabelText(/password/i);
      const signInButton = screen.getByRole("button", { name: /Sign In/i });

      expect(idField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
      expect(signInButton).toBeInTheDocument();
    });
  });

  describe("the form is submitted", () => {
    describe("the id and password are not entered", () => {
      it("should show ID, Password validation message", async () => {
        renderComponent();

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        await user.click(signInButton);

        const idInvalidMessage = screen.getByText(/ID is required./i);
        const passwordInvalidMessage = screen.getByText(
          /Password is required./i
        );
        expect(idInvalidMessage).toBeInTheDocument();
        expect(passwordInvalidMessage).toBeInTheDocument();
      });
    });

    describe("the ID is not entered.", () => {
      it("should show ID validation message", async () => {
        renderComponent();

        const passwordField = screen.getByLabelText(/password/i);

        await user.click(passwordField);
        await user.keyboard("password");

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        await user.click(signInButton);

        const idInvalidMessage = screen.getByText(/ID is required./i);
        expect(idInvalidMessage).toBeInTheDocument();
      });

      it("should not show Password validation message", async () => {
        renderComponent();

        const passwordField = screen.getByLabelText(/password/i);

        await user.click(passwordField);
        await user.keyboard("password");

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        await user.click(signInButton);

        const passwordInvalidMessage = screen.queryByText(
          /Password is required./i
        );
        expect(passwordInvalidMessage).not.toBeInTheDocument();
      });
    });

    describe("the password is not entered.", () => {
      it("should show Password validation message", async () => {
        renderComponent();

        const idField = screen.getByRole("textbox", { name: /id/i });
        await user.click(idField);
        await user.keyboard("id");

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        await user.click(signInButton);

        const passwordInvalidMessage = screen.getByText(
          /Password is required./i
        );
        expect(passwordInvalidMessage).toBeInTheDocument();
      });

      it("should not show ID validation message", async () => {
        renderComponent();

        const idField = screen.getByRole("textbox", { name: /id/i });

        await user.click(idField);
        await user.keyboard("id");

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        await user.click(signInButton);

        const idInvalidMessage = screen.queryByText(/ID is required./i);
        expect(idInvalidMessage).not.toBeInTheDocument();
      });
    });

    describe("invalid ID or Password are entered", () => {
      it("should show validation message", async () => {
        renderComponent();

        const signInButton = screen.getByRole("button", { name: /Sign In/i });

        const idField = screen.getByRole("textbox", { name: /id/i });
        const passwordField = screen.getByLabelText(/password/i);

        await user.click(idField);
        await user.keyboard("invalid");
        await user.click(passwordField);
        await user.keyboard("1234");
        await user.click(signInButton);

        const inValidMesage = screen.getByText(
          /Sorry, we can't find an account with this id./i
        );
        expect(inValidMesage).toBeInTheDocument();
      });
    });
  });

  describe("If the ID is not entered and the password is entered.", () => {
    it("should show ID validation message", async () => {
      renderComponent();

      const idField = screen.getByRole("textbox", { name: /id/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(idField);
      await user.click(passwordField);
      await user.keyboard("1234");

      const idInvalidMessage = screen.getByText(/ID is required./i);
      expect(idInvalidMessage).toBeInTheDocument();
    });

    it("should not show Password validation message", async () => {
      renderComponent();

      const idField = screen.getByRole("textbox", { name: /id/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(idField);
      await user.click(passwordField);
      await user.keyboard("1234");

      const passwordInvalidMessage = screen.queryByText(
        /Password is required./i
      );
      expect(passwordInvalidMessage).not.toBeInTheDocument();
    });
  });

  describe("If the Password is not entered and the ID is entered.", () => {
    it("should show Password validation message", async () => {
      renderComponent();

      const idField = screen.getByRole("textbox", { name: /id/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(passwordField);
      await user.click(idField);
      await user.keyboard("test");

      const passwordInvalidMessage = screen.getByText(/Password is required./i);
      expect(passwordInvalidMessage).toBeInTheDocument();
    });

    it("should not show ID validation message", async () => {
      renderComponent();

      const idField = screen.getByRole("textbox", { name: /id/i });
      const passwordField = screen.getByLabelText(/password/i);

      await user.click(passwordField);
      await user.click(idField);
      await user.keyboard("test");

      const idInvalidMessage = screen.queryByText(/ID is required./i);
      expect(idInvalidMessage).not.toBeInTheDocument();
    });
  });
});
