import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import color from "./color";

const SlidingText = ({
  text,
  highlight,
  highlightColor = color.firstColor,
}) => {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Typography
        variant="h2"
        sx={{
          mt: { xs: -4, md: 0 },
          lineHeight: { xs: "1.2", md: "1" },
          fontSize: { xs: "40px", sm: "50px", md: "94px" },
        }}
      >
        {text.split(highlight || "").map((part, index, array) =>
          index < array.length - 1 ? (
            <>
              {part}
              <span style={{ color: highlightColor }}>{highlight}</span>
            </>
          ) : (
            part
          )
        )}
      </Typography>
    </motion.div>
  );
};

export default SlidingText;
