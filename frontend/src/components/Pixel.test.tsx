import { render, screen } from "@testing-library/react";

import Pixel from "./Pixel";

describe("PixelContainer", () => {
  const COLOR_CODE = "rgb(54, 255, 121)";

  const renderPixel = (id = 1, columns = 10, color = COLOR_CODE) => {
    return render(
      <Pixel
        id={id}
        rowIdx={0}
        columns={columns}
        color={color}
        toolActive={false}
        onPointerDown={() => {}}
        onPointerEnter={() => {}}
        onPointerLeave={() => {}}
        onToolActive={() => {}}
      />
    );
  };

  it("should render by color prop", () => {
    renderPixel();

    const pixel = screen.getByLabelText(/pixel/);
    expect(pixel).toHaveAttribute("style", `background-color: ${COLOR_CODE};`);
  });
});
