import { render } from "@testing-library/react";

import Pixel from "./Pixel";

describe("PixelContainer", () => {
  const COLOR_CODE = "rgb(54, 255, 121)";

  const renderPixel = (id = 1, columns = 10, color = COLOR_CODE) => {
    return render(
      <Pixel
        id={id}
        columns={columns}
        color={color}
        toolActive={false}
        onPointerDown={() => {
          /*empty fn*/
        }}
        onToolActive={() => {
          /*empty fn*/
        }}
      />
    );
  };

  it("should render by color prop", () => {
    const { container } = renderPixel();

    expect(container.firstChild).toHaveAttribute(
      "style",
      `background-color: ${COLOR_CODE};`
    );
  });
});
