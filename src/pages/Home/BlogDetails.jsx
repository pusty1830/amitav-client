import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 blog comes directly from navigation state
  const blog = location.state?.blog;

  if (!blog) {
    return <h2 className="text-center text-danger">Blog not found</h2>;
  }

  return (
    <div className="container py-4 px-3 px-md-5">
      {/* Back Button */}
      <button
        className="btn btn-warning mb-4 fw-semibold shadow-sm"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card bg-dark border-0 text-white shadow-lg rounded-4 overflow-hidden">
        {/* Blog Image */}
        <div className="position-relative">
          <img
            src={blog.blogImg}
            className="img-fluid w-100"
            alt="blog"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <div
            className="position-absolute bottom-0 start-0 w-100 p-3"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            }}
          >
            <h2 className="fw-bold text-white">{blog.title}</h2>
          </div>
        </div>

        {/* Blog Content */}
        <div className="card-body p-4 p-md-5">
          <p className="mb-3 small text-light">
            By:{" "}
            <span className="text-warning fw-semibold">
              {blog.userId === 1 ? "Amitav Pusty" : "Guest Author"}
            </span>{" "}
            |{" "}
            <span className="text-warning">
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>

          <p
            className="lh-lg fs-6 fs-md-5"
            style={{ textAlign: "justify", lineHeight: "1.8" }}
          >
            {blog.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
