import { useCurrentFrame, interpolate, Easing } from "remotion";

export const KenBurnsImage: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [0, 300],
    [1.05, 1.25],
    { easing: Easing.easeInOut, extrapolateRight: "clamp" }
  );

  const translateX = interpolate(
    frame,
    [0, 300],
    [0, -120],
    { easing: Easing.easeInOut, extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    frame,
    [0, 300],
    [0, -60],
    { easing: Easing.easeInOut, extrapolateRight: "clamp" }
  );

  return (
    <img
      src={src}
      style={{
        position: "absolute",
        width: "120%",
        height: "120%",
        objectFit: "cover",
        transform: `
          scale(${scale})
          translate(${translateX}px, ${translateY}px)
        `,
        opacity: 0.9,
      }}
    />
  );
};
