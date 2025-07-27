"use client";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode, type ElementType } from "react";

export type FadeDirection =
    | "up"
    | "down"
    | "left"
    | "right"
    | "up-left"
    | "up-right"
    | "down-left"
    | "down-right";

interface FadeInProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    delay?: number;
    duration?: number;
    distance?: number;
    direction?: FadeDirection;
    once?: boolean;
    variantsOverride?: Variants;
}

export const FadeIn = ({
                           children,
                           as = "div",
                           className = "",
                           delay = 0,
                           duration = 0.6,
                           distance = 40,
                           direction = "up",
                           once = true,
                           variantsOverride,
                       }: FadeInProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const initialPositionMap: Record<FadeDirection, { x: number; y: number }> = {
        up: { x: 0, y: distance },
        down: { x: 0, y: -distance },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
        "up-left": { x: distance, y: distance },
        "up-right": { x: -distance, y: distance },
        "down-left": { x: distance, y: -distance },
        "down-right": { x: -distance, y: -distance },
    };

    const defaultVariants: Variants = {
        hidden: {
            opacity: 0,
            x: initialPositionMap[direction].x,
            y: initialPositionMap[direction].y,
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, delay, ease: "easeOut" },
        },
    };

    const variants = variantsOverride || defaultVariants;
    const MotionTag = motion(as);

    return (
        <MotionTag
            ref={ref}
            className={className}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {children}
        </MotionTag>
    );
};
