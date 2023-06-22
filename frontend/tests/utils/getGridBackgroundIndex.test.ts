import { getGridBackgroundIndex } from "../../src/utils/grid";

describe("getGridBackgroundIndex", () => {
  describe("when column is even", () => {
    // ['X', 'O', 'X', 'O',
    //  'O', 'X', 'O', 'X',
    //  'X', 'O', 'X', 'O',
    //  'O', 'X', 'O', 'X']
    describe("first line, first pixel", () => {
      it("should be return 0", () => {
        const idx = getGridBackgroundIndex(0, 4, 0);
        expect(idx).toEqual(0);
      });
    });

    describe("first line, second pixel", () => {
      it("should be return 1", () => {
        const idx = getGridBackgroundIndex(1, 4, 0);
        expect(idx).toEqual(1);
      });
    });

    describe("second line, first pixel", () => {
      it("should be return 1", () => {
        const idx = getGridBackgroundIndex(4, 4, 1);
        expect(idx).toEqual(1);
      });
    });
    describe("second line, second pixel", () => {
      it("should be return 0", () => {
        const idx = getGridBackgroundIndex(5, 4, 1);
        expect(idx).toEqual(0);
      });
    });
  });

  describe("when column is odd", () => {
    // ['X', 'O', 'X',
    //  'O', 'X', 'O'
    //  'X', 'O', 'X'
    //  'O', 'X', 'O']
    describe("first line, first pixel", () => {
      it("should be return 0", () => {
        const idx = getGridBackgroundIndex(0, 3, 0);
        expect(idx).toEqual(0);
      });
    });

    describe("first line, second pixel", () => {
      it("should be return 1", () => {
        const idx = getGridBackgroundIndex(1, 3, 0);
        expect(idx).toEqual(1);
      });
    });

    describe("second line, first pixel", () => {
      it("should be return 1", () => {
        const idx = getGridBackgroundIndex(3, 3, 1);
        expect(idx).toEqual(1);
      });
    });
    describe("second line, second pixel", () => {
      it("should be return 0", () => {
        const idx = getGridBackgroundIndex(4, 3, 1);
        expect(idx).toEqual(0);
      });
    });
  });
});
