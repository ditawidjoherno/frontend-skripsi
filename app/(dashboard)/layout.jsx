"use client"
import React, { useState } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import useSidebarCollapse from "@/hooks/useSidebarCollapse";

const Home = ({ children }) => {

  // const { isCollapse, setIsCollapse } = useState(false)
  const { isCollapse, setIsCollapse } = useSidebarCollapse()

  return (
    <div>
      <Sidebar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      <div className={`${isCollapse ? "pl-5" : "pl-48"} transition-all duration-700`}>
        {children}
      </div>
    </div>
  );
};

export default Home;
