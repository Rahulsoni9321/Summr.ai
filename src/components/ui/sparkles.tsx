"use client"
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

export const SparklesCore = (props: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}) => {
  const {
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 10,
    className,
    particleColor = "#fff",
  } = props;
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number }>>([]);

  useEffect(() => {
    const particleCount = Math.floor((window.innerWidth * particleDensity) / 100);
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
    }));
    setParticles(newParticles);
  }, [minSize, maxSize, particleDensity]);

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden",
        className
      )}
      style={{
        background,
      }}
    >
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particleColor,
            animation: `sparkle ${Math.random() * 2 + 1}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};