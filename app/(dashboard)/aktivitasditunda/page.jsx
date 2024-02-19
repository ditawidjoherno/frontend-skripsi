import React from 'react'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoFilterSharp } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

const page = () => {
    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[20px] sm:ml-5 ml-4 font-semibold">
                    Aktivas Sales
                </h2>
                <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
            </div>
            <div className='sm:ml-5 ml-3 w-full '>
                <div className="bg-white rounded-t-2xl h-[80px] pt-3">
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2 ml-5'>
                            <IoCheckmarkDoneCircleOutline className="sm:w-10 w-6 sm:h-10 h-6" />
                            <h2 className='font-semibold sm:text-[28px] text-[18px]'>Aktivitas Selesai</h2>
                        </div>
                        <div className='flex gap-3 mr-5'>
                            <IoFilterSharp className="sm:text-4xl text-xl" />
                            <IoSearchOutline className="sm:text-4xl text-xl" />
                        </div>
                    </div>
                    <hr className="border-t-2 border-black sm:my-3 my-2 mx-6 " />
                </div>
                <div className="bg-white rounded-b-2xl h-[500px] overflow-x-scroll -mt-8">
                    <table className="table-auto border-collapse  w-full text-center overflow-x-auto">
                        <thead>
                            <tr>
                                <th className="sm:px-14 px-7 sm:py-4 py-2">Nama</th>
                                <th className="sm:px-14 px-7 sm:py-4 py-2">Tanggal Prospek</th>
                                <th className="sm:px-14 px-7 sm:py-4 py-2">Aktivitas</th>
                                <th className="sm:px-14 px-7 sm:py-4 py-2">Nama Nasabah</th>
                                <th className="sm:px-14 px-7 sm:py-4 py-2">Alamat</th>
                                <th className="sm:px-14 px-7 sm:py-4 py-2">Prospek</th>
                                <th className="sm:px-14 px-7 sm:py-4 py-2">Aktivitas Sales</th>
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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

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
                                <td>Tabungan</td>
                                <td>John Doe</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>
                                <td>Lorem Ipsum</td>

                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default page