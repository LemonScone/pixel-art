import { isGridsEqual } from "../../src/utils/grid";

describe("isGridsEqual", () => {
  describe("When the length of the origin grid and the new grid are the different", () => {
    it("should return false", () => {
      const originGrid = ["rgb(0, 0, 0)", "rgb(255, 0, 0)", "rgb(0, 255, 0)"];
      const newGrid = [
        "rgb(0, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(255, 255, 0)",
        "rgb(0, 255, 255)",
      ];
      const isEqual = isGridsEqual(originGrid, newGrid);
      expect(isEqual).toEqual(false);
    });
  });

  describe("When the length of the origin grid and the new grid are the same, but the elements are different", () => {
    it("should return false", () => {
      const originGrid = [
        "rgb(0, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(255, 255, 0)",
        "rgb(0, 255, 255)",
      ];
      const newGrid = [
        "rgb(0, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(129, 236, 236)",
        "rgb(85, 239, 196)",
      ];
      const isEqual = isGridsEqual(originGrid, newGrid);
      expect(isEqual).toEqual(false);
    });
  });

  describe("When the length of the origin grid and the new grid are the same, and all elements are same", () => {
    it("should return false", () => {
      const originGrid = [
        "rgb(0, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(129, 236, 236)",
        "rgb(85, 239, 196)",
      ];
      const newGrid = [
        "rgb(0, 0, 0)",
        "rgb(255, 0, 0)",
        "rgb(0, 255, 0)",
        "rgb(129, 236, 236)",
        "rgb(85, 239, 196)",
      ];
      const isEqual = isGridsEqual(originGrid, newGrid);
      expect(isEqual).toEqual(true);
    });
  });
});
