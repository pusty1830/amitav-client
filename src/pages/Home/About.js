import React from "react";
import aboutData from "../../components/Json/about.json"; // adjust path if needed
import { AmitavImage } from "../../Images/image";

const About = () => {
  return (
    <section className="about-section ">
      <div className="text-center mb-5">
        <h2 className="text-orange mb-4">{aboutData.sectionTitle}</h2>
      </div>
      <div className="container">
        <div className="row g-5">
          {/* Left Image */}
          <div className="col-lg-5 col-sm-12 mb-4">
            <img
              src={AmitavImage}
              alt="Profile"
              className="img-fluid rounded"
            />
          </div>

          {/* Right Details */}
          <div className="col-lg-7 col-sm-12 text-light m-auto">
            <h3 className="text-white fw-bold">{aboutData.name}</h3>
            <h5 className="text-orange mb-3">{aboutData.role}</h5>
            <p>{aboutData.description}</p>

            <div className="mt-5">
              <div className="mt-3">
                <strong>Birthday :</strong> {aboutData.birthday}
              </div>
              <div className="mt-3">
                <strong>Phone :</strong> {aboutData.phone}
              </div>
              <div className="mt-3">
                <strong>Email :</strong> {aboutData.email}
              </div>
              <div className="mt-3">
                <strong>From :</strong> {aboutData.address}
              </div>
              <div className="mt-3">
                <strong>Language :</strong> {aboutData.language}
              </div>
              <div className="mt-3">
                <strong>Freelance :</strong> {aboutData.freelance}
              </div>
            </div>

            <a
              href={aboutData.cv}
              className="btn btn-warning mt-4 rounded-pill"
              download
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
