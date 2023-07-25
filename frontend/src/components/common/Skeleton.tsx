import classNames from "../../utils/classNames";

type SkeletonProps = {
  times: number;
  className?: string;
};

const Skeleton = ({ times, className = "" }: SkeletonProps) => {
  const outerClassNames = classNames(
    "relative overflow-hidden bg-neutral-900 rounded-xl mb-2 animate-pulse",
    className
  );

  const innerClassNames = "absolute bg-input-color";

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames}></div>
        </div>
      );
    });

  return boxes;
};

export default Skeleton;
