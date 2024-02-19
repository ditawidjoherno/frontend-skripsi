"use client"
import { IoCreate, IoDesktop, IoDocument, IoHome } from "react-icons/io5"
import { BiBullseye } from "react-icons/bi"
import Header from "./Header"
import { useState } from "react"
import Content from "./Content"
import { IoIosArrowDropleftCircle } from "react-icons/io"

const Sidebar = ({ isCollapse, setIsCollapse }) => {

    const sidebarItems = [
        {
            icon: <IoHome />,
            text: "Beranda"
        },
        {
            icon: <IoDesktop />,
            text: "Monitoring"
        },
        {
            icon: <IoCreate />,
            text: "Input Data"
        },
        {
            icon: <BiBullseye />,
            text: "Target Tahunan"
        },
        {
            icon: <IoDocument />,
            text: "Informasi Menu"
        },
    ]

    return (
        <>
            <Header setIsCollapse={setIsCollapse} isCollapse={isCollapse} />
            <div className={`h-screen transition-all duration-500 fixed bg-white shadow-2xl ${isCollapse ? "md:w-20 w-48" : "md:w-64 w-10"} py-1 flex flex-col gap-8 z-[999]`}>
                <div className={`w-full flex justify-center ${isCollapse ? "md:px-1" : "md:px-8"} `}>
                    <img src="/img/btnlogoside.png" className={`${isCollapse ? "md:block hidden" : "md:hidden block"}`} />
                    <img src="/img/btnsp.png" className={`${isCollapse ? "md:hidden block" : "md:block hidden"}`} />
                </div>
                <div className="w-full flex flex-col md:px-4 sidebar-transition">
                    {sidebarItems.map((item, index) => (
                        <button key={index} className={`bg-[#00000] flex ${isCollapse ? "md:justify-center justify-start" : "md:justify-start justify-center"} items-center sidebar-transition hover:bg-[#FFE500]  w-full h-[35px] rounded-xl px-5`}>
                            <div className="flex h-full gap-4 sidebar-transition items-center">
                                {item.icon}
                                <p className={`${isCollapse ? "md:hidden block" : "hidden md:block"} md:text-base text-xs sidebar-transition `}>{item.text}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Sidebar