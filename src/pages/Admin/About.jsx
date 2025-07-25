import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  addAbout,
  delteAbout,
  editAbout,
  getAllAbout,
  UploadFile,
} from "../../services/Service";
import ImageUploader from "../../components/Admin/ImageUploader";
import { toast } from "react-toastify";

export default function About() {
  const [aboutData, setAboutData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    leftImg: Yup.string().required("Image is required"),
    rightSide: Yup.string().required("Heading is required"),
    rightSideSubtittle: Yup.string().required("Subtitle is required"),
    rightSideLevel: Yup.string().required("Level is required"),
    rightSidepara: Yup.string().required("Paragraph is required"),
  });

  const openModal = (id) =>
    new window.bootstrap.Modal(document.getElementById(id)).show();
  const closeModal = (id) =>
    new window.bootstrap.Modal(document.getElementById(id)).hide();

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllAbout(payLoad)
      .then((res) => {
        console.log(res);
        setAboutData(res?.data?.data?.rows);
        setFormInitialValues(res?.data?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddClick = () => {
    setIsEditing(false);
    setFormInitialValues({
      title: "",
      leftImg: "",
      rightSide: "",
      rightSideSubtittle: "",
      rightSideLevel: "",
      rightSidepara: "",
    });
    openModal("aboutModal");
  };

  const handleEditClick = (item, id) => {
    setIsEditing(true);
    setFormInitialValues(item);
    const payLoad = {
      ...item,
    };
    editAbout(id, payLoad)
      .then((res) => {
        toast.success(res?.data?.msg);
      })
      .catch((err) => {
        console.log(err);
      });
    openModal("aboutModal");
  };

  const handleSave = (values) => {
    setAboutData({ ...values, id: aboutData?.id || 1 });
    const payLoad = {
      ...values,
    };
    addAbout(payLoad)
      .then((res) => {
        toast(res?.data?.msg);
        closeModal("aboutModal");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file)); // show preview while uploading

    const formData = new FormData();
    formData.append("image", file);

    try {
      UploadFile(formData).then((res) => {
        console.log(res);
      });

      //   if (data?.url) {
      //     onUpload(data.url); // send URL back to parent
      //   } else {
      //     alert("Upload failed.");
      //   }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedItemId(id);
    openModal("deleteModal");
  };
  const handleDeleteConfirm = () => {
    if (!selectedItemId) return;

    delteAbout(selectedItemId)
      .then((res) => {
        toast.success(res?.data?.msg || "Deleted successfully");
        // Remove from state
        setAboutData((prev) =>
          prev.filter((item) => item.id !== selectedItemId)
        );
        setSelectedItemId(null);
        closeModal("deleteModal");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete");
      });
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-success">
          {aboutData?.title || "About Section"}
        </h2>
        <button className="btn btn-success" onClick={handleAddClick}>
          Add About
        </button>
      </div>

      <div className="table-responsive shadow rounded">
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>Left Image</th>
              <th>Heading</th>
              <th>Subtitle</th>
              <th>Level</th>
              <th>Paragraph</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {aboutData.map((item, index) => (
              <tr key={item.id || index}>
                <td>
                  <img
                    src={item?.leftImg}
                    alt="About"
                    className="img-thumbnail"
                    style={{ maxWidth: "140px" }}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.rightSide}</td>
                <td>{item.rightSideSubtittle}</td>
                <td>{item.rightSidepara}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEditClick(item, item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <div
        className="modal fade"
        id="aboutModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <Formik
              initialValues={formInitialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSave(values)}
              enableReinitialize
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                setFieldValue,
                values,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {isEditing
                        ? `Edit About Section - ${
                            formInitialValues.title || ""
                          }`
                        : "Add New About Section"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>

                  <div className="modal-body">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label className="form-label text-dark">Title</label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched.title && errors.title ? "is-invalid" : ""
                          } custom-placeholder text-light`}
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Title"
                        />
                        <div className="invalid-feedback">{errors.title}</div>
                      </div>

                      <div className="mb-3 col-md-6">
                        <label className="form-label text-dark">
                          Right Side Heading
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched.rightSide && errors.rightSide
                              ? "is-invalid"
                              : ""
                          } custom-placeholder text-light`}
                          name="rightSide"
                          value={values.rightSide}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Heading"
                        />
                        <div className="invalid-feedback">
                          {errors.rightSide}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label className="form-label text-dark">Subtitle</label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched.rightSideSubtittle &&
                            errors.rightSideSubtittle
                              ? "is-invalid"
                              : ""
                          } custom-placeholder text-light`}
                          name="rightSideSubtittle"
                          value={values.rightSideSubtittle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Subtitle"
                        />
                        <div className="invalid-feedback">
                          {errors.rightSideSubtittle}
                        </div>
                      </div>

                      <div className="mb-3 col-md-6">
                        <label className="form-label text-dark">
                          Right Side Level
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            touched.rightSideLevel && errors.rightSideLevel
                              ? "is-invalid"
                              : ""
                          } custom-placeholder text-light`}
                          name="rightSideLevel"
                          value={values.rightSideLevel}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Level"
                        />
                        <div className="invalid-feedback">
                          {errors.rightSideLevel}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark">
                        Left Image (URL or Upload)
                      </label>
                      <input
                        type="text"
                        className={`form-control mb-2 ${
                          touched.leftImg && errors.leftImg ? "is-invalid" : ""
                        } custom-placeholder text-light`}
                        name="leftImg"
                        value={values.leftImg}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Paste Image URL"
                      />
                      <ImageUploader
                        onUpload={(url) => setFieldValue("leftImg", url)}
                      />
                      <div className="invalid-feedback">{errors.leftImg}</div>
                      {values.leftImg && (
                        <img
                          src={values.leftImg}
                          className="mt-3 img-fluid rounded shadow-sm"
                          alt="Preview"
                        />
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label text-dark">Paragraph</label>
                      <textarea
                        className={`form-control ${
                          touched.rightSidepara && errors.rightSidepara
                            ? "is-invalid"
                            : ""
                        } custom-placeholder text-light`}
                        name="rightSidepara"
                        rows={4}
                        value={values.rightSidepara}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter Paragraph"
                      ></textarea>
                      <div className="invalid-feedback">
                        {errors.rightSidepara}
                      </div>
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
                    <button type="submit" className="btn btn-success">
                      {isEditing ? "Save Changes" : "Add"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark">Confirm Delete</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body text-dark">
              Are you sure you want to delete this About section?
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
                className="btn btn-danger"
                onClick={handleDeleteConfirm}
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
