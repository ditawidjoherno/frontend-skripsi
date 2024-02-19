import React from 'react'
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from './_components/TeksProfil';
import Button from './_components/button';


const page = () => {
    return (
        <div className='bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10'>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Profil Nasabah
                </h2>
                <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
            </div>

            <div className='flex w-full pr-9 mb-5'>
                <div className="bg-white max-w-full  min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:py-3 pt-6 ">
                    <h2 className='font-medium text-[28px] ml-11'>Data Nasabah</h2>
                    <hr className="my-3 mx-6  border-t-2 justify-center items-center border-black mt-1" />
                    <div className="sm:flex justify-start flex-wrap sm:px-0 px-10 w-full ">
                        <div className='w-auto mr-14'>
                            <TeksProfil label="Nama Nasabah" value="123345" />
                            <TeksProfil label="Status Nasabah" value="lorem ipsum" />
                            <TeksProfil label="Nomor Telepon" value="lorem ipsum" />
                            <TeksProfil label="Jenis Kelamin" value="lorem ipsum" />
                            <TeksProfil label="Agama" value="lorem ipsum" />
                            <TeksProfil label="Tempat Lahir" value="lorem ipsum" />
                            <TeksProfil label="Tanggal Lahir" value="lorem ipsum" />
                            <TeksProfil label="Alamat" value="lorem ipsum" />
                        </div>
                        <div className="w-auto">
                            <TeksProfil label="Status Pernikahan" value="lorem ipsum" />
                            <TeksProfil label="Email" value="lorem ipsum" />
                            <TeksProfil label="Data Pekerjaan / Usaha" value="lorem ipsum" />
                            <TeksProfil label="Alamat Pekerjaan / Usaha" value="lorem ipsum" />
                            <TeksProfil label="Estimasi Penghasilan / Usaha" value="lorem ipsum" />
                        </div>
                    </div>
                </div>
                <div className="bg-white max-w-full  min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:py-3 pt-6 ">
                    <h2 className='font-medium text-[28px] ml-11'>Data Nasabah</h2>
                    <hr className="my-3 mx-6  border-t-2 justify-center items-center border-black mt-1" />
                    <div className="sm:flex justify-start flex-wrap sm:px-0 px-10 w-full ">
                        <div className='w-auto mr-14'>
                            <TeksProfil label="Nama Nasabah" value="123345" />
                            <TeksProfil label="Status Nasabah" value="lorem ipsum" />
                            <TeksProfil label="Nomor Telepon" value="lorem ipsum" />
                            <TeksProfil label="Jenis Kelamin" value="lorem ipsum" />
                            <TeksProfil label="Agama" value="lorem ipsum" />
                            <TeksProfil label="Tempat Lahir" value="lorem ipsum" />
                            <TeksProfil label="Tanggal Lahir" value="lorem ipsum" />
                            <TeksProfil label="Alamat" value="lorem ipsum" />
                        </div>
                        <div className="w-auto">
                            <TeksProfil label="Status Pernikahan" value="lorem ipsum" />
                            <TeksProfil label="Email" value="lorem ipsum" />
                            <TeksProfil label="Data Pekerjaan / Usaha" value="lorem ipsum" />
                            <TeksProfil label="Alamat Pekerjaan / Usaha" value="lorem ipsum" />
                            <TeksProfil label="Estimasi Penghasilan / Usaha" value="lorem ipsum" />
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex w-full pr-9 mb-5'>
                <div className="bg-white max-w-full  min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:py-3 pt-6 ">
                    <h2 className='font-medium text-[28px] ml-11'>Data Nasabah</h2>
                    <hr className="my-3 mx-6  border-t-2 justify-center items-center border-black mt-1" />
                    <div className="sm:flex justify-start flex-wrap sm:px-0 px-10 w-full ">
                        <div className='w-auto mr-14'>
                            <TeksProfil label="Nama Nasabah" value="123345" />
                            <TeksProfil label="Status Nasabah" value="lorem ipsum" />
                            <TeksProfil label="Nomor Telepon" value="lorem ipsum" />
                            <TeksProfil label="Jenis Kelamin" value="lorem ipsum" />
                            <TeksProfil label="Agama" value="lorem ipsum" />
                            <TeksProfil label="Tempat Lahir" value="lorem ipsum" />
                            <TeksProfil label="Tanggal Lahir" value="lorem ipsum" />
                            <TeksProfil label="Alamat" value="lorem ipsum" />
                        </div>
                        <div className="w-auto">
                            <TeksProfil label="Status Pernikahan" value="lorem ipsum" />
                            <TeksProfil label="Email" value="lorem ipsum" />
                            <TeksProfil label="Data Pekerjaan / Usaha" value="lorem ipsum" />
                            <TeksProfil label="Alamat Pekerjaan / Usaha" value="lorem ipsum" />
                            <TeksProfil label="Estimasi Penghasilan / Usaha" value="lorem ipsum" />
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex w-full pr-9 mb-5'>
                <div className="bg-white max-w-full  min-w-[50%] rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:py-3 pt-6 ">
                    <h2 className='font-medium text-[28px] ml-11'>Dokumentasi</h2>
                    <hr className="my-3 mx-6  border-t-2 justify-center items-center border-black mt-1" />
                    <div className='flex justify-center mb-5'>
                        <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9" />
                        <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9" />
                        <img src={"/img/profil.png"} alt="Foto Profil" className="sm:w-[250px] w-[100px] sm:h-[250px] h-[100px] mx-9" />
                    </div>
                </div>

            </div>
            <div className='w-full flex justify-end items-start h-full'>
                <Button className="justify-end"
                    text={"Ubah Data"}
                />
            </div>
        </div>

    )
}

export default page
