import React from "react";
import { IoMenu } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white py-2 shadow">
      <div className="flex items-center justify-between px-5">
        <button>
        <IoMenu size={37} className="sm:ml-7" />
        </button>
        <div className="flex">
          <button>
            <div className="flex">
              <div className="sm:bg-[#EAEAEA] bg-transparent w-auto h-auto sm:py-1 py-[2px] mt-[2px] flex rounded-lg">
                <div className="mx-2 flex gap-[5px] ">
                  <img
                    src={"/img/profil-header.png"}
                    alt="Profil staff"
                    className="w-[35px] h-[35px]"
                  />
                  <div className="sm:block hidden">
                    <p className="font-medium text-[13px]">Nama: Lorem Ipsum</p>
                    <p className="font-medium text-[13px]">NIP: 32837132</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
          <button>
            <IoExitOutline size={32} className="sm:ml-6 ml-4 my-2" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
