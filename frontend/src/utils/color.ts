const getHoverColor = (originColor: string) => {
  const BASE_COLOR = 127;
  const OFFSET_COLOR = 30;
  const OPACITY = 0.9;

  const [r, g, b] = (originColor.match(/\d+/g) ?? [0, 0, 0, 0]).map(Number);

  const hoverColor = `rgba(${
    r + (r > BASE_COLOR ? -OFFSET_COLOR : OFFSET_COLOR)
  }, ${g + (g > BASE_COLOR ? -OFFSET_COLOR : OFFSET_COLOR)}, ${
    b + (b > BASE_COLOR ? -OFFSET_COLOR : OFFSET_COLOR)
  }, ${OPACITY})`;

  return hoverColor;
};

export { getHoverColor };
