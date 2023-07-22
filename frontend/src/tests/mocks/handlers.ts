import { rest } from "msw";
import { VALID_USER, VALID_TOKEN } from "../fixtures/auth";

import httpStatus from "../../constants/httpStatus";

const handlers = [
  rest.post("/api/auth/signin", async (req, res, ctx) => {
    const { email, password } = await req.json();

    if (email === VALID_USER.email && password === VALID_USER.password) {
      return res(
        ctx.status(httpStatus.OK),
        ctx.json({
          email: VALID_USER.email,
          accessToken: VALID_TOKEN,
          username: VALID_USER.username,
          current: VALID_USER.current,
          provider: VALID_USER.provider,
          expired: 180000,
        })
      );
    } else {
      return res(
        ctx.status(httpStatus.UNAUTHORIZED),
        ctx.json({
          message: "Sorry, we can't find an account with this email.",
        })
      );
    }
  }),

  rest.post("/api/auth/signout", async (_, res, ctx) => {
    return res(ctx.status(httpStatus.OK));
  }),

  rest.post("/api/auth/refresh", async (_, res, ctx) => {
    return res(
      ctx.status(httpStatus.OK),
      ctx.json({
        email: "",
        accessToken: "",
        username: "",
        current: "",
        provider: "",
        expired: 180000,
      })
    );
  }),
];

export { handlers };
