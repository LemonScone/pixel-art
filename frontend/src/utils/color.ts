const splitRGB = (originColor: string) => {
  return (originColor.match(/\d+/g) ?? [0, 0, 0, 0]).map(Number);
};
const getHoverColor = (originColor: string) => {
  const BASE_COLOR = 127;
  const OFFSET_COLOR = 30;
  const OPACITY = 0.9;

  const [r, g, b] = splitRGB(originColor);

  const hoverColor = `rgba(${
    r + (r > BASE_COLOR ? -OFFSET_COLOR : OFFSET_COLOR)
  }, ${g + (g > BASE_COLOR ? -OFFSET_COLOR : OFFSET_COLOR)}, ${
    b + (b > BASE_COLOR ? -OFFSET_COLOR : OFFSET_COLOR)
  }, ${OPACITY})`;

  return hoverColor;
};

const rgbToObject = (originColor: string) => {
  const [r, g, b] = splitRGB(originColor);

  return { r, g, b };
};

export { getHoverColor, rgbToObject };
