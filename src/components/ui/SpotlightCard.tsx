"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styles from "./SpotlightCard.module.css";
import { Box, SxProps, Theme } from "@mui/material";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

export default function SpotlightCard({ children, className = "", sx }: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // 3D Tilt state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    // Spotlight position
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    setPosition({ x: localX, y: localY });

    // 3D Tilt calculation
    const width = rect.width;
    const height = rect.height;
    const mouseX = localX - width / 2;
    const mouseY = localY - height / 2;
    const xPct = mouseX / width;
    const yPct = mouseY / height;

    x.set(xPct);
    y.set(yPct);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    x.set(0);
    y.set(0);
  };

  return (
    <Box sx={sx}>
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${styles.spotlightCard} ${className}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className={styles.spotlight}
          style={{
            opacity,
            WebkitMaskImage: `radial-gradient(400px circle at ${position.x}px ${position.y}px, black, transparent)`,
          }}
        />
        <div className={styles.content} style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </motion.div>
    </Box>
  );
}
