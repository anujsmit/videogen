import { Composition } from "remotion";
import { TechVideo } from "./compositions/TechVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TechVideo"
      component={TechVideo}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
