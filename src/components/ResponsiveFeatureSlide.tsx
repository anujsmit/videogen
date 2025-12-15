import React from "react";
import {
    AbsoluteFill,
    Img,
    useVideoConfig,
    useCurrentFrame,
    spring, // Using spring for smoother animation
} from "remotion";
import { TypewriterText } from "./TypewriterText";

interface ResponsiveFeatureSlideProps {
    title: string;
    value: string;
    description: string;
    image: string;
}

export const ResponsiveFeatureSlide: React.FC<ResponsiveFeatureSlideProps> = ({
    title,
    value,
    description,
    image,
}) => {
    const { width, height, fps } = useVideoConfig();
    const frame = useCurrentFrame();

    // Detect orientation
    const isVertical = height > width;

    // Universal scale (safe for all resolutions based on 1920x1080)
    const scale = Math.min(width / 1920, height / 1080);

    // Animations using spring for cinematic motion
    const slideInDistance = 40 * scale;
    const springValue = spring({
        frame,
        fps,
        config: { damping: 200, stiffness: 200 },
        durationInFrames: 45,
    });

    // Y-offset moves from slideInDistance to 0
    const slideY = (1 - springValue) * slideInDistance;

    // Opacity fades from 0 to 1
    const fade = spring({
        frame,
        fps,
        config: { damping: 200, stiffness: 400 },
        durationInFrames: 35,
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#1a1a1a",
                padding: `${width * 0.06}px`,
                fontFamily: "Inter, system-ui, sans-serif",
            }}
        >
            {/* MAIN CONTAINER */}
            <div
                style={{
                    display: "flex",
                    flexDirection: isVertical ? "column" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: "100%",
                    gap: width * 0.05,
                    opacity: fade,
                    transform: `translateY(${slideY}px)`,
                }}
            >
                {/* LEFT – DEVICE IMAGE */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Img
                        src={image}
                        style={{
                            width: isVertical ? "60%" : "80%",
                            maxHeight: height * 0.75,
                            objectFit: "contain",
                            filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.4))",
                        }}
                    />
                </div>

                {/* RIGHT – TEXT CONTENT */}
                <div
                    style={{
                        flex: 1,
                        maxWidth: isVertical ? "100%" : "720px",
                    }}
                >
                    {/* TITLE ROW */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            alignItems: "baseline",
                            marginBottom: 28 * scale,
                        }}
                    >
                        <h1
                            style={{
                                fontSize: 72 * scale,
                                fontWeight: 700,
                                letterSpacing: "-1px",
                                margin: 0,
                                color: "#ffffff",
                            }}
                        >
                            {title}
                        </h1>

                        <span
                            style={{
                                fontSize: 56 * scale,
                                fontWeight: 400,
                                letterSpacing: "0.5px",
                                color: "#999999",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {value}
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    <TypewriterText
                        text={description}
                        wordsPerStep={1}
                        stepFrames={3}
                        style={{
                            fontSize: 36 * scale,
                            lineHeight: 1.7,
                            fontWeight: 300,
                            color: "#dddddd",
                            maxWidth: 700 * scale,
                            fontFamily: "Inter, system-ui, sans-serif",
                        }}
                    />
                </div>
            </div>

            {/* BRANDING */}
            <div
                style={{
                    position: "absolute",
                    right: width * 0.04,
                    bottom: height * 0.04,
                    fontFamily: "Inter, sans-serif",
                    fontSize: 18 * scale,
                    background: "#333333",
                    color: "#ffffff",
                    padding: `${8 * scale}px ${14 * scale}px`,
                    borderRadius: 6,
                    letterSpacing: "0.5px",
                }}
            >
                www.ezoix.com
            </div>
        </AbsoluteFill>
    );
};