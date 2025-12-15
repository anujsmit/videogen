import { AbsoluteFill, Sequence, Audio } from "remotion";
import { ResponsiveFeatureSlide } from "../components/ResponsiveFeatureSlide";

export const TechVideo = ({ device }: { device: any }) => {
  const SLIDE_DURATION = 170;

  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <Audio src="https://ezoix.com/wp-content/uploads/2025/12/music.wav" volume={0.4} />

      {device.specs.map((spec: any, index: number) => (
        <Sequence
          key={index}
          from={index * SLIDE_DURATION}
          durationInFrames={SLIDE_DURATION}
        >
          <ResponsiveFeatureSlide
            title={spec.label}
            value={spec.value}
            description={spec.description}
            image={device.images.img1}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
