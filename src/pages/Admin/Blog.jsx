import React, { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUserId } from "../../services/axiosClient";
import {
  addBlog,
  delteBlog,
  editBlog,
  getAllBlog,
} from "../../services/Service";
import { toast } from "react-toastify";

// Validation Schema
const BlogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  blogImg: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
  blogVdo: Yup.string().url("Must be a valid URL").nullable(),
  userId: Yup.string().required("User ID is required"),
});

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const modalRef = useRef();

  // Load blogs
  const fetchBlogs = () => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "ASC"]],
    };
    getAllBlog(payLoad)
      .then((res) => {
        setBlogs(res?.data?.data?.rows || []);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const closeModal = () => {
    modalRef.current.querySelector(".btn-close").click();
  };

  const handleSubmit = (values, { resetForm }) => {
    if (editIndex !== null) {
      // Update blog
      const blogToUpdate = blogs[editIndex];
      const payLoad = {
        ...values,
        userId: getUserId(),
      };
      editBlog(blogToUpdate.id, payLoad)
        .then((res) => {
          toast.success(res?.data?.msg || "Blog updated successfully");
          fetchBlogs();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error updating blog");
        });
    } else {
      // Add new blog
      const payLoad = {
        userId: getUserId(),
        ...values,
      };
      addBlog(payLoad)
        .then((res) => {
          toast.success(res?.data?.msg || "Blog added successfully");
          fetchBlogs();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error adding blog");
        });
    }
    resetForm();
    setEditIndex(null);
    closeModal();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    openModal();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updated = blogs.filter((_, i) => i !== index);

      setBlogs(updated);
      delteBlog(index)
        .then((res) => {
          toast(res?.data?.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container my-5 text-white bg-dark p-4 rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📚 Blog Manager</h3>
        <button
          className="btn btn-light"
          onClick={() => {
            setEditIndex(null);
            openModal();
          }}
        >
          ➕ Add Blog
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-dark table-bordered table-hover align-middle">
          <thead className="table-light text-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Content</th>
              <th>Video</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <tr key={blog.id || i}>
                  <td>{i + 1}</td>
                  <td>{blog.title}</td>
                  <td>
                    <img
                      src={blog.blogImg}
                      alt="Blog"
                      width={100}
                      height={60}
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{blog.content.slice(0, 50)}...</td>
                  <td>
                    {blog.blogVdo ? (
                      <a
                        href={blog.blogVdo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-info"
                      >
                        🎥 View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{blog.userId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(i)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(i)}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No blogs added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal with Formik */}
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="blogModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-secondary">
              <h5 className="modal-title" id="blogModalLabel">
                {editIndex !== null ? "Edit Blog" : "Add Blog"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <Formik
              initialValues={
                editIndex !== null
                  ? blogs[editIndex]
                  : {
                      title: "",
                      blogImg: "",
                      content: "",
                      blogVdo: "",
                      userId: "",
                    }
              }
              validationSchema={BlogSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {() => (
                <Form>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Title</label>
                      <Field
                        name="title"
                        className="form-control bg-black text-white"
                        placeholder="Enter blog title"
                      />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Image URL</label>
                      <Field
                        name="blogImg"
                        className="form-control bg-black text-white"
                        placeholder="Enter image URL"
                      />
                      <ErrorMessage
                        name="blogImg"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Content</label>
                      <Field
                        as="textarea"
                        name="content"
                        rows="4"
                        className="form-control bg-black text-white"
                        placeholder="Enter blog content"
                      />
                      <ErrorMessage
                        name="content"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Video URL (optional)</label>
                      <Field
                        name="blogVdo"
                        className="form-control bg-black text-white"
                        placeholder="YouTube / Vimeo URL"
                      />
                      <ErrorMessage
                        name="blogVdo"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">User ID</label>
                      <Field
                        name="userId"
                        className="form-control bg-black text-white"
                        placeholder="Enter user ID"
                      />
                      <ErrorMessage
                        name="userId"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-secondary">
                    <button
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success" type="submit">
                      {editIndex !== null ? "Update Blog" : "Add Blog"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
