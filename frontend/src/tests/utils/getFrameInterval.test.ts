import getFrameInterval from "../../utils/getFrameInterval";

describe("getFrameInterval", () => {
  describe("when the total of frames value is 0 or 1", () => {
    it("should return 100", () => {
      expect(getFrameInterval({ currentIndex: 0, totalFrames: 0 })).toEqual(
        100
      );
      expect(getFrameInterval({ currentIndex: 1, totalFrames: 0 })).toEqual(
        100
      );
      expect(getFrameInterval({ currentIndex: 0, totalFrames: 1 })).toEqual(
        100
      );
      expect(getFrameInterval({ currentIndex: 1, totalFrames: 1 })).toEqual(
        100
      );
    });
  });

  describe("when the total of frames value is greater than 1", () => {
    it("should return the proper interval", () => {
      expect(getFrameInterval({ currentIndex: 0, totalFrames: 2 })).toEqual(50);
      expect(getFrameInterval({ currentIndex: 1, totalFrames: 2 })).toEqual(
        100
      );
      expect(getFrameInterval({ currentIndex: 0, totalFrames: 3 })).toEqual(
        33.3
      );
      expect(getFrameInterval({ currentIndex: 1, totalFrames: 3 })).toEqual(
        66.7
      );
      expect(getFrameInterval({ currentIndex: 2, totalFrames: 3 })).toEqual(
        100
      );
      expect(getFrameInterval({ currentIndex: 0, totalFrames: 4 })).toEqual(25);
      expect(getFrameInterval({ currentIndex: 1, totalFrames: 4 })).toEqual(50);
      expect(getFrameInterval({ currentIndex: 2, totalFrames: 4 })).toEqual(75);
      expect(getFrameInterval({ currentIndex: 3, totalFrames: 4 })).toEqual(
        100
      );
    });
  });
});
