import { fireEvent, render, screen } from "@testing-library/react";
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
    const onPointerEnter = vi.fn();
    const onPointerLeave = vi.fn();
    const onPointerDown = vi.fn();
    const onPointerUp = vi.fn();
    const onPointerMove = vi.fn();

    render(
      <Pixel
        id={id}
        rowIdx={0}
        columns={columns}
        color={color}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      />
    );
    return {
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerMove,
    };
  };

  it("should render by color prop", () => {
    renderComponent();

    const pixel = screen.getByLabelText(/pixel/);
    expect(pixel).toHaveAttribute("style", `background-color: ${COLOR_CODE};`);
  });

  it("calls pointer events", async () => {
    const {
      onPointerEnter,
      onPointerLeave,
      onPointerDown,
      onPointerUp,
      onPointerMove,
    } = renderComponent();

    const pixel = screen.getByLabelText(/pixel/);

    fireEvent.pointerEnter(pixel);
    expect(onPointerEnter).toHaveBeenCalled();

    fireEvent.pointerLeave(pixel);
    expect(onPointerLeave).toHaveBeenCalled();

    fireEvent.pointerDown(pixel);
    expect(onPointerDown).toHaveBeenCalled();

    fireEvent.pointerUp(pixel);
    expect(onPointerUp).toHaveBeenCalled();

    fireEvent.pointerMove(pixel);
    expect(onPointerMove).toHaveBeenCalled();
  });
});
