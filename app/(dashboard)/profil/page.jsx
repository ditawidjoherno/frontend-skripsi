import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from "./_components/TeksProfil";
import PopUpBox from "./_components/PopUpBox";

const page = () => {

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Profil
        </h2>
        <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
      </div>
      <div className="bg-white rounded-2xl h-[500px] sm:ml-5 ml-3 w-full sm:pt-10 pt-6 ">
        <div className="sm:flex sm:px-0 px-10">
          <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] ml-5" />
          <div className="sm:mr-6 sm:flex">
            <div>
              <TeksProfil label="NIP:" value="123345" />
              <TeksProfil label="Nama:" value="lorem ipsum" />
              <TeksProfil label="Tempat Lahir:" value="lorem ipsum" />
              <TeksProfil label="Tanggal Lahir:" value="lorem ipsum" />
              <TeksProfil label="Jenis Kelamin:" value="lorem ipsum" />
            </div>
            <div className="sm:ml-[120px]">
              <TeksProfil label="Alamat:" value="lorem ipsum" />
              <TeksProfil label="Jabatan:" value="lorem ipsum" />
              <TeksProfil label="Email:" value="lorem ipsum" />
              <TeksProfil label="Nomor Telepon:" value="lorem ipsum" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end sm:mr-5 mr-20">
          <PopUpBox />
        </div>
      </div>
    </div>

  );
};

export default page;