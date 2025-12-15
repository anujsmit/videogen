import React from "react";
import { useCurrentFrame, spring, useVideoConfig } from "remotion";

interface TypewriterTextProps {
  text: string;
  wordsPerStep?: number; // how many words appear per step
  stepFrames?: number;   // frames between each step
  style?: React.CSSProperties;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  wordsPerStep = 1,
  stepFrames = 3,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(" ");
  // Calculate the step (how many words have been revealed)
  const steps = Math.floor(frame / stepFrames) * wordsPerStep;
  const visibleWords = words.slice(0, steps).join(" ");
  const isTyping = steps < words.length;

  // Spring-based blinking cursor for a smoother look
  const cursorOpacity = spring({
    frame: frame % 30, // Loop the animation every 30 frames
    fps,
    config: { damping: 200, stiffness: 200, mass: 1 },
    from: 1,
    to: 0,
    durationInFrames: 15,
  });

  return (
    <p style={style}>
      {visibleWords}
      {isTyping && (
        <span
          style={{
            marginLeft: 4,
            opacity: cursorOpacity, // Use spring for the blink effect
          }}
        >
          |
        </span>
      )}
    </p>
  );
};