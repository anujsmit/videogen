import { AbsoluteFill, Sequence } from "remotion";
import { Callout } from "../components/Callout";

export const TechVideo = () => {
  return (
    <AbsoluteFill style={{ background: "#0b0b0b" }}>
      {/* Phone */}
      <img
        src="/public/device.png"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 420,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Callouts */}
      <Sequence from={45} durationInFrames={60}>
        <Callout text="Display" x={300} y={300} fromX={960} fromY={540} />
      </Sequence>

      <Sequence from={105} durationInFrames={60}>
        <Callout text="Camera" x={300} y={520} fromX={960} fromY={540} />
      </Sequence>

      <Sequence from={165} durationInFrames={60}>
        <Callout text="RAM" x={1400} y={300} fromX={960} fromY={540} />
      </Sequence>

      <Sequence from={225} durationInFrames={60}>
        <Callout text="Storage" x={1400} y={520} fromX={960} fromY={540} />
      </Sequence>
    </AbsoluteFill>
  );
};
