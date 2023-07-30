const getFrameInterval = ({
  currentIndex,
  totalFrames,
}: {
  currentIndex: number;
  totalFrames: number;
}) => {
  if (totalFrames === 0 || totalFrames === 1) {
    return 100;
  }

  const base = 100 / totalFrames;
  const interval = base * (currentIndex + 1);

  return Number.isInteger(interval)
    ? interval
    : parseFloat(interval.toFixed(1));
};

export default getFrameInterval;
