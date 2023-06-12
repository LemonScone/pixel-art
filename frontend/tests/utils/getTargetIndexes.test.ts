import { getTargetIndexes } from "../../src/utils/grid";

describe("getTargetIndexes", () => {
  describe("when start index is 2, size is 3, columns is 5, rows is 5", () => {
    const start = 2;
    const size = 3;
    const columns = 5;
    const rows = 5;
    //  0, 1, (2), 3, 4
    //  5, 6,  7,  8, 9
    // 10, 11, 12, 13, 14
    // 15, 16, 17, 18, 19
    // 20, 21, 22, 23, 24

    it("should return [2, 3, 4, 7, 8, 9, 12, 13, 14]", () => {
      //  0, 1, (2), (3), (4)
      //  5, 6, (7), (8), (9)
      // 10, 11,(12),(13),(14)
      // 15, 16, 17, 18, 19
      // 20, 21, 22, 23, 24
      const targetIndexes = getTargetIndexes(start, size, columns, rows);
      expect(targetIndexes).toEqual([2, 3, 4, 7, 8, 9, 12, 13, 14]);
    });
  });

  describe("when start index is 5, size is 2, columns is 3, rows is 3", () => {
    const start = 5;
    const size = 2;
    const columns = 3;
    const rows = 3;
    // 0,  1,  2,
    // 3,  4, (5),
    // 6,  7,  8,
    // 9, 10, 11,
    // 12, 13, 14
    it("should return [5, 8]", () => {
      // [0, 1, 2,
      //  3, 4, (5),
      // 6, 7, (8),
      // 9, 10, 11,
      // 12, 13, 14]
      const targetIndexes = getTargetIndexes(start, size, columns, rows);
      expect(targetIndexes).toEqual([5, 8]);
    });
  });
  describe("when start index is 6, size is 4, columns is 5, rows is 5", () => {
    const start = 6;
    const size = 4;
    const columns = 5;
    const rows = 5;
    // 0, 1, 2, 3, 4
    // 5, (6), 7, 8, 9
    // 10, 11, 12, 13, 14
    // 15, 16, 17, 18, 19
    // 20, 21, 22, 23, 24
    it("should return [6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24]", () => {
      // 0, 1, 2, 3, 4
      // 5, (6), (7), (8), (9)
      // 10, (11), (12), (13), (14)
      // 15, (16), (17), (18), (19)
      // 20, (21), (22), (23), (24)
      const targetIndexes = getTargetIndexes(start, size, columns, rows);
      expect(targetIndexes).toEqual([
        6, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 19, 21, 22, 23, 24,
      ]);
    });
  });

  describe("when start index is 10, size is 5, columns is 5, rows is 5", () => {
    const start = 10;
    const size = 5;
    const columns = 5;
    const rows = 5;
    // 0, 1, 2, 3, 4
    // 5, 6, 7, 8, 9
    // (10), 11, 12, 13, 14
    // 15, 16, 17, 18, 19
    // 20, 21, 22, 23, 24
    it("should return [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]", () => {
      // 0, 1, 2, 3, 4
      // 5, 6, 7, 8, 9
      // (10), (11), (12), (13), (14)
      // (15), (16), (17), (18), (19)
      // (20), (21), (22), (23), (24)
      const targetIndexes = getTargetIndexes(start, size, columns, rows);
      expect(targetIndexes).toEqual([
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      ]);
    });
  });
});
