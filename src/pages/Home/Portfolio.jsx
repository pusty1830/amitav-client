import { ArrowForward } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import color from "../../components/color";
import { AnimatedText } from "../../components/style";
import { projectsData } from "../../components/utils/data";

const Portfolio = () => {
  const [hoverPos, setHoverPos] = useState({});
  const [visible, setVisible] = useState({});

  const handleMouseMove = (id, e) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const offsetX = ((clientX - left) / width) * 100;
    setHoverPos((prev) => ({ ...prev, [id]: offsetX }));
  };

  const handleMouseEnter = (id) => {
    setVisible((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setVisible((prev) => ({ ...prev, [id]: false }));
  };
  const imageVariants = {
    hidden: { opacity: 0, x: 100, rotate: -5, scale: 0.5, duration: 1 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 5,
      transition: { duration: 1, ease: "easeInOut" },
      scale: 1,
    },
    exit: {
      opacity: 0,
      x: 20,
      rotate: 5,
      transition: { duration: 1, ease: "easeInOut" },
      scale: 0.5,
    },
  };

  const isAbove900px = useMediaQuery("(min-width:900px)");
  const navigate = useNavigate();

  return (
    <motion.div
      id="projects"
      style={{
        // minHeight: isAbove900px ? "100vh" : "fit-content",
        display: "flex",
        padding: "26px",
        paddingTop: "0px",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Box textAlign="left" sx={{ width: "100%", p: { xs: 2, md: 4 } }}>
        <AnimatedText> my work showcase</AnimatedText>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isAbove900px ? "row" : "column",
              justifyContent: "space-between",
              alignItems: isAbove900px ? "center" : "flex-start",
              marginBottom: "50px",
            }}
          >
            <motion.p
              style={{
                fontSize: isAbove900px ? "50px" : "28px",
                marginTop: "10px",
                lineHeight: "1",
                margin: 0,
                minWidth: "60%",
              }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Explore my latest and
              <br />
              most outstanding projects.
            </motion.p>
          </div>

          <motion.p
            style={{
              fontSize: "50px",
              lineHeight: "1",
              margin: 0,
              marginBottom: "30px",
            }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Box sx={{ display: "grid", gap: 2, width: "100%" }}>
              {projectsData.slice(0, 4).map((project, index) => (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={project.id}
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    sx={{
                      minWidth: "100%",
                      mx: { xs: -2, md: 0 },
                      height: { xs: 100, md: 160 },
                      display: "flex",
                      alignItems: "center",
                      background: "transparent",
                      borderBottom: "solid 1px rgba(245, 144, 13, 0.19)",
                      pb: { xs: 2, md: 4 },
                      boxShadow: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      position: "relative",
                      "&:hover .arrow-icon": {
                        transform: "rotate(0deg)",
                      },
                      "&:hover .view": {
                        color: "black",
                        background: "white",
                      },
                      "&:hover .project-number": {
                        color: color.firstColor,
                        WebkitTextStrokeColor: color.firstColor,
                      },
                      "&:hover .project-name::after": {
                        width: "10%",
                      },
                    }}
                    onMouseMove={(e) => handleMouseMove(project.id, e)}
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={() => handleMouseLeave(project.id)}
                  >
                    <Typography
                      className="project-number"
                      sx={{
                        fontSize: isAbove900px ? "80px" : "28px",
                        fontWeight: "bold",
                        color: { xs: color.firstColor, md: "transparent" },
                        mx: { xs: 1, md: 6 },
                        textAlign: "center",
                        transition: "all 1s ease",
                        zIndex: 2,
                        width: isAbove900px ? "80px" : "50px",
                        WebkitTextStrokeWidth: "1px",
                        WebkitTextStrokeColor: color.firstColor,
                      }}
                    >
                      0{index + 1}
                    </Typography>

                    <Box
                      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      <Typography
                        className="project-name"
                        sx={{
                          flex: 1,
                          fontSize: isAbove900px ? 24 : "18px",
                          fontWeight: "bold",
                          ml: 2,
                          zIndex: 2,
                          position: "relative",
                          display: "inline-block",
                          transition: "all 1s ease",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            width: "0%",
                            height: "2px",
                            bottom: 0,
                            left: 0,
                            backgroundColor: color.firstColor,
                            transition: "width 1s ease-in-out",
                          },
                          color: "white",
                        }}
                      >
                        {project.name}
                      </Typography>
                      <Typography
                        className="project-name"
                        sx={{
                          fontSize: isAbove900px ? 14 : "10px",
                          fontWeight: "bold",
                          ml: 2,
                          zIndex: 2,
                          position: "relative",
                          display: "inline-block",
                          transition: "all 1s ease",
                          color: "white",
                        }}
                      >
                        {project.projectType}
                      </Typography>
                    </Box>

                    <Box
                      className="view"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffffb3",
                        mt: 2,
                        fontSize: "24px",
                        cursor: "pointer",
                        zIndex: 2,
                        mr: 4,
                        backgroundColor: "#101010",
                        borderRadius: "50%",
                        height: { xs: "50px", md: "80px" },
                        width: { xs: "50px", md: "80px" },
                        transition: "all 1s ease",
                      }}
                    >
                      <Box
                        component="span"
                        className="arrow-icon"
                        sx={{
                          display: "inline-flex",
                          ml: { xs: 0.5, md: 1 },
                          transition: "transform 1s ease",
                          transform: "rotate(30deg)",
                        }}
                      >
                        <ArrowForward
                          sx={{ fontSize: { xs: "24px", md: "44px" } }}
                        />
                      </Box>
                    </Box>

                    <motion.img
                      src={project.image}
                      alt={project.name}
                      variants={imageVariants}
                      initial="hidden"
                      animate={visible[project.id] ? "visible" : "hidden"}
                      exit="exit"
                      style={{
                        height: "150px",
                        width: 250,
                        objectFit: "cover",
                        position: "absolute",
                        left: `${hoverPos[project.id] - 10}%`,
                        zIndex: 1,
                        filter: "grayscale(1)",
                      }}
                    />
                  </Paper>
                </a>
              ))}
            </Box>
          </motion.p>
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default Portfolio;
