"use client"
import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import Link from 'next/link';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoIosArrowDropleft, IoIosArrowDropright, IoIosArrowDropleftCircle } from "react-icons/io";
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import useAktivitasSelesai from '@/hooks/use-aktivitas-selesai';

const Page = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, data, getUserData } = useAktivitasSelesai();

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (data) {
            setTableData(data);
        }
    }, [data]);

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleGetDataUser = async () => {
        await getUserData();
    }

    useEffect(() => {
        handleGetDataUser();
    }, [])


    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" /> Loading
            </div>
        );
    }


    const filteredData = tableData.filter(item =>
        item.nama_user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.aktivitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_nasabah.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prospek.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // item.aktivitas_sales.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keterangan_aktivitas.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const itemsPerPage = 10;
    const offset = (currentPage - 1) * itemsPerPage;
    const indexOfLastItem = offset + itemsPerPage;
    const indexOfFirstItem = offset + 1;
    const currentItems = filteredData.slice(offset, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / 10)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(startPage + maxPages - 1, Math.ceil(filteredData.length / 10));

    if (endPage - startPage + 1 < maxPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }

    const capitalizeFirstLetter = (string) => {
        if (string && typeof string === 'string' && string.length > 0) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            return string;
        }
    };

    const handleGoBack = () => {
        router.back();
    };


    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[53px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="sm:flex items-center w-full sm:justify-between sm:mt-3 mt-0">
                <div className="sm:ml-5 ml-3 sm:mt-3 mt-0 flex items-center sm:gap-3 gap-1 ">
                    <h2 className="sm:text-4xl text-[24px] font-bold">
                        Aktivitas Sales
                    </h2>
                    <IoIosArrowDropleftCircle
                        className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                        onClick={handleGoBack}
                    />
                </div>
                <div>
                    <div className='flex justify-center gap-1 sm:mr-5 sm:mt-2'>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="border-2 border-gray-300 px-4 py-2 sm:rounded-l-2xl rounded-l-lg focus:outline-none focus:border-blue-500 sm:w-[270px] w-full sm:h-[40px] h-[30px]"
                            />
                            <button type="submit" className="bg-[#FFE500] text-black border-black px-1 py-1 sm:rounded-r-2xl rounded-r-lg hover:bg-[#f6f0ba] sm:w-[40px] w-[30px] sm:h-[40px] h-[30px] focus:outline-none">
                                <IoSearchOutline className="sm:w-6 w-4 sm:h-6 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='sm:ml-5 ml-3 w-full gap-9 mt-4 '>
                <div className="bg-white rounded-t-2xl sm:h-[80px] h-[72px] pt-3">
                    <div className='flex justify-between'>
                        <div className='flex items-center gap-2 ml-5'>
                            <IoCheckmarkDoneCircleOutline className="sm:w-10 w-7 sm:h-10 h-7" />
                            <h2 className='font-semibold sm:text-[28px] text-[20px]'>Aktivitas Selesai</h2>
                        </div>
                    </div>
                    <hr className="border-t-2 border-black my-3 mx-6" />
                </div>
                <div className="bg-white rounded-b-2xl sm:h-[500px] h-[450px] overflow-x-scroll">
                    <table className="table-auto border-collapse w-full text-center overflow-x-scroll" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        <thead>
                            <tr>
                                <th className="sm:px-8 px-7 sm:py-3 py-0">No</th>
                                <th className="sm:px-14 px-7 sm:py-3 py-0">Nama Staff</th>
                                <th className="sm:px-14 px-7 sm:py-3 py-0">Tanggal Prospek</th>
                                <th className="sm:px-14 px-7 sm:py-3 py-0"> Aktivitas</th>
                                <th className="sm:px-14 px-7 sm:py-3 py-0">Nama Nasabah</th>
                                {/* <th className="sm:px-14 px-7 sm:py-3 py-0">Prospek</th> */}
                                {/* <th className="sm:px-14 px-7 sm:py-3 py-0">Aktivitas Sales</th> */}
                                <th className="sm:px-14 px-7 sm:py-3 py-0">Keterangan Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.length > 0 ? (
                                currentItems.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                                        <td>{offset + index + 1}</td>
                                        <td>{capitalizeFirstLetter(item.nama_user)}</td>
                                        <td>{item.created_at}</td>
                                        <td>{capitalizeFirstLetter(item.aktivitas)}</td>
                                        <td>
                                            <Link href={`/profil-nasabah/${item.nasabah_id}`}>
                                                <div className="text-black hover:text-blue-700 cursor-pointer">{item.nama_nasabah}</div>
                                            </Link>
                                        </td>
                                        {/* <td>{capitalizeFirstLetter(item.prospek)}</td> */}
                                        {/* <td>{capitalizeFirstLetter(item.aktivitas_sales)}</td> */}
                                        <td>
                                            <div className={`py-1 rounded-md mx-6 my-1 text-white font-semibold 
        ${item.keterangan_aktivitas.toLowerCase() === 'diterima' ? 'bg-green-500'
                                                    : item.keterangan_aktivitas.toLowerCase() === 'ditolak' ? 'bg-red-500'
                                                        : item.keterangan_aktivitas.toLowerCase() === 'belum diproses' ? 'bg-orange-500'
                                                            : ''}`}>
                                                {capitalizeFirstLetter(item.keterangan_aktivitas)}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">Belum ada data yang ditambahkan</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5">
                    <div className='flex items-center justify-center gap-4 mb-5 '>
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            <IoIosArrowDropleft className="text-blue-500 text-3xl" />
                        </button>
                        {filteredData.length > 0 &&
                            <ul className="pagination flex gap-4 text-xl]">
                                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                                    <li key={page} className={`page-item ${currentPage === page ? 'bg-blue-500 text-white px-2 py-[2px] rounded-sm' : ''}`}>
                                        <button onClick={() => setCurrentPage(page)} className="page-link">
                                            {page}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        }
                        <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / 10)}>
                            <IoIosArrowDropright className="text-blue-500 text-3xl" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;

