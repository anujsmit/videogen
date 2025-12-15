import { AbsoluteFill, Sequence, Audio, useVideoConfig } from "remotion";
import deviceData from "../../data/device.json";
import { ResponsiveFeatureSlide } from "../components/ResponsiveFeatureSlide";

// TIMING
const SLIDE_DURATION = 120;
const START_DELAY = 15;

export const TechVideo: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#ffffff" }}>
      
      {/* Background Music */}
      <Audio src="https://ezoix.com/wp-content/uploads/2025/12/music.wav" volume={0.4} />

      {/* Feature Slides */}
      {deviceData.specs.map((spec, index) => {
        const from = START_DELAY + index * SLIDE_DURATION;

        return (  
          <Sequence
            key={index}
            from={from}
            durationInFrames={SLIDE_DURATION}
          >
            <ResponsiveFeatureSlide
              title={spec.label}
              value={spec.value}
              description={spec.description}
              image={deviceData.images.img1}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
