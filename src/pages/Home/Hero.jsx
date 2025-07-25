import { Box, CardMedia, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import CustomButton from "../../components/Button";
import SlidingContent from "../../components/slidingContent";
import { socialLinks } from "../../components/utils/data";
import { AmitavImage, heroBg } from "../../Images/image";
import color from "../../components/color";

const HomeSection = () => {
  const isAbove900px = useMediaQuery("(min-width:900px)");

  return (
    <motion.div
      id="home"
      style={{
        minHeight: isAbove900px ? "100vh" : "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zindex: 1,
          opacity: 0.8,
        }}
        image={heroBg}
      ></CardMedia>

      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          alignItems: "flex-start",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: 2,
          position: "absolute",
          left: 20,
          top: "12%",
          zindex: 2,
        }}
      >
        {socialLinks.map(({ icon: Icon, link }, index) => (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer">
            <Icon
              style={{ fontSize: "20px", color: color.firstColor }}
              id="button-hover"
            />
          </a>
        ))}
      </Box>
      <div
        style={{
          width: "100%",
          minHeight: isAbove900px ? "100vh" : "60vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          marginLeft: isAbove900px ? "70px" : "25px",
        }}
      >
        <SlidingContent
          text=" Full-Stack Developer| Scalable Web & AI Solutions"
          highlight="Full-Stack Developer"
          imageSrc={AmitavImage}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "10%",
            left: isAbove900px ? 70 : 0,
          }}
        >
          <CustomButton button="Connect With me"></CustomButton>
        </Box>
      </div>
    </motion.div>
  );
};

export default HomeSection;
