import React from "react";
import {
    AbsoluteFill,
    Img,
    useVideoConfig,
    useCurrentFrame,
    interpolate,
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
    const { width, height } = useVideoConfig();
    const frame = useCurrentFrame();

    // Detect orientation
    const isVertical = height > width;

    // Universal scale (safe for all resolutions)
    const scale = Math.min(width / 1920, height / 1080);

    // Animations
    const slideY = interpolate(frame, [0, 25], [40 * scale, 0], {
        extrapolateRight: "clamp",
    });

    const fade = interpolate(frame, [0, 25], [0, 1], {
        extrapolateRight: "clamp",
    });

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#ffffff",
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
                            filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
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
                            alignItems: "baseline",
                            marginBottom: 28 * scale,
                        }}
                    >
                        <h1
                            style={{
                                fontFamily: "Anton, sans-serif",
                                fontSize: 72 * scale,
                                fontWeight: 400, // Anton only has one weight
                                letterSpacing: "1px",
                                margin: 0,
                                color: "#000",
                            }}
                        >
                            {title}
                        </h1>

                        <span
                            style={{
                                fontFamily: "Anton, sans-serif",
                                fontSize: 56 * scale,
                                letterSpacing: "0.5px",
                                color: "#000",
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
                            fontWeight: 400,
                            color: "#333",
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
                    fontFamily: "Anton, sans-serif",
                    fontSize: 18 * scale,
                    background: "#000",
                    color: "#fff",
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
