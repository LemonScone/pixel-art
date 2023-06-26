import { describe, expect, it } from "vitest";
import { getBucketFillGridAndIndexes } from "../../src/utils/grid";

describe("getBucketFillGridAndIndexes", () => {
  describe("when start index is 0, origin color is red, new color is blue", () => {
    const originColor = "rgb(255,0,0)";
    const newColor = "rgb(0,0,255)";
    const start = 0;
    const columns = 5;
    const rows = 5;
    const grid = [
      originColor,
      originColor,
      originColor,
      originColor,
      originColor,
      originColor,
      "",
      "",
      "",
      originColor,
      originColor,
      "",
      "",
      "",
      originColor,
      originColor,
      "",
      "",
      "",
      originColor,
      originColor,
      originColor,
      originColor,
      originColor,
      originColor,
    ];
    // (red), (red), (red), (red), (red)
    // (red),   6,     7,     8,   (red)
    // (red),  11,    12,    13,   (red)
    // (red),  16,    17,    18,   (red)
    // (red), (red), (red), (red), (red)

    it("should return newGrid and indexes", () => {
      // (blue), (blue), (blue), (blue), (blue)
      // (blue),   6,      7,      8,    (blue)
      // (blue),  11,     12,     13,    (blue)
      // (blue),  16,     17,     18,    (blue)
      // (blue), (blue), (blue), (blue), (blue)
      const { grid: newGrid, indexes } = getBucketFillGridAndIndexes(
        grid,
        start,
        originColor,
        newColor,
        columns,
        rows
      );

      expect(newGrid).toEqual([
        newColor,
        newColor,
        newColor,
        newColor,
        newColor,
        newColor,
        "",
        "",
        "",
        newColor,
        newColor,
        "",
        "",
        "",
        newColor,
        newColor,
        "",
        "",
        "",
        newColor,
        newColor,
        newColor,
        newColor,
        newColor,
        newColor,
      ]);

      expect(indexes.sort((a, b) => a - b)).toEqual([
        0, 1, 2, 3, 4, 5, 9, 10, 14, 15, 19, 20, 21, 22, 23, 24,
      ]);
    });
  });
});
