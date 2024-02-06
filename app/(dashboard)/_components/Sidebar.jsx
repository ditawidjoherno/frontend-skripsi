"use client"
import { IoCreate, IoDesktop, IoDocument, IoHome } from "react-icons/io5"
import { BiBullseye } from "react-icons/bi"
import Header from "./Header"
import { useState } from "react"

const Sidebar = () => {

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

    const [isCollapse, setIsCollapse] = useState(false)

    return (
        <>
            <div className={`h-screen transition-all duration-500 fixed bg-white shadow-2xl ${isCollapse ? "w-20" : "w-64"} py-1 flex flex-col gap-8`}>
                <div className={`w-full flex justify-center ${isCollapse ? "px-1" : "px-8"} `}>
                    <img src="/img/btnlogoside.png" className={`${isCollapse ? "block" : "hidden"}`} />
                    <img src="/img/btnsp.png" className={`${isCollapse ? "hidden" : ""}`} />
                </div>
                <div className="w-full flex flex-col px-4 sidebar-transition">
                    {sidebarItems.map((item, index) => (
                        <button  key={index} className={`bg-[#00000] flex ${isCollapse ? "justify-center" : ""} items-center sidebar-transition hover:bg-[#FFE500]  w-full h-[35px] rounded-xl px-5`}>
                            <div className="flex gap-4 sidebar-transition">
                                <div className="mt-[2px]">
                                    {item.icon}
                                </div>
                                <p className={`${isCollapse ? "hidden" : ""} sidebar-transition `}>{item.text}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <Header setIsCollapse={setIsCollapse} isCollapse={isCollapse} />
        </>
    )
}

export default Sidebar