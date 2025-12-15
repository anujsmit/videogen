import { useCurrentFrame, interpolate } from "remotion";

export const Callout = ({
  text,
  x,
  y,
  fromX,
  fromY,
}: {
  text: string;
  x: number;
  y: number;
  fromX: number;
  fromY: number;
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      {/* Line */}
      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <line
          x1={fromX}
          y1={fromY}
          x2={fromX + (x - fromX) * progress}
          y2={fromY + (y - fromY) * progress}
          stroke="white"
          strokeWidth="4"
        />
      </svg>

      {/* Label */}
      {progress > 0.9 && (
        <div
          style={{
            position: "absolute",
            left: x,
            top: y,
            background: "#000",
            color: "#fff",
            padding: "12px 18px",
            fontSize: 28,
            fontWeight: 700,
            borderRadius: 8,
          }}
        >
          {text}
        </div>
      )}
    </>
  );
};
