import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  useVideoConfig,
} from "remotion";
import timelineData from "../../data/timelines/samsung-galaxy-s25-ultra.json";
import { ResponsiveFeatureSlide } from "../components/ResponsiveFeatureSlide";

export const TechVideo = () => {
  const { fps } = useVideoConfig();
  const SAFE_FPS = Number.isFinite(fps) ? fps : 30;

  const toFrames = (sec: unknown) => {
    const n = Number(sec);
    return Number.isFinite(n) ? Math.round(n * SAFE_FPS) : 0;
  };

  // Find last timeline end (seconds)
  const lastEndSeconds = Math.max(
    ...timelineData.timeline.map((t) => Number(t.end)).filter(Number.isFinite),
    0
  );

  const OUTRO_SECONDS = 10;
  const outroFromFrames = toFrames(lastEndSeconds);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f0f" }}>
      {/* 🎙 Main narration */}
      <Audio src={staticFile(timelineData.audio)} />

      {/* 🖼 Timeline visuals */}
      {timelineData.timeline.map((item, index) => {
        const startSec = Number(item.start);
        if (!Number.isFinite(startSec)) return null;

        // 🔑 HOLD PREVIOUS SCREEN UNTIL NEXT START
        const nextItem = timelineData.timeline[index + 1];
        const endSec = nextItem
          ? Number(nextItem.start)
          : Number(item.end);

        if (!Number.isFinite(endSec)) return null;

        const from = toFrames(startSec);
        const duration = Math.max(
          1,
          toFrames(endSec - startSec)
        );

        return (
          <Sequence
            key={index}
            from={from}
            durationInFrames={duration}
          >
            <ResponsiveFeatureSlide
              title={
                item.type === "spec"
                  ? item.text.split(".")[0]
                  : ""
              }
              value={
                item.type === "spec"
                  ? item.text.split(".").slice(1).join(".").trim()
                  : item.text
              }
              description=""
              image="https://media.gadgetbytenepal.com/2025/01/Samsung-Galaxy-S25-Ultra-Titanium-Grey.jpg"
            />
          </Sequence>
        );
      })}

      {/* 🎵 OUTRO (10 seconds music) */}
      <Sequence
        from={outroFromFrames}
        durationInFrames={OUTRO_SECONDS * SAFE_FPS}
      >
        <Audio
          src="https://ezoix.com/wp-content/uploads/2025/12/music.wav"
          volume={0.18}
        />
        <AbsoluteFill
          style={{
            backgroundColor: "#0f0f0f",
            justifyContent: "center",
            alignItems: "center",
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          Thanks for watching
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
