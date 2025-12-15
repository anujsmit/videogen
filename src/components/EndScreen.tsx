import { AbsoluteFill, useVideoConfig } from "remotion";
import { AnimatedText } from "./AnimatedText";
import React from "react";

export const EndScreen: React.FC = () => {
    const { width, height } = useVideoConfig();
    const scale = Math.min(width / 1920, height / 1080);

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "#1a1a1a",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Inter, system-ui, sans-serif",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <AnimatedText
                    text="EZOIX"
                    style={{
                        fontSize: 180 * scale,
                        color: "#ffffff",
                        letterSpacing: "5px",
                        marginBottom: 40 * scale,
                    }}
                />
                <p
                    style={{
                        fontSize: 48 * scale,
                        fontWeight: 300,
                        color: "#999999",
                        textAlign: "center",
                        maxWidth: 1000 * scale,
                    }}
                >
                    Where tech makes sense
                </p>
                <div
                    style={{
                        marginTop: 60 * scale,
                        fontSize: 32 * scale,
                        color: "#cccccc",
                    }}
                >
                    www.ezoix.com
                </div>
            </div>
        </AbsoluteFill>
    );
};