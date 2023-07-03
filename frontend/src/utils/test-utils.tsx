import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement } from "react";
import fs from "fs";
import Children from "../types/Children";

const wrapper: FC<Children> = ({ children }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const view = render(ui, { wrapper, ...options });

  const style = document.createElement("style");
  style.innerHTML = fs.readFileSync("src/tests/index.css", "utf8");
  document.head.appendChild(style);

  return view;
};

export { customRender as render };
