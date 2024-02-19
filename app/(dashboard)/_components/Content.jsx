"use client"
import { IoCheckmarkDoneCircleOutline, IoTimeSharp } from "react-icons/io5"
import Box from "../beranda/_components/Box"
import Calendar from "../beranda/_components/Calendar"
import RecentData from "../beranda/_components/RecentData"
import TodoList from "../beranda/_components/ToDoList"

const Content = () => {

    const { isCollapse, setIsCollapse } = useSidebarCollapse()

    return (
        <>
            <h2 className={`sm:text-[40px] text-[24px] sm:pt-[79px] pt-[75px] py-2 sm:ml-16 ml-4 font-semibold ${isCollapse ? "pl-0" : "pl-64"}`}>
                Dashboard
            </h2>
            <div className={`flex md:flex-row flex-col md:justify-evenly justify-start lg:gap-0 gap-5 lg:items-start items-center px-8 ${isCollapse ? "pl-0" : "pl-64"}`}>
                <button>
                    <Box
                        bgColor={"bg-[#6EE014]"}
                        icon={
                            <IoCheckmarkDoneCircleOutline className="text-white ml-9 mt-7" />
                        }
                        text={"Selesai"}
                        number={25}
                    />
                </button>
                <button>
                    <Box
                        bgColor={"bg-[#F76B03]"}
                        icon={<IoTimeSharp className="text-white ml-9 mt-7" />}
                        text={"Ditunda"}
                        number={25}
                    />
                </button>
            </div>
            <div className={`flex flex-col lg:flex-row justfiy-center items-center ${isCollapse ? "pl-0" : "pl-64"}`}>
                <div>
                    <RecentData />
                    <TodoList />
                </div>
                <Calendar />
            </div>
        </>
    )
}

export default Content
