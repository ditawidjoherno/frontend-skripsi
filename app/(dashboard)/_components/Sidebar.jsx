"use client"

import { IoCreate, IoDesktop, IoDocument, IoHome } from "react-icons/io5"
import { IoIosPeople } from "react-icons/io";
import { BiBullseye } from "react-icons/bi"
import Header from "./Header"
import { useState, useEffect } from "react"
import Content from "./Content"
import { IoIosArrowDropleftCircle } from "react-icons/io"
import Link from 'next/link';
import useUser from "@/hooks/use-user";

const Sidebar = ({ isCollapse, setIsCollapse }) => {
    const [activePage, setActivePage] = useState("Beranda");

    const { loading, error, data: userData, getUserData } = useUser();

    useEffect(() => {
        getUserData();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!userData) {
        return <div>No user data available</div>;
    }

    const { jabatan } = userData;



    const sidebarItems = [
        {
            icon: <IoHome />,
            text: "Beranda",
            route: "/beranda"
        },
        {
            icon: <IoDesktop />,
            text: "Monitoring",
            route: "/monitoring",
            visible: jabatan !== 'staff' && jabatan !== 'unit head'
        },
        {
            icon: <IoCreate />,
            text: "Input Data",
            route: "/data-aktivitas",
            visible: jabatan !== 'manager'
        },
        {
            icon: <IoIosPeople />,
            text: "Data Nasabah",
            route: "/data-nasabah/5"
        },
        {
            icon: <BiBullseye />,
            text: "Target Tahunan",
            route: "/target-tahunan"
        },
        {
            icon: <IoDocument />,
            text: "Informasi Menu",
            route: "/informasi-menu"
        },
    ];

    const handleItemClick = (text) => {
        setActivePage(text);
    };

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
                        (item.visible === undefined || item.visible) && (
                            <Link href={item.route} key={index}>
                                <button
                                    className={`bg-[#00000] flex ${isCollapse ? "md:justify-center justify-start" : "md:justify-start justify-center"} items-center sidebar-transition hover:bg-[#FFE500]  w-full h-[35px] rounded-xl px-5 ${activePage === item.text ? "bg-[#FFE500]" : ""}`}
                                    onClick={() => handleItemClick(item.text)}
                                >
                                    <div className="flex h-full gap-4 sidebar-transition items-center">
                                        {item.icon}
                                        <p className={`${isCollapse ? "md:hidden block" : "hidden md:block"} md:text-base text-xs sidebar-transition `}>{item.text}</p>
                                    </div>
                                </button>
                            </Link>
                        )
                    ))}

                </div>
            </div>
        </>
    );
};

export default Sidebar