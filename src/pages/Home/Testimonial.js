import React from "react";
import testimonialData from "../../components/Json/testimonial.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonial = () => {
  return (
    <section className="testimonial-section py-5 text-white">
      <div className="container text-center">
        <h2 className="text-orange fw-bold mb-5">
          <span className="border-bottom pb-1">REVIEWS</span>
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={3}
          loop={true}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonialData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="testimonial-card p-4 mb-4 position-relative">
                <div className="quote-box position-relative bg-dark rounded text-light px-4 py-3 mb-4">
                  <span className="quote-icon display-6 text-muted">“</span>
                  <p className="mb-0 small">{item.message}</p>
                  <div className="arrow-down"></div>
                </div>
                <div className="profile">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded-circle mb-2"
                    width="70"
                    height="70"
                  />
                  <h6 className="fw-bold">{item.name}</h6>
                  <p className="text-muted small mb-0">{item.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
