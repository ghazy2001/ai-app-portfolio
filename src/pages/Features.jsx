import React from "react";
import Features from "../containers/features/Features";
import { Navbar } from "../components";

const FeaturesPage = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* show "خدمتنا" (Possibility) first on Services page */}
        <Features />
      </main>
      <Footer />
    </>
  );
};

export default FeaturesPage;
