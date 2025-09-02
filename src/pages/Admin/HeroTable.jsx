import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageUploader from "../../components/Admin/ImageUploader";
import {
  getAllHero,
  delteHero,
  addHero,
  editHero,
} from "../../services/Service";
import { toast } from "react-toastify";

const HeroTable = () => {
  const [heroes, setHeroes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingHero, setEditingHero] = useState(null);

  // 🔹 Fetch all heroes
  const fetchHeroes = async () => {
    try {
      // 👉 Add your GET API call here
      const payLoad = {
        data: { filter: "" },
        page: 0,
        pageSize: 50,
        order: [["createdAt", "ASC"]],
      };
      getAllHero(payLoad)
        .then((res) => {
          setHeroes(res?.data?.data?.rows);
        })
        .catch((err) => {
          console.log(err);
        });
      // setHeroes(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  // 🔹 Validation schema with Yup
  const validationSchema = Yup.object({
    herophoto: Yup.string()
      .url("Must be a valid URL")
      .required("Photo URL is required"),
    herotitle: Yup.string().required("Hero title is required"),
    heroSubTitle: Yup.string().required("Hero subtitle is required"),
    socialMediaLinks: Yup.string()
      .test("is-json", "Must be valid JSON", (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch {
          return false;
        }
      })
      .required("Social media links are required"),
  });

  // 🔹 Open modal
  const handleShowModal = (hero = null) => {
    setEditingHero(hero);
    setShowModal(true);
  };

  // 🔹 Delete hero
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hero?")) {
      try {
        // 👉 Add your DELETE API call here
        delteHero(id)
          .then((res) => {
            toast(res?.data?.msg);
            fetchHeroes();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Hero Section Management</h2>
      <button className="btn btn-primary" onClick={() => handleShowModal()}>
        Add Hero
      </button>

      {/* Table */}
      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Photo</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Social Media Links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroes.map((hero, index) => (
            <tr key={hero.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={hero.herophoto}
                  alt="Hero"
                  width="60"
                  height="40"
                  style={{ objectFit: "cover" }}
                />
              </td>
              <td>{hero.herotitle}</td>
              <td>{hero.heroSubTitle}</td>
              <td>
                <pre>{JSON.stringify(hero.socialMediaLinks, null, 2)}</pre>
              </td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleShowModal(hero)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(hero.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div
              className="modal-content"
              style={{ backgroundColor: "#fff", color: "#000" }}
            >
              <Formik
                initialValues={{
                  id: editingHero?.id || null,
                  herophoto: editingHero?.herophoto || "",
                  herotitle: editingHero?.herotitle || "",
                  heroSubTitle: editingHero?.heroSubTitle || "",
                  socialMediaLinks: editingHero
                    ? JSON.stringify(editingHero.socialMediaLinks, null, 2)
                    : "{}",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    if (values.id) {
                      // 👉 Add your PUT API call here
                      // await fetch(`/api/heroes/${values.id}`, { method: "PUT", body: JSON.stringify(values) });
                      const payLoad = {
                        ...values,
                      };
                      editHero(values.id, payLoad)
                        .then((res) => {
                          toast(res?.data?.msg);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    } else {
                      // 👉 Add your POST API call here
                      // await fetch("/api/heroes", { method: "POST", body: JSON.stringify(values) });
                      const payLoad = {
                        ...values,
                      };
                      addHero(payLoad).then((res) => {
                        toast(res?.data?.msg);
                      });
                    }
                    setShowModal(false);
                    fetchHeroes();
                  } catch (err) {
                    console.error(err);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, values }) => (
                  <Form>
                    <div
                      className="modal-header"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <h5 className="modal-title">
                        {values.id ? "Edit Hero" : "Add Hero"}
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                      ></button>
                    </div>
                    <div
                      className="modal-body"
                      style={{ backgroundColor: "#fff" }}
                    >
                      {/* Photo */}
                      {/* Photo Upload */}
                      <div className="mb-3">
                        <label className="form-label">Hero Photo</label>
                        <Field name="herophoto">
                          {({ field, form }) => (
                            <>
                              <input
                                type="text"
                                className={`form-control mb-2 ${
                                  form.touched.herophoto &&
                                  form.errors.herophoto
                                    ? "is-invalid"
                                    : ""
                                } custom-placeholder text-light`}
                                placeholder="Paste Image URL"
                                {...field}
                              />
                              {/* 🔹 Your custom uploader component */}
                              <ImageUploader
                                onUpload={(url) =>
                                  form.setFieldValue("herophoto", url)
                                }
                              />
                              <div className="invalid-feedback">
                                {form.errors.herophoto}
                              </div>

                              {/* 🔹 Preview */}
                              {form.values.herophoto && (
                                <img
                                  src={form.values.herophoto}
                                  className="mt-3 img-fluid rounded shadow-sm"
                                  alt="Preview"
                                />
                              )}
                            </>
                          )}
                        </Field>
                      </div>

                      {/* Title */}
                      <div className="mb-3">
                        <label className="form-label">Hero Title</label>
                        <Field
                          type="text"
                          name="herotitle"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="herotitle"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Subtitle */}
                      <div className="mb-3">
                        <label className="form-label">Hero Subtitle</label>
                        <Field
                          type="text"
                          name="heroSubTitle"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="heroSubTitle"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Social Media Links */}
                      <div className="mb-3">
                        <label className="form-label">
                          Social Media Links (JSON)
                        </label>
                        <Field
                          as="textarea"
                          rows={3}
                          name="socialMediaLinks"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="socialMediaLinks"
                          component="div"
                          className="text-danger"
                        />
                        <div className="form-text">
                          Example: {"{"}
                          "facebook":"fb.com/xyz","twitter":"twitter.com/xyz"
                          {"}"}
                        </div>
                      </div>
                    </div>
                    <div
                      className="modal-footer"
                      style={{ backgroundColor: "#fff" }}
                    >
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {values.id ? "Update" : "Add"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroTable;
