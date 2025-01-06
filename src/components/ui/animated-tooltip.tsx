"use client"
import { motion } from "framer-motion";
import { useState } from "react";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-row items-center justify-center w-full gap-2">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="object-cover !m-0 !p-0 object-top rounded-full h-14 w-14 border-2 group-hover:scale-105 duration-200"
            />
          </div>
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className="absolute -top-16 -left-1/2 translate-x-1/2 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm rounded-md"></div>
              <div className="relative z-10 px-4 py-2 text-center">
                <p className="text-white font-medium text-sm">{item.name}</p>
                <p className="text-white/60 text-xs">{item.designation}</p>
              </div>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};