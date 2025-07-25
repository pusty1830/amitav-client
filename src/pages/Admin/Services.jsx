import React, { useState, useEffect } from "react";
import {
  addService,
  delteService,
  editService,
  getAllService,
} from "../../services/Service";
import { toast } from "react-toastify";

export default function ServiceManager() {
  const [services, setServices] = useState([
    {
      id: 1,
      icon: "fa-solid fa-dumbbell",
      cardTitile: "Strength Training",
      cardSubTitle: "Improve endurance & power",
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    icon: "",
    cardTitile: "",
    cardSubTitle: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllService(payLoad)
      .then((res) => {
        setServices(res?.data?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModal = (service = null) => {
    if (service) {
      setEditMode(true);
      setFormData({ ...service });
    } else {
      setEditMode(false);
      setFormData({ id: null, icon: "", cardTitile: "", cardSubTitle: "" });
    }

    const modal = new window.bootstrap.Modal(
      document.getElementById("serviceModal")
    );
    modal.show();
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const updated = { ...formData, id: formData.id || Date.now() };

    const payLoad = {
      icon: formData.icon,
      cardTitile: formData.cardTitile,
      cardSubTitle: formData.cardSubTitle,
    };

    if (editMode) {
      editService(formData.id, payLoad)
        .then((res) => {
          toast(res?.data?.msg);
          setServices((prev) =>
            prev.map((s) => (s.id === formData.id ? updated : s))
          );
        })
        .catch((err) => console.log(err));
    } else {
      addService(payLoad)
        .then((res) => {
          toast(res?.data?.msg);
          setServices((prev) => [...prev, updated]);
        })
        .catch((err) => console.log(err));
    }

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("serviceModal")
    );
    modal.hide();
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4">Manage Services</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Add New Service
      </button>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Icon</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s, idx) => (
            <tr key={s.id}>
              <td>{idx + 1}</td>
              <td>
                <i className={s.icon}></i>{" "}
                <span className="ms-2">{s.icon}</span>
              </td>
              <td>{s.cardTitile}</td>
              <td>{s.cardSubTitle}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openModal(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteConfirmModal"
                  onClick={() => setDeleteTarget(s)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      <div
        className="modal fade"
        id="serviceModal"
        tabIndex="-1"
        aria-labelledby="serviceModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="serviceModalLabel">
                {editMode ? "Edit Service" : "Add Service"}
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
                <label className="form-label">Icon (FontAwesome class)</label>
                <input
                  name="icon"
                  className="form-control"
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="e.g. fa-solid fa-dumbbell"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Card Title</label>
                <input
                  name="cardTitile"
                  className="form-control"
                  value={formData.cardTitile}
                  onChange={handleChange}
                  placeholder="e.g. Strength Training"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Card Subtitle</label>
                <input
                  name="cardSubTitle"
                  className="form-control"
                  value={formData.cardSubTitle}
                  onChange={handleChange}
                  placeholder="e.g. Improve endurance & power"
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

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteConfirmModal"
        tabIndex="-1"
        aria-labelledby="deleteConfirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteConfirmModalLabel">
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              Are you sure you want to delete the service{" "}
              <strong>{deleteTarget?.cardTitile}</strong>?
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  setServices((prev) =>
                    prev.filter((s) => s.id !== deleteTarget.id)
                  );
                  delteService(deleteTarget.id)
                    .then((res) => {
                      toast(res?.data?.msg);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                  setDeleteTarget(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
