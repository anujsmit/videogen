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
        fontSize: 100, // Changed from 60 to 100 for a bolder title
        fontWeight: 900, // Changed from 700 to 900 for a bolder title
        lineHeight: 1.3,
        color: "white",
        textShadow: "0 6px 30px rgba(0,0,0,0.6)",
        opacity,
        transform: `translateY(${translateY}px)`,
        maxWidth: 1400, // Increased max width for longer titles
        textAlign: "center"
      }}
    >
      {text}
    </div>
  );
};