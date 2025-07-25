import React from "react";
import { motion } from "framer-motion";
import data from "../../components/Json/education.json";

const Education = () => {
  return (
    <section
      className="resume-section py-5"
      style={{
        backgroundColor: "rgba(25, 25, 25, 1)",
      }}
    >
      <div className="container">
        <h2 className="text-orange text-center mb-5">RESUME</h2>
        <div className="row">
          {/* Experience Column */}
          <motion.div
            className="col-12 col-lg-6 mb-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-white mb-3 d-flex align-items-center">
              <i className="bi bi-briefcase-fill me-2"></i>
              Experience
            </h4>
            <div className="timeline">
              {data.experience.map((exp, idx) => (
                <div className="timeline-item mb-4" key={idx}>
                  <h5 className="text-orange">{exp.title}</h5>
                  <p className="text-orange small m-0">{exp.duration}</p>
                  <strong className="text-white d-block">{exp.company}</strong>
                  <p className="text-light small">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Column */}
          <motion.div
            className="col-12 col-lg-6 mb-4"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-white mb-3 d-flex align-items-center">
              <i className="bi bi-mortarboard-fill me-2"></i>
              Education
            </h4>
            <div className="timeline">
              {data.education.map((edu, idx) => (
                <div className="timeline-item mb-4" key={idx}>
                  <h5 className="text-orange">{edu.degree}</h5>
                  <p className="text-orange small m-0">{edu.duration}</p>
                  <strong className="text-white d-block">
                    {edu.institution}
                  </strong>
                  <p className="text-light small">{edu.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;
