import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { portfolioBg } from "../Images/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginSchema } from "../components/utils/Schema";
import { Signin } from "../services/Service";
import { setCurrentAccessToken } from "../services/axiosClient";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const payLoad = {
        email: values.email,
        password: values.password,
      };

      const res = await Signin(payLoad);
      const accessToken = res?.data?.data?.accessToken;
      const role = res?.data?.data?.role?.toLowerCase();

      setCurrentAccessToken(accessToken);

      if (role === "admin") {
        window.location.href = `/admin/dashboard`;
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error(error);
      setErrors({ general: "Invalid email or password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 bg-dark position-relative"
      style={{
        backgroundImage: `url('${portfolioBg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="position-absolute top-0 bottom-0 start-0 end-0 bg-black bg-opacity-50"></div>

      <div
        className="card p-4 p-md-5 bg-light bg-opacity-75 rounded-4 shadow-lg position-relative"
        style={{ zIndex: 1, width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 text-dark fw-bold">
          Welcome <span className="text-success">Back</span>
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label text-dark fw-semibold">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  className="form-control shadow-sm rounded-3 text-dark"
                  placeholder="Enter your email"
                  style={{ backgroundColor: "#ffffffcc" }}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-dark fw-semibold">
                  Password
                </label>
                <div className="input-group">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control shadow-sm rounded-start text-dark"
                    placeholder="Enter your password"
                    style={{ backgroundColor: "#ffffffcc" }}
                  />
                  <span
                    className="input-group-text bg-light text-dark"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </span>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger small mt-1"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label
                    className="form-check-label text-dark"
                    htmlFor="rememberMe"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-decoration-none text-primary small">
                  Forgot password?
                </a>
              </div>

              {errors.general && (
                <div className="text-danger text-center mb-2">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-success w-100 shadow-sm fw-semibold"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p
          className="text-center text-muted mt-4 mb-0"
          style={{ fontSize: "0.9rem" }}
        >
          Need help accessing your account?{" "}
          <a href="#" className="text-decoration-underline text-primary">
            Contact support
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
