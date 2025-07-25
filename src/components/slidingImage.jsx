import { CardMedia } from "@mui/material";
import { motion } from "framer-motion";

const SlidingImage = ({ imageSrc, width = "400px", height = "100vh" }) => {
  return (
    <motion.div
      initial={{ x: "10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "10vw", opacity: 0 }}
      transition={{ delay: 1, duration: 1 }}
    >
      <CardMedia
        component="img"
        sx={{
          display: { xs: "none", md: "block" },

          height,
          width,
          filter: "grayscale(100%)",
          opacity: 0.8,
        }}
        image={imageSrc}
      />
    </motion.div>
  );
};

export default SlidingImage;
