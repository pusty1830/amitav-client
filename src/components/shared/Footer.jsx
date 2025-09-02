import { Box, CardMedia, Fade, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { socialLinks } from "../utils/data";

const Footer = () => {
  const navigate = useNavigate();
  const [rocketClicked, setRocketClicked] = useState(false);

  const handleRocketClick = () => {
    setRocketClicked((prev) => !prev);
    setTimeout(() => {
      setRocketClicked(false);
    }, 10000);
  };

  return (
    <Box
      p={4}
      pt={8}
      sx={{
        position: "relative",
        textAlign: "center",
        background: "#191919",
        boxShadow: "0px 0px 80px rgba(0, 0, 0, 0.54)",
        overflow: "hidden",
        color: "white",
      }}
    >
      <Box
        sx={{
          backgroundImage: 'url("/assets/footer-bg.png")',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          background: "#f5900d",
        }}
      ></Box>

      <Box
        className="cloud"
        sx={{
          animation: "floatCloud 22s linear infinite",
          opacity: "0.4",
        }}
      ></Box>
      <Box
        className="cloud"
        sx={{
          animation: "floatCloud 18s linear infinite",
          backgroundPosition: "right",
          opacity: "0.8",
        }}
      ></Box>
      <Box
        className="cloud1"
        sx={{
          animation: "floatCloud 13s linear infinite",
          backgroundPosition: "center",
        }}
      ></Box>

      <div className="rockets">
        <Rocket className="rocket1" onClick={handleRocketClick} />
        <Rocket className="rocket2" />
        <Rocket className="rocket3" onClick={handleRocketClick} />
      </div>

      <div className="stars">
        <div className="stars-back"></div>
        <div className="stars-middle"></div>
        <div className="stars-front"></div>
      </div>

      <Fade in={true} timeout={500} key={rocketClicked ? "clicked" : "default"}>
        <div style={{ zIndex: 2, position: "relative" }}>
          <Typography
            className="fade-text"
            sx={{
              fontFamily: "customFontB",
              color: "white",
              fontSize: { xs: "14px", md: "18px" },
              width: "fit-content",
              display: "block",
              margin: "auto",
              mb: -1,
            }}
          >
            {rocketClicked
              ? "Designed with ❤️ by"
              : "Let’s start working together"}
          </Typography>
          <Typography
            className="fade-text"
            sx={{
              fontSize: { xs: "28px", md: "70px" },
              cursor: "pointer",
              width: "fit-content",
              display: "block",
              margin: "auto",
            }}
          >
            {rocketClicked ? "Amitav" : "me@amitavpusty.site"}
          </Typography>

          <Box
            onClick={() => {
              navigate("/");
            }}
            sx={{
              height: "100px",
              width: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              background: "black",
              px: 1,
              borderRadius: 4,
              mt: 1,
              boxShadow: "-10px -10px 20px rgba(245, 144, 13, 0.35) inset",
              cursor: "pointer",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "white",
                letterSpacing: 2,
              }}
            >
              Amitav
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              fontSize: "18px",
              mt: 3,
            }}
          >
            {socialLinks.map(({ icon: Icon, link }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon id="button-hover" />
              </a>
            ))}
          </Box>
        </div>
      </Fade>
    </Box>
  );
};

export default Footer;

const Rocket = ({ className, onClick }) => (
  <div className={`rocket-wrapper ${className}`} onClick={onClick}>
    <div className="rocket-body">
      {[0, 0.5, 1, 1.5, 2].map((delay, index) => (
        <div
          key={`smoke-${index}`}
          className="smoke"
          style={{ animationDelay: `${delay}s` }}
        ></div>
      ))}
      {[0, 1, 2].map((i) => (
        <div
          key={`trail-${i}`}
          className="smoke-trail"
          style={{ animationDelay: `${i}s` }}
        ></div>
      ))}
      <img src="/assets/rocket.png" className="rocket" alt="rocket" />
      <div className="fire"></div>
    </div>
  </div>
);
