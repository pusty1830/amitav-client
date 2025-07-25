import React, { useState } from "react";

export default function ResumeManager() {
  const [resumes, setResumes] = useState([
    {
      id: 1,
      title: "Frontend Developer Resume",
      leftheader: "Experience",
      leftexp: [
        {
          title: "React Developer",
          duration: "2022 - Present",
          company: "TechCorp",
          description: "Developed modern UIs using React and Redux.",
        },
      ],
      rightheader: "Education",
      righteducation: [
        {
          degree: "BSc Computer Science",
          year: "2018 - 2022",
          institution: "ABC University",
          description: "Focused on frontend development and web technologies.",
        },
      ],
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    leftheader: "",
    leftexp: [],
    rightheader: "",
    righteducation: [],
  });

  const [editMode, setEditMode] = useState(false);

  const openModal = (resume = null) => {
    if (resume) {
      setEditMode(true);
      setFormData({ ...resume });
    } else {
      setEditMode(false);
      setFormData({
        id: null,
        title: "",
        leftheader: "",
        leftexp: [
          {
            title: "",
            duration: "",
            company: "",
            description: "",
          },
        ],
        rightheader: "",
        righteducation: [
          {
            degree: "",
            year: "",
            institution: "",
            description: "",
          },
        ],
      });
    }

    const modal = new window.bootstrap.Modal(
      document.getElementById("resumeModal")
    );
    modal.show();
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleExpChange = (index, field, value) => {
    const updated = [...formData.leftexp];
    updated[index][field] = value;
    setFormData({ ...formData, leftexp: updated });
  };

  const handleEduChange = (index, field, value) => {
    const updated = [...formData.righteducation];
    updated[index][field] = value;
    setFormData({ ...formData, righteducation: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      leftexp: [
        ...formData.leftexp,
        { title: "", duration: "", company: "", description: "" },
      ],
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      righteducation: [
        ...formData.righteducation,
        { degree: "", year: "", institution: "", description: "" },
      ],
    });
  };

  const removeExperience = (index) => {
    const updated = [...formData.leftexp];
    updated.splice(index, 1);
    setFormData({ ...formData, leftexp: updated });
  };

  const removeEducation = (index) => {
    const updated = [...formData.righteducation];
    updated.splice(index, 1);
    setFormData({ ...formData, righteducation: updated });
  };

  const handleSubmit = () => {
    const newData = { ...formData };

    if (editMode) {
      setResumes((prev) =>
        prev.map((r) => (r.id === formData.id ? newData : r))
      );
    } else {
      newData.id = Date.now();
      setResumes((prev) => [...prev, newData]);
    }

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("resumeModal")
    );
    modal.hide();
  };

  const handleDelete = (id) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="container mt-5 text-white">
      <h2 className="mb-4">Manage Resumes</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Add New Resume
      </button>

      <table className="table table-dark table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Left Header</th>
            <th>Right Header</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((r, idx) => (
            <tr key={r.id}>
              <td>{idx + 1}</td>
              <td>{r.title}</td>
              <td>{r.leftheader}</td>
              <td>{r.rightheader}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openModal(r)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(r.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div
        className="modal fade"
        id="resumeModal"
        tabIndex="-1"
        aria-labelledby="resumeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="resumeModalLabel">
                {editMode ? "Edit Resume" : "Add Resume"}
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
                  name="title"
                  className="form-control text-white"
                  style={{ colorScheme: "dark" }}
                  placeholder="Enter resume title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Left Header</label>
                <input
                  name="leftheader"
                  className="form-control text-white"
                  style={{ colorScheme: "dark" }}
                  placeholder="Experience"
                  value={formData.leftheader}
                  onChange={handleChange}
                />
              </div>

              <h6>Experience</h6>
              {formData.leftexp.map((exp, i) => (
                <div key={i} className="border p-3 mb-2">
                  <input
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Title"
                    value={exp.title}
                    onChange={(e) => handleExpChange(i, "title", e.target.value)}
                  />
                  <input
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Duration"
                    value={exp.duration}
                    onChange={(e) =>
                      handleExpChange(i, "duration", e.target.value)
                    }
                  />
                  <input
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExpChange(i, "company", e.target.value)}
                  />
                  <textarea
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Description"
                    value={exp.description}
                    onChange={(e) =>
                      handleExpChange(i, "description", e.target.value)
                    }
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeExperience(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button className="btn btn-secondary btn-sm mb-3" onClick={addExperience}>
                Add Experience
              </button>

              <div className="mb-3 mt-3">
                <label className="form-label">Right Header</label>
                <input
                  name="rightheader"
                  className="form-control text-white"
                  style={{ colorScheme: "dark" }}
                  placeholder="Education"
                  value={formData.rightheader}
                  onChange={handleChange}
                />
              </div>

              <h6>Education</h6>
              {formData.righteducation.map((edu, i) => (
                <div key={i} className="border p-3 mb-2">
                  <input
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) =>
                      handleEduChange(i, "degree", e.target.value)
                    }
                  />
                  <input
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleEduChange(i, "year", e.target.value)}
                  />
                  <input
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) =>
                      handleEduChange(i, "institution", e.target.value)
                    }
                  />
                  <textarea
                    className="form-control text-white mb-2"
                    style={{ colorScheme: "dark" }}
                    placeholder="Description"
                    value={edu.description}
                    onChange={(e) =>
                      handleEduChange(i, "description", e.target.value)
                    }
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeEducation(i)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button className="btn btn-secondary btn-sm" onClick={addEducation}>
                Add Education
              </button>
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
