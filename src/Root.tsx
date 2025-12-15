import { Composition } from "remotion";
import { TechVideo } from "./compositions/TechVideo";
import { loadFonts } from "./load-fonts";
// Total Duration Calculation:
// 30 (Start Delay) + 6 * 80 (Stagger) + 80 (Last Callout Duration) = 590 frames
const TOTAL_DURATION_FRAMES = 590; 
loadFonts();
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="TechVideo"
      component={TechVideo}
      durationInFrames={TOTAL_DURATION_FRAMES} // Updated duration
      fps={30}
      width={1920}
      height={1080}
    />
  );
};