import React from "react";
import skillData from "../../components/Json/skill.json";
import { RiReactjsLine, RiTailwindCssFill, RiNextjsLine } from "react-icons/ri";
import // SiMongodb,
// SiMysql,
// SiAmazonaws,
// SiPython,
// SiPostman,
"react-icons/si";
import { FaGithub } from "react-icons/fa";
import { SiPostman, SiMysql } from "react-icons/si";
import { FaNodeJs, FaAws } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaPython } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const barContainerVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const barFillVariants = {
  initial: { width: 0 },
  animate: (percent) => ({
    width: `${percent}%`,
    transition: { duration: 1.2, ease: "easeInOut" },
  }),
};

const Skill = () => {
  const { title, skills } = skillData;

  return (
    <section
      className="skills-section py-5 text-white"
      style={{ backgroundColor: "rgba(25, 25, 25)" }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-warning fw-bold">{title}</h2>
        </div>

        <div className="row">
          {/* Left: Technology Icons */}
          {/* Left: Technology Icons */}
          <div className="col-lg-6 col-12 md:border-end md:border-secondary pe-lg-5 mb-4 mb-lg-0">
            <motion.h1
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-center fw-bold display-5"
            >
              Technologies
            </motion.h1>

            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
              className="d-flex flex-wrap justify-content-center gap-4"
            >
              {[
                {
                  icon: <RiReactjsLine size={64} color="#06b6d4" />,
                  name: "React.js",
                },
                {
                  icon: <FaNodeJs size={64} color="#3c873a" />,
                  name: "Node.js",
                },
                {
                  icon: <IoLogoJavascript size={64} color="#facc15" />,
                  name: "JavaScript",
                },
                {
                  icon: <RiTailwindCssFill size={64} color="#06b6d4" />,
                  name: "Tailwind CSS",
                },
                {
                  icon: <DiMongodb size={64} color="#3c873a" />,
                  name: "MongoDB",
                },
                { icon: <SiMysql size={64} color="#00758F" />, name: "MySQL" },
                {
                  icon: <FaAws size={64} color="#FF9900" />,
                  name: "AWS",
                },
                {
                  icon: <FaPython size={64} color="#3776AB" />,
                  name: "Python",
                },
                {
                  icon: <SiPostman size={64} color="#FF6C37" />,
                  name: "API Integration",
                },
                {
                  icon: <FaGithub size={64} color="#3776AB" />,
                  name: "Python",
                },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  variants={iconVariants(2 + i)}
                  initial="initial"
                  animate="animate"
                  className="border border-4 border-secondary rounded-4 p-4 text-center"
                  title={tech.name}
                >
                  {tech.icon}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Skill Progress Bars */}
          <div className="col-lg-6 col-12 ps-lg-5">
            <motion.h1
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5 }}
              className="mb-5 text-center fw-bold display-5"
            >
              Skill Proficiency
            </motion.h1>

            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                className="mb-4"
                variants={barContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="d-flex justify-content-between">
                  <span>{skill.name}</span>
                  <span>{skill.percent}%</span>
                </div>

                <div
                  className="progress bg-secondary"
                  style={{ height: "10px", overflow: "hidden" }}
                >
                  <motion.div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    variants={barFillVariants}
                    initial="initial"
                    whileInView="animate"
                    custom={skill.percent}
                    viewport={{ once: true }}
                    style={{
                      height: "100%",
                      transformOrigin: "left",
                    }}
                    whileHover={{
                      scaleY: 1.3,
                      transition: { duration: 0.3 },
                    }}
                    aria-valuenow={skill.percent}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skill;
