import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import { getAllBlog } from "../../services/Service";

const Blog = ({ limit }) => {   // 👈 added limit prop
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const payLoad = {
      data: { filter: "" },
      page: 0,
      pageSize: 50,
      order: [["createdAt", "DESC"]], // 👈 latest first
    };
    getAllBlog(payLoad)
      .then((res) => {
        let rows = res?.data?.data?.rows || [];
        if (limit) rows = rows.slice(0, limit); // 👈 apply limit
        setBlogData(rows);
      })
      .finally(() => setLoading(false));
  }, [limit]);

  return (
    <section className="blog-section py-5 text-white">
      <div className="container">
        <h2 className="text-center text-orange fw-bold mb-5">
          <span className="border-bottom pb-1">BLOG</span>
        </h2>

        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              autoplay={{ delay: 3000 }}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {blogData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className="card blog-card bg-dark border-0 text-white m-lg-3"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/blog/${item.id}`, { state: { blog: item } })
                    }
                  >
                    <img
                      src={item.blogImg}
                      className="card-img-top"
                      alt="blog"
                    />
                    <div className="card-body">
                      <p className="small">
                        By:{" "}
                        <span className="text-warning">
                          {item.userId === 1 ? "Amitav Pusty" : "Guest Author"}
                        </span>{" "}
                        |{" "}
                        <span className="text-warning">
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </p>
                      <h6 className="card-title">{item.title}</h6>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {limit && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-warning fw-bold"
                  onClick={() => navigate("/blog")}
                >
                  View More Blogs →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
