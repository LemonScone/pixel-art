import { getMoveIndexes } from "../../utils/grid";

describe("getMoveIndexes", () => {
  describe("when start index is 0, columns count is 3, cell count is 25", () => {
    const columns = 5;
    const rows = 5;
    //  (0), 1, 2, 3, 4
    //  5, 6,  7,  8, 9
    // 10, 11, 12, 13, 14
    // 15, 16, 17, 18, 19
    // 20, 21, 22, 23, 24

    it("should return [0, 5, 10, 15, 20]", () => {
      //  (0), 1, 2, 3, 4
      //  (5), 6,  7,  8, 9
      // (10), 11, 12, 13, 14
      // (15), 16, 17, 18, 19
      // (20), 21, 22, 23, 24
      const moveIndexes = getMoveIndexes(0, columns, rows * columns);
      expect(moveIndexes).toEqual([0, 5, 10, 15, 20]);
    });
  });
});
