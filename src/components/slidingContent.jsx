import { Box } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SlidingText from "./slidingDownText";
import SlidingImage from "./slidingImage";

const SlidingContent = ({ text, highlight, highlightColor, imageSrc }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prev) => prev + 1);
    }, 10000); // Restart every 10 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" alignItems="center" gap={4} sx={{ height: "100%" }}>
      <AnimatePresence key={key}>
        <SlidingText
          text={text}
          highlight={highlight}
          highlightColor={highlightColor}
        />
        <SlidingImage imageSrc={imageSrc} />
      </AnimatePresence>
    </Box>
  );
};

export default SlidingContent;
