import { render, RenderOptions } from "@testing-library/react";
import { FC, PropsWithChildren, ReactElement } from "react";
import fs from "fs";
import Children from "../types/Children";
import { PreloadedState } from "@reduxjs/toolkit";
import { AppStore, RootState, setupStore } from "../store";
import { Provider } from "react-redux";

const setTailwindCss = () => {
  const style = document.createElement("style");
  style.innerHTML = fs.readFileSync("src/tests/index.css", "utf8");
  document.head.appendChild(style);
};

const wrapper: FC<Children> = ({ children }) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  const view = render(ui, { wrapper, ...options });
  setTailwindCss();
  return view;
};

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
  tailwind = false
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  if (tailwind) {
    setTailwindCss();
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export { customRender as render, renderWithProviders };
