import React from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoTimeSharp } from "react-icons/io5";
import Box from "./_components/Box";
import RecentData from "./_components/RecentData";
import Calendar from "./_components/Calendar";

const Home = () => {
  return (
    <div className="bg-[#EAEAEA] h-screen ">
      <div>
        <div className="">
          <h2 className="sm:text-[40px] text-[24px] sm:py-6 py-2 sm:ml-16 ml-4 font-semibold">
            Dashboard
          </h2>
          <div className="flex md:flex-row flex-col md:justify-evenly justify-start lg:gap-0 gap-5 lg:items-start items-center px-8">
            <Box
              bgColor={"bg-[#6EE014]"}
              icon={
                <IoCheckmarkDoneCircleOutline className="text-white ml-9 mt-7" />
              }
              text={"Selesai"}
              number={25}
            />
            <Box
              bgColor={"bg-[#F76B03]"}
              icon={<IoTimeSharp className="text-white ml-9 mt-7" />}
              text={"Ditunda"}
              number={25}
            />
          </div>
          <div className="flex justify-between">
            <RecentData />
            <Calendar />
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Home;
