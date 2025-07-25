import React from "react";
import serviceData from "../../components/Json/service.json";

const Service = () => {
  return (
    <div
      className="py-5"
      style={{
        background: "rgb(25, 25, 25)",
        minHeight: "100vh",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="text-warning fw-bold display-5">My Services</h2>
          <p className="text-light fs-5">
            I provide high-quality solutions to accelerate your digital goals.
          </p>
        </div>

        <div className="row">
          {serviceData.map((service) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={service.id}>
              <div
                className="card text-white text-center p-4 h-100 shadow border-0"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="img-fluid mx-auto"
                  style={{ width: "80px", height: "80px" }}
                />
                <h4 className="pt-4 text-warning">{service.title}</h4>
                <p className="pt-3 text-light">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
