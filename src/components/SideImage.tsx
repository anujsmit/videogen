import { useCurrentFrame, interpolate, Easing } from "remotion";

export const SideImage: React.FC = () => {
  const frame = useCurrentFrame();

  const float = interpolate(
    frame,
    [0, 120],
    [0, -12],
    {
      easing: Easing.easeInOut,
      extrapolateRight: "extend",
    }
  );

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/public/device.png"
        style={{
          width: "80%",
          transform: `translateY(${float}px)`,
          filter: "drop-shadow(0 40px 60px rgba(255, 251, 251, 0.5))",
        }}
      />
    </div>
  );
};
