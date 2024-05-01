"use client"
import React, { useState, useEffect } from "react";
import { IoNewspaperSharp } from "react-icons/io5";
import Link from "next/link";
import useRecentData from "@/hooks/use-recent-data";

const RecentData = () => {
  const { data, getUserData } = useRecentData();

  const handleGetDataUser = async () => {
    await getUserData();
  }

  useEffect(() => {
    handleGetDataUser();
  }, [])

  useEffect(() => {
    const reloadPage = () => {
      window.location.reload();
    };

    getUserData();

    const dataChangeEventListener = () => {
      window.addEventListener('dataChange', reloadPage);
    };

    dataChangeEventListener();

    return () => {
      window.removeEventListener('dataChange', reloadPage);
    };
  }, []);

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    console.log("Data telah dihapus. Memancarkan event dataChange...");
    window.dispatchEvent(new Event('dataChange'));
    console.log("Event dataChange telah dipancarkan.");
  }

  return (
    <div className="bg-white md:flex-row flex-col sm:ml-11 sm:mx-0 mx-5 sm:mt-10 mt-4 rounded-2xl sm:h-[350px] h-[220px] sm:w-auto w-auto ">
      <div className="flex sm:mx-9 items-center mx-5 pt-4 justify-between ">
        <Link href="/recentdata">
          <div className="flex gap-2 items-center">
            <IoNewspaperSharp className="sm:text-3xl text-2xl" />
            <p className="sm:text-[22px] text-[16px] font-semibold">
              Recent Data
            </p>
          </div>
        </Link>
      </div>
      <hr className="border-t border-black my-3 mx-6 " />
      <div className="bg-white rounded-b-2xl sm:h-[250px] h-[150px] overflow-x-scroll">
        <table className="table-auto border-collapse w-full text-center" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <thead>
            <tr>
              <th className="px-5">No</th>
              <th className="sm:px-6 px-7 sm:py-1 py-0">Nama Staff</th>
              <th className="sm:px-6 px-7 sm:py-1 py-0">Tanggal Prospek</th>
              <th className="sm:px-6 px-7 sm:py-1 py-0">Nama Nasabah</th>
              <th className="sm:px-6 px-7 sm:py-1 py-0">Aktivitas</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="px-5 text-center">{index + 1}</td>
                  <td style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {item.nama_user}
                  </td>
                  <td>{item.tanggal_aktivitas}</td>
                  <td>
                    <Link href={`/profil_nasabah`}>
                      <div className="text-black hover:text-blue-700 cursor-pointer">{item.nama_nasabah}</div>
                    </Link>
                  </td>
                  <td>{item.nama_aktivitas}</td>
                  <td>
                    <button onClick={() => handleDeleteTask(item.id)}>Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">Belum ada data yang ditambahkan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentData;
