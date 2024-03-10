"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from "./_components/TeksProfil";

const page = () => {

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-3xl text-[24px] font-bold sm:mt-[12px] sm:mb-3 mb-1 sm:ml-5 ml-2 ">
          Monitoring Sales
        </h2>
        <IoIosArrowDropleftCircle className="sm:h-10 h-6 sm:w-20 w-10 sm:mt-[0px] mt-[2px]"/>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4 sm:pr-0 pr-19">
          <div className='sm:flex sm:ml-0 ml-1'>
          <div className="w-1/2 sm:flex sm:items-center sm:mt-[-10px] mt-[15px]">
            <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[220px] w-[190px] sm:h-[220px] h-[190px] sm:ml-10 ml-20 sm:mt-[-20px] mt-[-10px] " />
            <div className="w-full sm:mt-[-40px] mt-[20px] sm:text-left text-center sm:ml-0 ml-[80px]">
              <TeksProfil label="Nama Staff" value="Lorem ipsum" />
              <TeksProfil label="Nip" value="123456" />
              <TeksProfil label="Jabatan" value="lorem ipsum"/>
            </div>
          </div>
          <div className="sm:w-1/2 w-full h-auto sm:ml-10 ml-left sm:mb-1 mb-219 sm:mt-[-2px] mt-6">
            <TeksProfil label="Sales Productivity" />
            <div className="w-full bg-red-600b">
              <button className="bg-[#6EE014] transition-all transform hover:bg-[#FFE500] sm:w-[375px] w-[250px] h-[35px] pt-30 mt-[px] ml-8 font-semibold">
              </button>
              <span className="top-[0%] text-sm transform translate-y(-100%) font-semibold">130%</span>
              <TeksProfil value="Ket:" />
              <TeksProfil value="Istimewa 110%-130%" />
              <TeksProfil value="Sangat Baik 100%-109%" />
              <TeksProfil value="Baik 95%-99%" />
              <TeksProfil value="Cukup 85%-94%" />
            </div >
          </div>
        </div>
        <div className="flex flex-col mt-[15px] sm:mr-[85px] mr-[70px]">
          <button className="bg-[#d9d9d9] transition-all transform hover:bg-[#a9a7a7] sm:w-[220px] w-[200px] h-[35px] ml-auto px-10 pt-30 mt-[25px] font-medium sm:mr-20 mr-middle shadow-md">
            Lihat Target
          </button>
          <button className="bg-[#d9d9d9] transition-all transform hover:bg-[#a9a7a7] sm:w-[220px] w-[200px] h-[35px] ml-auto px-10 pt-30 mt-[25px] font-medium sm:mr-20 mr-middle shadow-md">
            Aktivitas Sales
          </button>
        </div>
        <div className="w-full sm:pl-10 pl-[20px] flex justify-between px-9">
          <div className="flex flex-col gap-1 relative border border-gray-500 border-solid sm:border-3 border-10 sm:pr-0 pr-23 pt-[5px] sm:-mt-[90px] mt-[30px] sm:ml-0 -ml-[10px]">
            <div className="relative pr-50">
              <button className="bg-[#F8DE22] text-black text-left transition-all transform hover:bg-[#9ebfea] sm:w-[400px] w-[260px] h-[35px] px-2 pt-30 mt-[25px] mr-[60px] rounded-r-xl font-semibold ">
                JAN
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#f8c322] text-black text-left transition-all transform hover:bg-[#9ebfea] sm:w-[300px] w-[220px] h-[35px] px-2 pt-30  rounded-r-xl font-semibold">
                FEB
                <tex className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</tex>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#FD8D14] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[187px] h-[35px] px-2 pt-30  rounded-r-xl font-semibold">
                MAR
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#E3651D] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[93px] h-[35px] px-2 pt-30  rounded-r-xl font-semibold">
                APR
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#BE3144] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[168px] h-[35px] px-2 pt-30  rounded-r-xl font-semibold">
                MEI
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#872341] text-black text-left transition-all transform hover:bg-[#9ebfea] sm:w-[330px] w-[50px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold">
                JUN
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#631c7f] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[70px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold">
                JUL
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#24366d] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[155px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold">
                AGS
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#315888] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[270px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold">
                SEP
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#4b6bd6] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[155px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold">
                OKT
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#488a48] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[70px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold">
                NOV
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#62c162] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[210px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold">
                DES
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">0%</text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;