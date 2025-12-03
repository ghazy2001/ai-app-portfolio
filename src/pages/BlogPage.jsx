import React from "react";
import { Navbar } from "../components";
import { Blog, Footer } from "../containers";

const BlogPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <Blog />
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
