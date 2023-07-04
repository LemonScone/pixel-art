import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";
import { setupServer } from "msw/node";
import { handlers } from "./mocks/handlers";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  // runs a cleanup after each test case (e.g. clearing jsdom)
  cleanup();

  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
