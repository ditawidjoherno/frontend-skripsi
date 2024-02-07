import React from "react";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

const RecentData = () => {
  return (
    <div className="bg-white md:flex-row flex-col sm:ml-11 sm:mt-10 mt-4 rounded-2xl sm:h-[320px] h-[220px] sm:w-[650px] w-[300px] overflow-x-scroll">
      <div className="flex sm:mx-9 mx-5 pt-4 justify-between ">
        <div className="flex gap-2 ">
          <IoNewspaperSharp className="sm:text-4xl text-2xl" />
          <p className="sm:text-[26px] text-[16px] font-semibold">
            Recent Data
          </p>
        </div>
        <div className="sm:mt-2 flex gap-4">
          <button>
            <IoFilterSharp className="sm:text-4xl text-2xl" />
          </button>
          <button>
            <IoSearchOutline className="sm:text-4xl text-2xl" />
          </button>
        </div>
      </div>
      <hr className="border-t border-black my-3 mx-6 " />
      <table className="table-auto border-collapse w-full text-center overflow-x-auto">
        <thead>
          <tr>
            <th className="px-8 sm:py-4 py-2">User</th>
            <th className="px-8 sm:py-4 py-2">Date</th>
            <th className="px-8 sm:py-4 py-2">Nasabah</th>
            <th className="px-8 sm:py-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex items-center sm:py-2 py-1 sm:px-4 px-1 ml-2">
              <img
                src="/img/profil-header.png"
                alt="Foto Data 1"
                className="sm:w-8 w-6 sm:h-8 h-6 sm:mr-4 mr-2"
              />
              Data 1
            </td>
            <td>Date Data 1</td>
            <td>Nasabah Data 1</td>
            <td className="px-4">
              <div className="bg-[#6EE014] sm:py-2 py-1 rounded-3xl text-white text-xs">
                Selesai
              </div>
            </td>
          </tr>
          <tr>
          <td className="flex items-center sm:py-2 py-1 sm:px-4 px-1 ml-2">
              <img
                src="/img/profil-header.png"
                alt="Foto Data 1"
                className="sm:w-8 w-6 sm:h-8 h-6 sm:mr-4 mr-2"
              />
              Data 1
            </td>
            <td>Date Data 1</td>
            <td>Nasabah Data 1</td>
            <td className="px-4">
              <div className="bg-[#6EE014] sm:py-2 py-1 rounded-3xl text-white text-xs">
                Selesai
              </div>
            </td>
          </tr>
          <tr>
          <td className="flex items-center sm:py-2 py-1 sm:px-4 px-1 ml-2">
              <img
                src="/img/profil-header.png"
                alt="Foto Data 1"
                className="sm:w-8 w-6 sm:h-8 h-6 sm:mr-4 mr-2"
              />
              Data 1
            </td>
            <td>Date Data 1</td>
            <td>Nasabah Data 1</td>
            <td className="px-4">
              <div className="bg-[#F76B03] sm:py-2 py-1 rounded-3xl text-white text-xs">
                Ditunda
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecentData;