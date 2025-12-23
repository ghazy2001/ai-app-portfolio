import React from "react";
import { Navbar } from "../components";
import { Blog, Footer, Contact } from "../containers";

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Blog />
      </main>
      <Contact />
      <Footer />
    </>
  );
};

export default BlogPage;
