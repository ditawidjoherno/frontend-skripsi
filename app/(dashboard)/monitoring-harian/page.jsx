"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import Search from "./_components/search";
import Button from "./_components/button";

const page = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const DataNasabah = [
    {
      nomor: "1",
      TanggalProspek: "Lorem Ipsum",
      nama: "Data 1",
      aktivitas: "Lorem Ipsum",
      namaNasabah: "tes",
      NoHP: "Lorem Ipsum",
      alamat: "Lorem Ipsum",
      TipeNasabah: "Lorem Ipsum",
      Prospek: "Lorem Ipsum",
      NominalProspek: "Lorem Ipsum",
      aktivitasSales: "Lorem Ipsum",
      closing: "Lorem Ipsum",
      KeyPerson: "Lorem Ipsum"
    },
    {
      nomor: "1",
      TanggalProspek: "Lorem Ipsum",
      nama: "Data 2",
      aktivitas: "Lorem Ipsum",
      namaNasabah: "tes",
      NoHP: "Lorem Ipsum",
      alamat: "Lorem Ipsum",
      TipeNasabah: "Lorem Ipsum",
      Prospek: "Lorem Ipsum",
      NominalProspek: "Lorem Ipsum",
      aktivitasSales: "Lorem Ipsum",
      closing: "Lorem Ipsum",
      KeyPerson: "Lorem Ipsum"
    },
    {
      nomor: "1",
      TanggalProspek: "Lorem Ipsum",
      nama: "Data 1",
      aktivitas: "Lorem Ipsum",
      namaNasabah: "tes",
      NoHP: "Lorem Ipsum",
      alamat: "Lorem Ipsum",
      TipeNasabah: "Lorem Ipsum",
      Prospek: "Lorem Ipsum",
      NominalProspek: "Lorem Ipsum",
      aktivitasSales: "Lorem Ipsum",
      closing: "Lorem Ipsum",
      KeyPerson: "Lorem Ipsum"
    },

  ];

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    setIsSearchActive(true);
  };


  const filteredData = DataNasabah.filter(data =>
    data.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.TanggalProspek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.aktivitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.namaNasabah.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.NoHP.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.TipeNasabah.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.Prospek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.NominalProspek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.aktivitasSales.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.closing.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.KeyPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-4 flex items-center gap-3">
          <h2 className="sm:text-[40px] text-[24px]  font-semibold">
            Monitoring Harian
          </h2>
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5  " />
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
          {/* <IoFilterSharp className="sm:text-4xl text-2xl" /> */}
        </div>
      </div>
      <div className="sm:ml-5 ml-3 w-full ">
        <div className="bg-[#059BC7] rounded-t-2xl h-[65px] flex">
          <h1 className="font-bold text-white text-4xl pl-11 pt-3">Harian:</h1>
          <h1 className="font-bold text-black text-4xl pl-5 pt-3">50</h1>
        </div>
        <div className="bg-white rounded-b-2xl h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-acroll">
            <thead>
              <tr>
                <th className="px-5 sm:py-4 py-2">No</th>
                <th className="px-14 sm:py-4 py-2">Nama</th>
                <th className="px-14 sm:py-4 py-2">Tanggal Prospek</th>
                <th className="px-14 sm:py-4 py-2">Aktivitas</th>
                <th className="px-14 sm:py-4 py-2 ">Nama Nasabah</th>
                <th className="px-14 sm:py-4 py-2">No HP</th>
                <th className="px-14 sm:py-4 py-2">Alamat</th>
                <th className="px-14 sm:py-4 py-2">Tipe Nasabah</th>
                <th className="px-14 sm:py-4 py-2">prospek</th>
                <th className="px-14 sm:py-4 py-2">Nominal Prospek</th>
                <th className="px-14 sm:py-4 py-2">Aktivitas Sales</th>
                <th className="px-14 sm:py-4 py-2">Closing</th>
                <th className="px-14 sm:py-4 py-2">Key Person</th>
                <th className="px-14 sm:py-4 py-2">Dokumentasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Nomor otomatis */}
                  {/* <td className="flex items-center sm:py-2 py-1 sm:px-4 px-1 ml-2">
                    <img src={data.image} alt={data.nama} className="sm:w-8 w-6 sm:h-8 h-6 sm:mr-4 mr-2" />
                    <span>{data.nama}</span>
                  </td> */}
                  <td>{data.nama}</td>
                  <td>{data.TanggalProspek}</td>
                  <td>{data.aktivitas}</td>
                  <td><Link href={`/profil_nasabah`}>
                    <div className="text-black hover:text-blue-700 cursor-pointer">{data.namaNasabah}</div>
                  </Link>
                  </td>
                  <td>{data.NoHP}</td>
                  <td>{data.alamat}</td>
                  <td>{data.TipeNasabah}</td>
                  <td>{data.Prospek}</td>
                  <td>{data.NominalProspek}</td>
                  <td>{data.aktivitasSales}</td>
                  <td>{data.closing}</td>
                  <td>{data.KeyPerson}</td>
                  <td>
                  <div className="w-full justify-center flex flex-col items-center">
                    <Button
                      text={"Lihat Dokumentasi"}
                    />
                    <Button
                      text={"Lihat Detail"}
                    />
                  </div>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default page;