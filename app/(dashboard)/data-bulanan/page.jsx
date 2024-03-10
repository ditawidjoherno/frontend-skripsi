"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Button from "./_components/button";
import React, { useState } from 'react';
import Search from "./_components/search";

const page = () => {

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    // Lakukan pencarian dengan query dan atur hasil pencarian ke state searchResults
    console.log('Searching for:', query);
  };

  return (
    <div className={`bg-[#EAEAEA] h-full pb-4 flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-5 pr-3 sm:ml-20 ml-10`}>
      <div className="sm:flex items-center w-full sm:justify-between">
        <div className="sm:ml-5 ml-3 flex items-center gap-3 ">
          <h2 className="sm:text-4xl text-[24px] sm:pt-2 pt-7 font-bold sm:mt-0 -mt-9 ">
            Monitoring Bulanan
          </h2>
          <IoIosArrowDropleftCircle className="sm:mt-0 -mt-7 sm:h-9 h-6 sm:w-12 w-9 sm:ml-0 -ml-3 sm:mb-0 -mb-4" />
        </div>
        <div>
          <Search onSearch={handleSearch} />
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sm:ml-5 ml-3 w-full gap-9 mt-5 ">
        <div className="bg-[#1D2B53] rounded-t-2xl h-[65px] flex">
        <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-3">Februari 2024</h1>
        <h1 className="font-bold text-white sm:text-3xl text-[25px] pl-5 pt-3">(1.200)</h1>
        </div>
        <div className="bg-white rounded-b-2xl h-[500px] overflow-x-scroll">
          <table className="table-auto border-collapse w-full text-center overflow-x-acroll">
            <thead>
              <tr>
                <th className="px-5 sm:py-4 py-2">No</th>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>tes</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
              <tr>
                <td>1</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td className="text-[#4530ff]">Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
                <td>Lorem Ipsum</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
};

export default page;