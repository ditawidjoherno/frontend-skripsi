"use client"
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoNewspaper } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useState, useEffect } from 'react';
import useRecentData from "@/hooks/use-recent-data";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const { loading, error, data, getUserData } = useRecentData();

  const handleGetDataUser = async () => {
    await getUserData();
  }

  useEffect(() => {
    handleGetDataUser();
  }, [])

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setIsSearchActive(true);
  };

  useEffect(() => {
    getUserData();
  }, []);



  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Aktivitas Sales
        </h2>
        <Link href="/beranda">
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link>
      </div>
      <div className='sm:ml-5 ml-3 w-full '>
        <div className="bg-white rounded-t-2xl h-[80px] pt-3">
          <div className='flex justify-between'>
            <div className='flex items-center gap-2 ml-5'>
              <IoNewspaper className="sm:w-10 w-7 sm:h-10 h-7" />
              <h2 className='font-semibold sm:text-[28px] text-[20px]'>Recent Data</h2>
            </div>
            <div className='flex gap-1 sm:mr-5'>
              <div className="flex sm:mr-5 mr-3">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border-2 border-gray-300 px-4 py-2 sm:rounded-l-2xl rounded-l-lg focus:outline-none focus:border-blue-500 sm:w-[270px] w-[100px] sm:h-[40px] h-[30px]"
                />
                <button type="submit" className="bg-[#FFE500] text-black border-black px-1 py-1 sm:rounded-r-2xl rounded-r-lg hover:bg-[#f6f0ba] sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] focus:outline-none">
                  <IoSearchOutline className="sm:w-6 w-4 sm:h-6 h-4" />
                </button>
              </div>
            </div>
          </div>
          <hr className="border-t-2 border-black my-3 mx-6 " />
        </div>
        <div className="bg-white rounded-b-2xl h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-auto">
            <thead>
              <tr>
                <th className="sm:px-14 px-7 sm:py-4 py-0">Nama</th>
                <th className="sm:px-14 px-7 sm:py-4 py-0">Tanggal Prospek</th>
                <th className="sm:px-14 px-7 sm:py-4 py-0">Aktivitas</th>
                <th className="sm:px-14 px-7 sm:py-4 py-0">Nama Nasabah</th>
                <th className="sm:px-14 px-7 sm:py-4 py-0">Aktivitas Sales</th>
                <th className="sm:px-14 px-7 sm:py-4 py-0">Prospek</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="flex items-center sm:py-2 py-1 sm:px-4 px-1 ml-2">
                      {/* <img src={item?.image} alt={item?.nama} className="sm:w-8 w-6 sm:h-8 h-6 sm:mr-4 mr-2" /> */}
                      <span>{item.nama} </span>
                    </td>
                    <td>{item.tanggal}</td>
                    <td>{item.aktivitas}</td>
                    <td><Link href={`/profil_nasabah`}>
                      <div className="text-black hover:text-blue-700 cursor-pointer">{item.nama_nasabah}</div>
                    </Link>
                    </td>
                    <td>{item.aktivitas_sales}</td>
                    <td>{item.prospek}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Belum ada data yang ditambahkan</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
};

export default Page;
