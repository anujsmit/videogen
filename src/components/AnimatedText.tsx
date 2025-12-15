import { useCurrentFrame, spring, useVideoConfig } from "remotion";

export const AnimatedText = ({
  text,
  mode,
}: {
  text: string;
  mode: "intro-word" | "spec";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 6,
  });

  const scale = spring({
    frame,
    fps,
    from: 0.96,
    to: 1,
    durationInFrames: 12,
  });

  const isIntro = mode === "intro-word";

  return (
    <div
      style={{
        fontSize: isIntro ? 78 : 64,
        fontWeight: isIntro ? 800 : 500,
        color: isIntro ? "#00FFD1" : "#FFFFFF",
        textAlign: "center",
        marginTop: "42%",
        letterSpacing: isIntro ? "1px" : "0px",
        opacity,
        transform: `scale(${scale})`,
        padding: "0 120px",
      }}
    >
      {text}
    </div>
  );
};
