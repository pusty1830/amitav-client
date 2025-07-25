import React from "react";
import About from "./About";
import Service from "./Service";
import Education from "./Education";
import Skill from "./Skill";
import Testimonial from "./Testimonial";
import Blog from "./Blog";
import Contact from "./Contact";
import Portfolio from "./Portfolio";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Service />
      <Skill />
      <Education />
      <Portfolio />
      {/* <Testimonial /> */}
      {/* <Blog /> */}
      <Contact />
    </div>
  );
};

export default Home;
