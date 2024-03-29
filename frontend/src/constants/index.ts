const INITIAL_TOOL_OPTIONS = {
  pen: {
    color: "rgb(0, 0, 0)",
    size: 1,
  },
  eraser: {
    size: 1,
  },
  bucket: {},
  move: {},
};

const INITIAL_COLOR_PALLETE = [
  "rgb(0, 0, 0)",
  "rgb(85, 239, 196)",
  "rgb(129, 236, 236)",
  "rgb(116, 185, 255)",
  "rgb(162, 155, 254)",
  "rgb(178, 190, 195)",
  "rgb(108, 92, 231)",
  "rgb(9, 132, 227)",
  "rgb(0, 206, 201)",
  "rgb(0, 184, 148)",
  "rgb(255, 234, 167)",
  "rgb(250, 177, 160)",
  "rgb(255, 118, 117)",
  "rgb(253, 121, 168)",
  "rgb(99, 110, 114)",
  "rgb(45, 52, 54)",
  "rgb(232, 67, 147)",
  "rgb(214, 48, 49)",
  "rgb(225, 112, 85)",
];

const GRID_HOVER_COLOR_FIRST = "rgba(187, 187, 187, 0.9)";

const GRID_HOVER_COLOR_SECOND = "rgba(225, 225, 225, 0.9)";

const COLOR_REGEX = /rgba?\((\d+),\s*(\d+),\s*(\d+)\)/;

const GRID_SIZE_MIN_VALUE = 5;

const GRID_SIZE_MAX_VALUE = 120;

const AUTHENTICATED = "AUTHENTICATED";
const UNAUTHENTICATED = "UNAUTHENTICATED";

const ONE_MINUTE = 60000;

const STORAGE_KEY = "gridapixel";

export {
  INITIAL_TOOL_OPTIONS,
  INITIAL_COLOR_PALLETE,
  GRID_HOVER_COLOR_FIRST,
  GRID_HOVER_COLOR_SECOND,
  COLOR_REGEX,
  GRID_SIZE_MIN_VALUE,
  GRID_SIZE_MAX_VALUE,
  AUTHENTICATED,
  UNAUTHENTICATED,
  ONE_MINUTE,
  STORAGE_KEY,
};
