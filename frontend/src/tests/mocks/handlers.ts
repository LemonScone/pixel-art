import { rest } from "msw";
import { VALID_USER } from "../fixtures";

const handlers = [
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const { userId, password } = await req.json();

    if (userId === VALID_USER.userId && password === VALID_USER.password) {
      return res(ctx.status(200), ctx.json({ accessToken: "token" }));
    } else {
      return res(
        ctx.status(401),
        ctx.json({ message: "Please verify your ID or password." })
      );
    }
  }),
];

export { handlers };
