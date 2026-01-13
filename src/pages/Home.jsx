import React from "react";
import { CTA, Navbar } from "../components";
import {
  Header,
  WhatMN,
  Features,
  RecentWork, // Imported
  Possibility,
  Blog,
  ClinetsCarousal,
  Testimonials,
  Footer,
  Contact,
} from "../containers";

const Home = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>

      <WhatMN />
      <Features />
      <RecentWork />
      <Possibility />
      <CTA />
      <ClinetsCarousal />

      <Blog limit={3} />

      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
