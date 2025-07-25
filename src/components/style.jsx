import { motion } from "framer-motion";
import styled from "styled-components";
import { Select, TextField } from "@mui/material";
import color from "./color";

const AnimatedText = ({ children, style = {} }) => {
  return (
    <motion.div
      initial={{ backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      style={{
        display: "inline-block",
        background: `linear-gradient(to right, ${color.firstColor}, ${color.firstColor})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
        backgroundSize: "0% 100%",
        padding: "5px 10px",
        paddingTop: "3px",
        borderRadius: "44px",
        color: "white",
        width: "fit-content",
        marginBottom: "20px",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedParagraphs = ({ texts, style = {} }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
      style={style}
    >
      {texts.map((text, index) => (
        <motion.p
          key={index}
          style={{
            marginTop: "10px",
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
          {text}
        </motion.p>
      ))}
    </motion.div>
  );
};

const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
    textShadow: "0px 0px 10px rgba(0, 0, 0, 0.34)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: color.firstColor,
  },
});

const CustomSelect = styled(Select)({
  textAlign: "left",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-select": {
    color: "white",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
});

export { AnimatedParagraphs, AnimatedText, CustomTextField, CustomSelect };
