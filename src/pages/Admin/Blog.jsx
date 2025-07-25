import React, { useState, useRef, useEffect } from "react";

export default function BlogManager() {
  const [blogs, setBlogs] = useState([
    {
      title: "AI in Education",
      blogImg: "https://via.placeholder.com/100x60",
      content:
        "Artificial Intelligence is revolutionizing modern learning systems...",
      blogVdo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    blogImg: "",
    content: "",
    blogVdo: "",
  });

  const [editIndex, setEditIndex] = useState(null);
  const modalRef = useRef();

  const resetForm = () => {
    setFormData({ title: "", blogImg: "", content: "", blogVdo: "" });
    setEditIndex(null);
  };

  const openModal = () => {
    const modal = new window.bootstrap.Modal(modalRef.current);
    modal.show();
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      const updated = [...blogs];
      updated[editIndex] = formData;
      setBlogs(updated);
    } else {
      setBlogs([...blogs, formData]);
    }
    resetForm();
    modalRef.current.querySelector(".btn-close").click();
  };

  const handleEdit = (index) => {
    setFormData(blogs[index]);
    setEditIndex(index);
    openModal();
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const updated = blogs.filter((_, i) => i !== index);
      setBlogs(updated);
    }
  };

  return (
    <div className="container my-5 text-white bg-dark p-4 rounded">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>📚 Blog Manager</h3>
        <button
          className="btn btn-light"
          onClick={() => {
            resetForm();
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <tr key={i}>
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
                <td colSpan="6" className="text-center">
                  No blogs added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-control bg-black text-white"
                    placeholder="Enter blog title"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    name="blogImg"
                    value={formData.blogImg}
                    onChange={handleChange}
                    className="form-control bg-black text-white"
                    placeholder="Enter image URL"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="form-control bg-black text-white"
                    rows="4"
                    placeholder="Enter blog content"
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Video URL (optional)</label>
                  <input
                    name="blogVdo"
                    value={formData.blogVdo}
                    onChange={handleChange}
                    className="form-control bg-black text-white"
                    placeholder="YouTube / Vimeo URL"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer border-secondary">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleAddOrUpdate}>
                {editIndex !== null ? "Update Blog" : "Add Blog"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
