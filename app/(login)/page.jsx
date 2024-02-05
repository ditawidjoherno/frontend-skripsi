import React from "react";
import Input from "./_components/Input";
import { VscAccount } from "react-icons/vsc";
import { LuKeyRound } from "react-icons/lu";


const login = () => {
  return (
    <div className="bg-[#030637] h-screen w-screen pt-10">
      <img
        src={"/img/logobgbtn.png"}
        alt="logo2"
        className="w-[150px] rounded-[0px] mr-2 absolute top-0 right-0 mt-3 "
      />
      <img
        src={"/img/Logo_BUMN_Untuk_Indonesia_2020.svg-removebg-preview.png"}
        alt="logo3"
        className="w-[150px] rounded-[0px] mr-2 absolute top-0 left-2 mt-5 "
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="bg-white xl:w-[300px] xl:h-[350px] w-[300px] h-[350px] md:w-[500px] md:h-[550px] rounded-2xl px-4 pt-10 flex flex-col">
          <img
            src={"/img/btn_logoopening.png"}
            alt="logo1"
            className="w-full px-[25px] mr-1 pt-1 "
          />
          <div>
            <Input Icon={<VscAccount size={25} />} placeholder={"NIP"} />
            <Input Icon={<LuKeyRound size={25} />} placeholder={"Password"} />
          </div>
          <button className="bg-[#3468C0] transition-all transform hover:bg-[#FFE500]  w-full h-[35px] rounded-2xl px-10 pt-30 mt-[25px] font-semibold">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default login;