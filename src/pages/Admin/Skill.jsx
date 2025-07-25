import React, { useEffect, useState } from "react";
import {
  addSkills,
  delteSkills,
  editSkills,
  getAllSkills,
} from "../../services/Service";
import { toast } from "react-toastify";

export default function MySkillsManager() {
  const [skills, setSkills] = useState([
    {
      id: 1,
      title: "Frontend Dev",
      leftTitle: "React",
      leftSubTitle: "Modern JS",
      rightSkills: [
        { skill: "React", percentage: 90 },
        { skill: "Bootstrap", percentage: 80 },
      ],
    },
  ]);

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllSkills(payLoad)
      .then((res) => {
        console.log(res);
        setSkills(res?.data?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    leftTitle: "",
    leftSubTitle: "",
    rightSkills: [],
  });

  const [editMode, setEditMode] = useState(false);

  const openModal = (skill = null) => {
    if (skill) {
      setEditMode(true);
      setFormData({
        ...skill,
        rightSkills: skill.rightSkills || [],
      });
    } else {
      setEditMode(false);
      setFormData({
        id: null,
        title: "",
        leftTitle: "",
        leftSubTitle: "",
        rightSkills: [],
      });
    }
    const modal = new window.bootstrap.Modal(
      document.getElementById("skillModal")
    );
    modal.show();
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const updatedSkill = {
      ...formData,
      id: formData.id || Date.now(),
    };
    const { id, ...payLoad } = formData;

    if (editMode) {
      editSkills(id, payLoad)
        .then((res) => {
          toast.success(res?.data?.msg);
        })
        .catch((err) => {
          console.log(err);
        });
      setSkills((prev) =>
        prev.map((s) => (s.id === formData.id ? updatedSkill : s))
      );
    } else {
      // console.log(payLoad);
      addSkills(payLoad)
        .then((res) => {
          toast.success(res?.data?.msg);
        })
        .catch((err) => {
          console.log(err);
        });
      setSkills((prev) => [...prev, updatedSkill]);
    }

    const modalEl = document.getElementById("skillModal");
    const modal = window.bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  };

  const handleDelete = (id) => {
    delteSkills(id)
      .then((res) => {
        toast.success(res?.data?.msg);
      })
      .catch((err) => {
        console.log(err);
      });
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="container mt-5 text-light bg-dark p-4 rounded">
      <h2 className="mb-4">Manage My Skills</h2>
      <button className="btn btn-success mb-3" onClick={() => openModal()}>
        Add New Skill
      </button>

      <table className="table table-bordered table-dark table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Left Title</th>
            <th>Left SubTitle</th>
            <th>Right Skills</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((s, idx) => (
            <tr key={s.id}>
              <td>{idx + 1}</td>
              <td>{s.title}</td>
              <td>{s.leftTitle}</td>
              <td>{s.leftSubTitle}</td>
              <td>
                {(() => {
                  let parsedSkills = [];
                  try {
                    parsedSkills = JSON.parse(s.rightSkills || "[]");
                  } catch (e) {
                    console.error("Invalid JSON in rightSkills:", e);
                  }

                  return parsedSkills.map((r, i) => (
                    <div key={i}>
                      {r.skill} - {r.percentage}%
                    </div>
                  ));
                })()}
              </td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openModal(s)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(s.id)}
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
        id="skillModal"
        tabIndex="-1"
        aria-labelledby="skillModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-light">
            <div className="modal-header">
              <h5 className="modal-title" id="skillModalLabel">
                {editMode ? "Edit Skill" : "Add Skill"}
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
                  className="form-control bg-secondary text-light"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Left Title</label>
                <input
                  name="leftTitle"
                  className="form-control bg-secondary text-light"
                  value={formData.leftTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Left SubTitle</label>
                <input
                  name="leftSubTitle"
                  className="form-control bg-secondary text-light"
                  value={formData.leftSubTitle}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Right Skills</label>
                {formData.rightSkills.map((item, index) => (
                  <div className="d-flex mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control me-2 bg-secondary text-light"
                      placeholder="Skill"
                      value={item.skill}
                      onChange={(e) => {
                        const updated = [...formData.rightSkills];
                        updated[index].skill = e.target.value;
                        setFormData({ ...formData, rightSkills: updated });
                      }}
                    />
                    <input
                      type="number"
                      className="form-control me-2 bg-secondary text-light"
                      placeholder="%"
                      value={item.percentage}
                      onChange={(e) => {
                        const updated = [...formData.rightSkills];
                        updated[index].percentage = e.target.value;
                        setFormData({ ...formData, rightSkills: updated });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        const updated = [...formData.rightSkills];
                        updated.splice(index, 1);
                        setFormData({ ...formData, rightSkills: updated });
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-light btn-sm mt-2"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      rightSkills: [
                        ...formData.rightSkills,
                        { skill: "", percentage: "" },
                      ],
                    })
                  }
                >
                  + Add Skill
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
