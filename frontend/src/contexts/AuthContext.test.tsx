import { render, screen, RenderOptions } from "@testing-library/react";
import { vi } from "vitest";
import user from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";

import useAuthContext from "../hooks/useAuth";
import AuthContext, { AuthContextData, SignInCredencials } from ".";

import { VALID_USER } from "../tests/fixtures/auth";
import React from "react";

const TestComponent = ({ userId, password }: SignInCredencials) => {
  const { auth, signIn, signOut } = useAuthContext();

  return (
    <div>
      <button
        onClick={() =>
          signIn({
            userId,
            password,
          })
        }
      >
        Sign In
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
      {auth.user && (
        <>
          <span>{auth.user.current}</span>
          <span>{auth.user.nickname}</span>
          <span>{auth.user.provider}</span>
        </>
      )}
    </div>
  );
};

const customRender = (
  ui: React.ReactElement,
  {
    providerProps,
    renderOptions,
  }: {
    providerProps: AuthContextData;
    renderOptions?: RenderOptions;
  }
) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={providerProps}>{ui}</AuthContext.Provider>
    </MemoryRouter>,
    renderOptions
  );
};

const renderComponent = ({ userId, password }: SignInCredencials) => {
  const providerProps = {
    signIn: vi.fn(),
    signOut: vi.fn(),
    auth: {
      user: {
        userId: VALID_USER.userId,
        nickname: VALID_USER.nickname,
        current: VALID_USER.current,
        provider: VALID_USER.provider,
      },
      accessToken: "asdasd",
    },
    setAuth: vi.fn(),
  };

  customRender(<TestComponent userId={userId} password={password} />, {
    providerProps,
  });
};

describe("AuthContext", () => {
  describe("when click the signIn button", () => {
    it("should dispatch signIn", async () => {
      renderComponent({
        userId: VALID_USER.userId,
        password: VALID_USER.password,
      });

      const signInButton = screen.getByRole("button", {
        name: /sign in/i,
      });

      await user.click(signInButton);

      const nickname = screen.getByText(VALID_USER.nickname);
      const current = screen.getByText(VALID_USER.current);
      const provider = screen.getByText(VALID_USER.provider);

      expect(nickname).toBeInTheDocument();
      expect(current).toBeInTheDocument();
      expect(provider).toBeInTheDocument();
    });
  });
});
