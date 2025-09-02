import React, { Suspense, lazy } from "react";

// ✅ Lazy imports
const Hero = lazy(() => import("./Hero"));
const About = lazy(() => import("./About"));
const Service = lazy(() => import("./Service"));
const Education = lazy(() => import("./Education"));
const Skill = lazy(() => import("./Skill"));
const Testimonial = lazy(() => import("./Testimonial"));
const Blog = lazy(() => import("./Blog"));
const Contact = lazy(() => import("./Contact"));
const Portfolio = lazy(() => import("./Portfolio"));

// ✅ Fallback loader
const Loader = () => (
  <div style={{ textAlign: "center", padding: "2rem", color: "#ffcc00" }}>
    Loading...
  </div>
);

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      {/* 🏠 Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* 👤 About Section */}
      <section id="about">
        <About />
      </section>

      {/* 🛠 Services */}
      <section id="service">
        <Service />
      </section>

      {/* 🎓 Resume/Education */}
      <section id="resume">
        <Skill />
        <Education />
      </section>

      {/* 🖼 Portfolio */}
      <section id="portfolio">
        <Portfolio />
      </section>

      {/* 📝 Blog */}
      <section id="blog">
        <Blog limit={3} />
      </section>

      {/* 📞 Contact */}
      <section id="contact">
        <Contact />
      </section>
    </Suspense>
  );
};

export default Home;
