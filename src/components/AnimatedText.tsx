import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import React from 'react';

export const AnimatedText: React.FC<{ text: string, style?: React.CSSProperties }> = ({ text, style = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    from: 0,
    to: 1,
    durationInFrames: 25,
  });

  const translateY = spring({
    frame,
    fps,
    from: 30,
    to: 0,
  });

  return (
    <div
      style={{
        fontSize: 100,
        fontWeight: 900,
        lineHeight: 1.3,
        color: "white",
        textShadow: "0 6px 30px rgba(0,0,0,0.6)",
        opacity,
        transform: `translateY(${translateY}px)`,
        maxWidth: 1400,
        textAlign: "center",
        ...style // Merged additional style properties
      }}
    >
      {text}
    </div>
  );
};