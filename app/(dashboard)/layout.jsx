// pages/index.js
import React from "react";
import Header from "./_components/Header";

const Home = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Home;
