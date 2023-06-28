import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Pixel from "./Pixel";

import MockPointerEvent from "../../__mocks__/MockPointerEvent";

describe("PixelContainer", () => {
  beforeEach(() => {
    window.PointerEvent = MockPointerEvent as any;
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    window.HTMLElement.prototype.hasPointerCapture = vi.fn();
    window.HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  const COLOR_CODE = "rgb(54, 255, 121)";

  const renderComponent = (id = 1, columns = 10, color = COLOR_CODE) => {
    render(<Pixel id={id} rowIdx={0} columns={columns} color={color} />);
  };

  it("should render by color prop", () => {
    renderComponent();

    const pixel = screen.getByLabelText(/pixel/);
    expect(pixel).toHaveAttribute("style", `background-color: ${COLOR_CODE};`);
  });
});
