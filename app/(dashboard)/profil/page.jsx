import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from "./_components/TeksProfil";
import PopUpBox from "./_components/PopUpBox";
import Link from "next/link";
import UserData from "./_components/UserData";

const page = () => {

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Profil
        </h2>
        <Link href="/beranda">
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-5 sm:ml-5 ml-3 w-full sm:pt-10 pt-6 ">
        <div className="sm:flex  sm:text-start text-center">
          
          <UserData />
        </div>
        <div className="flex gap-3 justify-end mb-5 sm:mr-5 mr-3">
          <PopUpBox />
        </div>
      </div>
    </div>

  );
};

export default page;