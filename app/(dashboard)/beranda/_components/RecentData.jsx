import React from "react";
import { IoNewspaperSharp } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

const RecentData = () => {
  return (
    <div className="bg-white md:flex-row flex-col sm:ml-11 ml-4 sm:mt-10 mt-4 rounded-2xl sm:h-[290px] h-[200px] sm:w-[650px] w-full">
    <div className="flex sm:mx-9 mx-5 pt-4 justify-between">
      <div className="flex gap-2">
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
    <hr className="border-t border-black my-3 mx-6" />
    <table className="table-auto border-collapse w-full text-center">
      <thead>
        <tr>
          <th className="px-8 py-4">User</th>
          <th className="px-8 py-4">Date</th>
          <th className="px-8 py-4">Nasabah</th>
          <th className="px-8 py-4">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="flex items-center py-2 px-4">
            <img
              src="/img/profil-header.png"
              alt="Foto Data 1"
              className="w-8 h-8 mr-4"
            />
            Data 1
          </td>
          <td>Date Data 1</td>
          <td>Nasabah Data 1</td>
          <td>Status Data 1</td>
        </tr>
        <tr>
          <td className="flex items-center py-2 px-4">
            <img
              src="/img/profil-header.png"
              alt="Foto Data 1"
              className="w-8 h-8 mr-4"
            />
            Data 1
          </td>
          <td>Date Data 1</td>
          <td>Nasabah Data 1</td>
          <td>Status Data 1</td>
        </tr>
        <tr>
          <td className="flex items-center py-2 px-4">
            <img
              src="/img/profil-header.png"
              alt="Foto Data 1"
              className="w-8 h-8 mr-4"
            />
            Data 1
          </td>
          <td>Date Data 1</td>
          <td>Nasabah Data 1</td>
          <td>Status Data 1</td>
        </tr>
      </tbody>
    </table>
    </div>
  );
};

export default RecentData;
