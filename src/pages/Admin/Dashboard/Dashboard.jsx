import React from "react";
import {
  FaProjectDiagram,
  FaTools,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";

export default function Dashboard() {
  // Dummy data
  const stats = [
    {
      id: 1,
      title: "Total Projects",
      count: 12,
      icon: <FaProjectDiagram size={40} />,
      color: "primary",
      description: "Showcase your best work here",
    },
    {
      id: 2,
      title: "Skills",
      count: 8,
      icon: <FaTools size={40} />,
      color: "success",
      description: "Your top technical skills",
    },
    {
      id: 3,
      title: "Messages",
      count: 5,
      icon: <FaEnvelope size={40} />,
      color: "warning",
      description: "Unread client messages",
    },
    {
      id: 4,
      title: "About Section",
      count: "Updated",
      icon: <FaUserCircle size={40} />,
      color: "info",
      description: "Your personal introduction",
    },
  ];

  return (
    <div className="container">
      <h2 className="mb-4 fw-bold">Welcome, Admin 👋</h2>
      <p className="text-light mb-5">
        Here’s a quick overview of your portfolio content.
      </p>

      <div className="row g-4">
        {stats.map((stat) => (
          <div key={stat.id} className="col-12 col-sm-6 col-lg-3">
            <div
              className={`card border-0 shadow-sm h-100 text-white bg-${stat.color}`}
            >
              <div className="card-body d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">{stat.icon}</div>
                  <div>
                    <h5 className="card-title mb-0">{stat.title}</h5>
                    <small className="text-white-50">{stat.description}</small>
                  </div>
                </div>
                <div className="text-end">
                  <h2 className="fw-bold">{stat.count}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h4 className="fw-bold mb-3">Quick Tips</h4>
        <ul className="list-group shadow-sm">
          <li className="list-group-item">
            ✅ Keep your projects up to date for better impression.
          </li>
          <li className="list-group-item">
            ✅ Respond to client messages promptly.
          </li>
          <li className="list-group-item">
            ✅ Highlight your top skills to attract better jobs.
          </li>
          <li className="list-group-item">
            ✅ Make sure your About section is professional.
          </li>
        </ul>
      </div>
    </div>
  );
}
