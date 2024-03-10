"use client"
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoTimeSharp } from "react-icons/io5";
import Box from "./_components/Box";
import RecentData from "./_components/RecentData";
import TodoList from "./_components/ToDoList";
import Calendar from "./_components/Calendar";

const page = () => {

  const handleSelesaiClick = () => {
    window.location.href = '/aktivitas-selesai';
  };

  const handleDitundaClick = () => {
    window.location.href = '/aktivitas-ditunda';
  };

  return (
    <div className={`bg-[#EAEAEA] h-full transition-all sm:pl-11 pl-5 `}>
      <h2 className="sm:text-[40px] text-[24px] sm:pt-[79px] pt-[75px] py-2 sm:ml-16 ml-8 font-semibold">
        Dashboard
      </h2>
      <div className="flex md:flex-row flex-col md:justify-evenly justify-start lg:gap-0 gap-5 lg:items-start items-center px-8">
        <button onClick={handleSelesaiClick}>
          <Box
            bgColor={"bg-[#6EE014]"}
            icon={
              <IoCheckmarkDoneCircleOutline className="text-white ml-9 mt-7" />
            }
            text={"Selesai"}
            number={25}
            hoverColor={"bg-blue-600"}
          />
        </button>
        <button onClick={handleDitundaClick}>
          <Box
            bgColor={"bg-[#F76B03]"}
            icon={<IoTimeSharp className="text-white ml-9 mt-7" />}
            text={"Ditunda"}
            number={25}
            hoverColor={"bg-blue-600"}
          />
        </button>
      </div>
      <div className="flex  flex-col lg:flex-row ml-5 justfiy-center items-center">
        <div className="sm:w-1/2">
          <RecentData />
          <TodoList />
        </div>
        <div className="sm:w-1/2">
          <Calendar />
        </div>
      </div>
    </div>
  );
};
export default page;