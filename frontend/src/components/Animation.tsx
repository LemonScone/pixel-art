import { BoxShadow } from "../types/BoxShadow";
import { generateKeyframes } from "../utils/cssParse";
import { randomStr } from "../utils/random";

const Animation = ({
  boxShadow,
  duration,
}: {
  boxShadow: BoxShadow;
  duration: number;
}) => {
  const keyframeName = randomStr();
  const keyframeRules = generateKeyframes(boxShadow);
  const animStr = `@keyframes ${keyframeName} {${keyframeRules}}`;

  return (
    <div
      style={{
        position: "absolute",
        animation: `x ${duration}s infinite`,
        animationName: keyframeName,
      }}
    >
      <style>{animStr}</style>
    </div>
  );
};

export default Animation;
