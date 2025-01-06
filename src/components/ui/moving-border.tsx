
import { motion } from "framer-motion";
import React from "react";
import { cn } from "~/lib/utils";

export const MovingBorder = ({
  children,
  duration = 2000,
  className,
  containerClassName,
  borderClassName,
  as: Component = "button",
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: any;
}) => {
  return (
    <Component
      className={cn(
        "relative p-[1px] overflow-hidden",
        containerClassName
      )}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: duration / 1000, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute inset-[-1000%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]",
          borderClassName
        )}
      />
      <div className={cn("relative", className)}>{children}</div>
    </Component>
  );
};