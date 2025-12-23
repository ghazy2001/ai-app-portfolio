import React from "react";
import { CTA, Navbar } from "../components";
import {
  Header,
  WhatMN,
  Features,
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
