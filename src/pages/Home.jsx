import React from "react";
import { Brand, CTA, Feature, Navbar } from "../components";
import {
  Header,
  WhatMN,
  Features,
  Possibility,
  Blog,
  ClinetsCarousal,
  Testimonials,
  Footer,
} from "../containers";

const Home = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <WhatMN />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <ClinetsCarousal />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
