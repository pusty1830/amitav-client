import React, { useState, useEffect } from "react";

export default function PortfolioManager() {
  const [portfolios, setPortfolios] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    cardImage: "",
    cardTitle: "",
    cardsubtitle: "",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Dummy Data
    setPortfolios([
      {
        id: Date.now(),
        title: "My First Project",
        cardImage: "https://via.placeholder.com/150",
        cardTitle: "Portfolio Website",
        cardsubtitle: "React + Tailwind + Node.js",
      },
    ]);
  }, []);

  const openModal = (portfolio = null) => {
    if (portfolio) {
      setEditMode(true);
      setFormData(portfolio);
    } else {
      setEditMode(false);
      setFormData({
        id: null,
        title: "",
        cardImage: "",
        cardTitle: "",
        cardsubtitle: "",
      });
    }

    const modal = new window.bootstrap.Modal(
      document.getElementById("portfolioModal")
    );
    modal.show();
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.cardImage ||
      !formData.cardTitle ||
      !formData.cardsubtitle
    ) {
      alert("All fields are required!");
      return;
    }

    if (editMode) {
      setPortfolios((prev) =>
        prev.map((p) => (p.id === formData.id ? formData : p))
      );
    } else {
      setPortfolios((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("portfolioModal")
    );
    modal.hide();
  };

  const handleDelete = (id) => {
    setPortfolios((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4">Manage Portfolios</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Add New Portfolio
      </button>

      <div className="row">
        {portfolios.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card bg-dark text-white">
              <img
                src={item.cardImage}
                className="card-img-top"
                alt="Project"
              />
              <div className="card-body">
                <h5 className="card-title">{item.cardTitle}</h5>
                <p className="card-text">{item.cardsubtitle}</p>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openModal(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="portfolioModal"
        tabIndex="-1"
        aria-labelledby="portfolioModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="portfolioModalLabel">
                {editMode ? "Edit Portfolio" : "Add Portfolio"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Portfolio Project"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Card Image URL</label>
                <input
                  type="text"
                  name="cardImage"
                  value={formData.cardImage}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. https://via.placeholder.com/150"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Card Title</label>
                <input
                  type="text"
                  name="cardTitle"
                  value={formData.cardTitle}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. React Dashboard"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Card Subtitle</label>
                <input
                  type="text"
                  name="cardsubtitle"
                  value={formData.cardsubtitle}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="e.g. Built using React, Tailwind, Node.js"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSubmit}>
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
