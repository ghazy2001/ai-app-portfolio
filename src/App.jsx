import { Article, Brand, CTA, Feature, Navbar } from "./components";
import {
  Footer,
  Header,
  Possibility,
  Features,
  WhatGPT3,
  Blog,
} from "./containers";

import "./app.css";

const App = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
};

export default App;
