import React from "react";
import { useCurrentFrame } from "remotion";

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

  const words = text.split(" ");
  const steps = Math.floor(frame / stepFrames) * wordsPerStep;
  const visibleWords = words.slice(0, steps).join(" ");
  const isTyping = steps < words.length;

  return (
    <p style={style}>
      {visibleWords}
      {isTyping && (
        <span
          style={{
            marginLeft: 4,
            opacity: Math.floor(frame / 15) % 2,
          }}
        >
          |
        </span>
      )}
    </p>
  );
};
