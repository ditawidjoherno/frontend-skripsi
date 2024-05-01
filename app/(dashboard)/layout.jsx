"use client"
import React, { useState } from "react";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import useSidebarCollapse from "@/hooks/useSidebarCollapse";
import withAuth from "@/hoc/auth";
import { FaSpinner } from "react-icons/fa";

const Home = ({ children }) => {

  // const { isCollapse, setIsCollapse } = useState(false)
  const { isCollapse, setIsCollapse } = useSidebarCollapse()

  return (
    <div>
      <Sidebar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      <div className={`${isCollapse ? "pl-0" : "sm:pl-44"} transition-all duration-00`}>
        {children}
      </div>
    </div>
  );
};

const loadingPage = () => {
  <div className="w-screen h-screen flex justify-center items-center">
    <FaSpinner size={32} className="animate-spin" />
  </div>
}

export default withAuth(Home, loadingPage);
