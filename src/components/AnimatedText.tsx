import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const AnimatedText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 25,
  });

  const translateY = spring({
    frame,
    fps,
    from: 30,
    to: 0,
  });

  return (
    <div
      style={{
        fontSize: 60,
        fontWeight: 700,
        lineHeight: 1.3,
        color: "white",
        textShadow: "0 6px 30px rgba(0,0,0,0.6)",
        opacity,
        transform: `translateY(${translateY}px)`,
        maxWidth: 720,
      }}
    >
      {text}
    </div>
  );
};
