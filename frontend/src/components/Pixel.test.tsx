import { render, screen } from "@testing-library/react";

import Pixel from "./Pixel";

describe("PixelContainer", () => {
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
