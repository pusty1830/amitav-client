import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import contactData from "../../components/Json/contact.json";
import { addContact } from "../../services/Service";
import { toast } from "react-toastify";

const Contact = () => {
  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Your Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Your Email is required"),
    subject: Yup.string().required("Your Subject is required"),
    message: Yup.string().required("Your Message is required"),
  });

  // ✅ Initial Values
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  // ✅ On Submit
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    const payLoad = {
      name: values.name,
      email: values.email,
      yourSubject: values.subject,
      message: values.message,
    };

    addContact(payLoad)
      .then((res) => {
        toast("Your Message Sent To The Admin Will Contact You Soon ");
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* Name */}
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="name"
                      className="form-control white-placeholder"
                      placeholder="Your Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <Field
                      type="email"
                      name="email"
                      className="form-control white-placeholder"
                      placeholder="Your Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Subject */}
                  <div className="mb-3">
                    <Field
                      type="text"
                      name="subject"
                      className="form-control white-placeholder"
                      placeholder="Your Subject"
                    />
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-3">
                    <Field
                      as="textarea"
                      name="message"
                      rows="5"
                      className="form-control white-placeholder"
                      placeholder="Your Message"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    className="btn btn-orange"
                    type="submit"
                    disabled={isSubmitting} // ✅ Disabled while submitting
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </Form>
              )}
            </Formik>
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
