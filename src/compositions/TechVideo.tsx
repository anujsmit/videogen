import { AbsoluteFill, Sequence, Audio, Img } from "remotion";
import { Callout } from "../components/Callout";
import { AnimatedText } from "../components/AnimatedText";
import deviceData from "../../data/device.json"; // Import the updated data

// Define timing constants in frames (assuming 30 FPS)
const TITLE_DURATION = 90; // 3 seconds for the title
const CALLOUT_STAGGER = 40; // 40 frames delay between each callout appearing
const CALLOUT_DURATION = 90; // The duration of the Callout animation (to keep it on screen)

export const TechVideo = () => {
  // Use the specs from the new data (index is important for the layout/positioning)
  const highlightedSpecs = [
    { label: deviceData.specs[0].label, value: deviceData.specs[0].value, x: 300, y: 300, fromY: 540 },
    { label: deviceData.specs[1].label, value: deviceData.specs[1].value, x: 300, y: 520, fromY: 540 },
    { label: deviceData.specs[2].label, value: deviceData.specs[2].value, x: 300, y: 740, fromY: 540 },
    { label: deviceData.specs[3].label, value: deviceData.specs[3].value, x: 1620, y: 300, fromY: 540 },
    { label: deviceData.specs[4].label, value: deviceData.specs[4].value, x: 1620, y: 520, fromY: 540 },
    { label: deviceData.specs[5].label, value: deviceData.specs[5].value, x: 1620, y: 740, fromY: 540 },
  ];

  // The composition duration needs to cover the title + all callouts
  const totalFramesNeeded = TITLE_DURATION + (highlightedSpecs.length * CALLOUT_STAGGER);

  return (
    <AbsoluteFill style={{ background: "#0b0b0b" }}>
      {/* 1. Add the music file */}
      <Audio src="https://ezoix.com/wp-content/uploads/2025/12/music.wav" loop />

      {/* 2. Title - Use the phone model */}
      <Sequence from={0} durationInFrames={TITLE_DURATION}>
        <AbsoluteFill
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: 80,
            zIndex: 20
          }}
        >
          <AnimatedText text={deviceData.model} />
        </AbsoluteFill>
      </Sequence>
      
      {/* 3. Static Phone Image */}
      {/* Note: The device image in the assets folder is a Samsung. You will need to replace this with the Google Pixel 10 Pro image to match the visual reference exactly. */}
      <Img
        src="https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/Google/Google-Pixel-10-Pro-XL/Moonstone/Google-Pixel-10-Pro-XL-Moonstone-leftimage.png" // Corrected path from previous interaction
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 420,
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      />
      
      {/* 4. Callouts - Dynamically generated with staggered timing */}
      {highlightedSpecs.map((spec, index) => {
        // Start after the title, staggered by CALLOUT_STAGGER frames
        const startFrame = TITLE_DURATION + index * CALLOUT_STAGGER; 
        
        const calloutText = `${spec.label}: ${spec.value}`;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={CALLOUT_DURATION + CALLOUT_STAGGER} // Keep callout visible until the next one or end
            name={`Callout ${spec.label}`}
          >
            <Callout
              text={calloutText}
              x={spec.x}
              y={spec.y}
              fromX={960}
              fromY={540} // Center point for animation origin
            />
          </Sequence>
        );
      })}

    </AbsoluteFill>
  );
};