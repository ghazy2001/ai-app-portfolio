import React from "react";
import { Navbar } from "../components";
import { Possibility, Footer } from "../containers";

const Services = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* show "خدمتنا" (Possibility) first on Services page */}
        <Possibility />
      </main>
      <Footer />
    </>
  );
};

export default Services;
