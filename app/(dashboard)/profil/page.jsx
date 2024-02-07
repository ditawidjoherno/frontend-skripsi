"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from "./_components/TeksProfil";


const page = () => {

  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center pt-[75px] pr-4 sm:ml-20`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-2 ml-4 font-semibold">
          Profil
        </h2>
        <IoIosArrowDropleftCircle className="h-10 w-20" />
      </div>
      <div className="bg-white rounded-2xl h-[842px] ml-5` mx- w-full flex pt-10">
        <img src={"/img/profil.png"} alt="Foto Profil" className="w-[250px] h-[250px] ml-5" />
        <div className="mr-6 flex">
          <div>
            <TeksProfil label="NIP:" value="123345" />
            <TeksProfil label="Nama:" value="lorem ipsum" />
            <TeksProfil label="Tempat Lahir:" value="lorem ipsum" />
            <TeksProfil label="Tanggal Lahir:" value="lorem ipsum" />
            <TeksProfil label="Jenis Kelamin:" value="lorem ipsum" />
          </div>
          <div className="ml-[120px]">
            <TeksProfil label="Alamat:" value="lorem ipsum" />
            <TeksProfil label="Jabatan:" value="lorem ipsum" />
            <TeksProfil label="Email:" value="lorem ipsum" />
            <TeksProfil label="Nomor Telepon:" value="lorem ipsum" />
          </div>
        </div>

      </div>
    </div>

  );
};

export default page;