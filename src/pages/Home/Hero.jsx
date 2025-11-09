import { Box, CardMedia, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/Button";
import SlidingContent from "../../components/slidingContent";

import { AmitavImage, heroBg } from "../../Images/image";
import color from "../../components/color";
import { getAllHero } from "../../services/Service";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // for X/Twitter

const HomeSection = () => {
  const isAbove900px = useMediaQuery("(min-width:900px)");
  const [hero, setHero] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };

    getAllHero(payLoad)
      .then((res) => {
        const heroData = res?.data?.data?.rows?.[0] ?? {};
        setHero(heroData);

        const raw = heroData?.socialMediaLinks;
        let linksObj = {};

        if (typeof raw === "string") {
          try {
            linksObj = raw.trim() ? JSON.parse(raw) : {};
          } catch (e) {
            console.warn("Invalid JSON in socialMediaLinks:", e);
            linksObj = {};
          }
        } else if (raw && typeof raw === "object") {
          linksObj = raw;
        }

        // normalize keys (twitter -> x), and map to icons
        const iconMap = {
          github: FaGithub,
          x: FaXTwitter,
          twitter: FaXTwitter, // fallback alias
          linkedin: FaLinkedin,
          instagram: FaInstagram,
        };

        const linksArray = Object.entries(linksObj)
          .map(([k, v]) => [k.toLowerCase(), v])
          .filter(([k, v]) => iconMap[k] && typeof v === "string" && v.trim())
          .map(([k, link]) => ({ icon: iconMap[k], link }));

        setSocialLinks(linksArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // include payLoad if it can change

  // log AFTER state actually changes
  useEffect(() => {
    console.log("socialLinks", socialLinks);
  }, [socialLinks]);

  useEffect(() => {
    console.log("hero", hero);
  }, [hero]);

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
        {socialLinks.map(({ icon: Icon, link }, index) =>
          Icon ? (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                style={{ fontSize: "20px", color: color.firstColor }}
                id="button-hover"
              />
            </a>
          ) : null
        )}
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
          imageSrc={hero?.herophoto}
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
