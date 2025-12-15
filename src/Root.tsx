import { Composition } from "remotion";
import { TechVideo } from "./compositions/TechVideo";

export const RemotionRoot = () => (
  <Composition
    id="TechVideo"
    component={TechVideo}
    durationInFrames={170 * 6}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ device: null }}
  />
);
