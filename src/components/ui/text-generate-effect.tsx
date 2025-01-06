"use client"
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "~/lib/utils";


export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [scope.current]);

  return (
    <motion.div ref={scope} className="text-center">
      {wordsArray.map((word, idx) => {
        return (
          <motion.span
            key={word + idx}
            className={cn("opacity-0 dark:text-white", className)}
          >
            {word}{" "}
          </motion.span>
        );
      })}
    </motion.div>
  );
};