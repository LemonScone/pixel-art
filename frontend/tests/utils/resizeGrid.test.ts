import { resizeGrid } from "../../src/utils/grid";

describe("resizeGrid", () => {
  const ORIGIN_ROWS = 3;
  const ORIGIN_COLUMNS = 3;

  let arr;
  beforeEach(() => {
    arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    // [0, 1, 2
    //  3, 4, 5
    //  6, 7, 8]
  });

  describe("when resized grid's column is 4 and row is 3", () => {
    const columns = 4;
    const rows = 3;
    it('should return ["0", "1", "2", "", "3", "4", "5", "", "6", "7", "8", ""]', () => {
      // [0, 1, 2, ""
      //  3, 4, 5, ""
      //  6, 7, 8, ""]
      const resized = resizeGrid(
        arr,
        ORIGIN_ROWS,
        ORIGIN_COLUMNS,
        rows,
        columns
      );
      expect(resized).toEqual([
        "0",
        "1",
        "2",
        "",
        "3",
        "4",
        "5",
        "",
        "6",
        "7",
        "8",
        "",
      ]);
    });
  });

  describe("when resized grid's column is 2 and row is 3", () => {
    const columns = 2;
    const rows = 3;
    it('should return ["0", "1", "3", "4", "6", "7"]', () => {
      // [0, 1, 2, ""
      //  3, 4, 5, ""
      //  6, 7, 8, ""]
      const resized = resizeGrid(
        arr,
        ORIGIN_ROWS,
        ORIGIN_COLUMNS,
        rows,
        columns
      );
      expect(resized).toEqual(["0", "1", "3", "4", "6", "7"]);
    });
  });

  describe("when resized grid's column is 2 and row is 2", () => {
    const columns = 2;
    const rows = 2;
    it('should return ["0", "1", "3", "4"]', () => {
      // [0, 1,
      //  3, 4]
      const resized = resizeGrid(
        arr,
        ORIGIN_ROWS,
        ORIGIN_COLUMNS,
        rows,
        columns
      );
      expect(resized).toEqual(["0", "1", "3", "4"]);
    });
  });

  describe("when resized grid's column is 2 and row is 3", () => {
    const columns = 2;
    const rows = 3;
    it('should return ["0", "1", "3", "4", "6", "7"]', () => {
      // [0, 1,
      //  3, 4]
      const resized = resizeGrid(
        arr,
        ORIGIN_ROWS,
        ORIGIN_COLUMNS,
        rows,
        columns
      );
      expect(resized).toEqual(["0", "1", "3", "4", "6", "7"]);
    });
  });

  describe("when resized grid's column is 4 and row is 4", () => {
    const columns = 4;
    const rows = 4;
    it('should return ["0", "1", "2", "", "3", "4", "5", "", "6", "7", "8", "", "", "", "", ""]', () => {
      // ["0", "1", "2", "",
      //  "3", "4", "5", "",
      //  "6", "7", "8", "",
      //  "", "", "", ""]
      const resized = resizeGrid(
        arr,
        ORIGIN_ROWS,
        ORIGIN_COLUMNS,
        rows,
        columns
      );
      expect(resized).toEqual([
        "0",
        "1",
        "2",
        "",
        "3",
        "4",
        "5",
        "",
        "6",
        "7",
        "8",
        "",
        "",
        "",
        "",
        "",
      ]);
    });
  });

  describe("when resized grid's column is 2 and row is 4", () => {
    const columns = 2;
    const rows = 4;
    it('should return ["0", "1", "3", "4", "6", "7", "", ""]', () => {
      // [0, 1,
      //  3, 4]
      const resized = resizeGrid(
        arr,
        ORIGIN_ROWS,
        ORIGIN_COLUMNS,
        rows,
        columns
      );
      expect(resized).toEqual(["0", "1", "3", "4", "6", "7", "", ""]);
    });
  });

  describe("when resized grid's column is 1 and row is 2", () => {
    const columns = 1;
    const rows = 2;
    it('should return ["0", "3"]', () => {
      // [0,
      //  3]
      const resized = resizeGrid(
        arr,
        ORIGIN_ROWS,
        ORIGIN_COLUMNS,
        rows,
        columns
      );
      expect(resized).toEqual(["0", "3"]);
    });
  });
});
