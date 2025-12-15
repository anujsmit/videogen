import { Composition } from "remotion";
import { TechVideo } from "./compositions/TechVideo";
import timelineData from "../data/timelines/samsung-galaxy-s25-ultra.json";

const FPS = 30;
const OUTRO_SECONDS = 10;

// Calculate last spoken second from timeline
const lastEnd = Math.max(
  ...timelineData.timeline.map((t) => Number(t.end)).filter(Number.isFinite),
  0
);

// Final video duration = audio + outro
const durationInFrames = Math.ceil(
  (lastEnd + OUTRO_SECONDS) * FPS
);

export const RemotionRoot = () => {
  return (
    <Composition
      id="TechVideo"
      component={TechVideo}
      fps={FPS}
      width={1920}
      height={1080}
      durationInFrames={durationInFrames}
    />
  );
};
