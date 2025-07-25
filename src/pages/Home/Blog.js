import React from "react";
import blogData from "../../components/Json/blog.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

const Blog = () => {
  return (
    <section className="blog-section py-5 text-white">
      <div className="container">
        <h2 className="text-center text-orange fw-bold mb-5">
          <span className="border-bottom pb-1">BLOG</span>
        </h2>
        <Swiper
          modules={[Autoplay]}
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
              <div className="card blog-card bg-dark border-0 text-white m-lg-3">
                <img src={item.image} className="card-img-top" alt="blog" />
                <div className="card-body">
                  <p className="small">
                    By: <span className="text-warning">{item.author}</span> |{" "}
                    <span className="text-warning">{item.date}</span>
                  </p>
                  <h6 className="card-title">{item.title}</h6>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Blog;
