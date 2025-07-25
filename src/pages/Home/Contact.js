import React from "react";
import contactData from "../../components/Json/contact.json";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="container">
        <h2 className="text-orange text-center mb-5">
          {contactData.sectionTitle}
        </h2>
        <div className="row g-5">
          {/* Left form */}
          <div className="col-lg-6 col-sm-12 mb-4">
            <h4 className="text-white mb-4">Just say Hello</h4>
            <form>
              <input
                type="text"
                className="form-control mb-3 white-placeholder"
                placeholder="Your Name"
              />
              <input
                type="email"
                className="form-control mb-3 white-placeholder"
                placeholder="Your Email"
              />
              <input
                type="text"
                className="form-control mb-3 white-placeholder"
                placeholder="Your Subject"
              />
              <textarea
                className="form-control mb-3 white-placeholder"
                rows="5"
                placeholder="Your Message"
              ></textarea>
              <button className="btn btn-orange" type="submit">
                Send Message
              </button>
            </form>
          </div>

          {/* Right info */}
          <div className="col-lg-6 col-sm-12 text-light">
            <h4 className="text-white mb-3">Contact Info</h4>
            <p>{contactData.description}</p>

            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-envelope-fill me-3 fs-4"></i>
              <div>
                <strong>Email</strong>
                <br />
                {contactData.email.map((mail, idx) => (
                  <div key={idx}>{mail}</div>
                ))}
              </div>
            </div>

            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-telephone-fill me-3 fs-4"></i>
              <div>
                <strong>Phone</strong>
                <br />
                {contactData.phone.map((num, idx) => (
                  <div key={idx}>{num}</div>
                ))}
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <i className="bi bi-geo-alt-fill me-3 fs-4"></i>
              <div>
                <strong>Address</strong>
                <br />
                <div style={{ whiteSpace: "pre-line" }}>
                  {contactData.address}
                </div>
              </div>
            </div>

            <p className="mt-4">Visit my social profile and get connected</p>
            <div className="d-flex gap-3">
              {contactData.socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  title={social.platform}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
