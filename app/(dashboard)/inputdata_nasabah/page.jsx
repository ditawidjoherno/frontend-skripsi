"use client";
import React, { useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/Input';
import Button from './_components/button';
import Dropdown from './_components/dropdown';
import DateInput from './_components/Date';


const Page = () => {
    const [maritalStatus, setMaritalStatus] = useState("");
    const [hasChildren, setHasChildren] = useState(false);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [showSpouseData, setShowSpouseData] = useState(false);
    const [childrenData, setChildrenData] = useState([]);

    const [selectedOptions1, setSelectedOptions1] = useState('');

    const statusnasabah = [
        { value: 'option1', label: 'Pilih Status Nasabah' },
        { value: 'option2', label: 'Nasabah Eksisting' },
        { value: 'option3', label: 'Nasabah Baru' },
    ];

    const jeniskelamin = [
        { value: 'option1', label: 'Perempuan' },
        { value: 'option2', label: 'Laki-laki' }
    ];

    const agama = [
        { value: 'option1', label: 'Islam' },
        { value: 'option2', label: 'Kristen' },
        { value: 'option3', label: 'Katolik' },
        { value: 'option4', label: 'Hindu' },
        { value: 'option5', label: 'Budha' },
        { value: 'option6', label: 'Khonghucu' }
    ];



    const handleStatusNasabah = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
    };


    const handleJenisKelamin = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
    };

    const handleAgama = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
    };


    const handleMaritalStatusChange = (event) => {
        const selectedStatus = event.target.value;
        setMaritalStatus(selectedStatus);
        setNumberOfChildren(0);
        setHasChildren(false);
        if (selectedStatus === "menikah") {
            setShowSpouseData(true);
        } else {
            setShowSpouseData(false);
        }
    };

    const handleNumberOfChildrenChange = (event) => {
        const count = parseInt(event.target.value);
        setNumberOfChildren(count);
        const children = [];
        for (let i = 0; i < count; i++) {
            children.push({
                name: "",
            });
        }
        setChildrenData(children);
    };

    const handleHasChildrenChange = (event) => {
        setHasChildren(event.target.checked);
        if (!event.target.checked) {
            setNumberOfChildren(0);
            setChildrenData([]);
        }
    };


    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[35px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Input Data Nasabah
                </h2>
                <IoIosArrowDropleftCircle className="sm:h-8 sm:w-8 h-5 w-5 sm:ml-3 ml-1" />
            </div>
            <div className="bg-white rounded-2xl h-auto mb-6 mt-2 sm:ml-5 ml-3 w-full sm:pt-5 pt-6">
                <div className='flex '>
                    <div className='w-1/2'>
                        <Input text={"Nama Nasabah"} placeholder={"Masukkan Nama Nasabah"} />

                        <div className="flex flex-col">
                            <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                                Status Nasabah
                            </label>
                            <Dropdown
                                id="dropdown"
                                value={statusnasabah.find((option) => option.value === String(selectedOptions1))}
                                onChange={handleStatusNasabah}
                                options={statusnasabah}
                                isSearchable={true}
                                placeholder={"Pilih status nasabah"}
                            />
                        </div>
                        <Input text={"Alamat"} placeholder={"Masukkan Alamat"} />
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Jenis Kelamin
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={jeniskelamin.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleJenisKelamin}
                            options={jeniskelamin}
                            isSearchable={true}
                            placeholder={"Pilih Jenis Kelamin"}
                        />
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Agama
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={agama.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleAgama}
                            options={agama}
                            isSearchable={true}
                            placeholder={"Pilih Agama"}
                        />
                        <Input text={"Tempat Lahir"} placeholder={"Masukkan Tipe Nasabah"} />
                        <div className="">
                            <DateInput text="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" />
                        </div>
                    </div>
                    <div className='w-1/2'>
                        <Input text={"Nomor Telepon"} placeholder={"Masukkan Nominal Prospek"} />
                        <div>

                            <label htmlFor="maritalStatus" className=" text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">Status Pernikahan</label>
                            <div className='sm:px-10 pt-3'>
                                <select id="maritalStatus" value={maritalStatus} onChange={handleMaritalStatusChange} isSearchable={true} className="flex gap-2 w-full px-5 py-1 items-center rounded-sm border border-gray-300 focus:outline-none  bg-[#D9D9D9]">
                                    <option value="" className='bg-white'>Pilih Status Pernikahan</option>
                                    <option value="belum menikah" className='bg-white'>Belum Menikah</option>
                                    <option value="menikah" className='bg-white'>Menikah</option>
                                    <option value="bercerai" className='bg-white'>Bercerai</option>
                                </select>
                            </div>
                        </div>


                        <Input text={"Data Pekerjaan / Usaha"} placeholder={"Masukkan Closing"} />
                        <Input text={"Alamat Pekerjaan / Usaha"} placeholder={"Masukkan Key Person"} />
                        <Input text={"Estimasi Penghasilan Bulanan"} placeholder={"Masukkan Estimasi Penghasilan Bulanan"} />

                        {maritalStatus === "menikah" || maritalStatus === "bercerai" ? (
                            <div className='sm:px-10 pt-4 items-center'>
                                <label htmlFor="hasChildren" className='text-black sm:text-[20px] text-2xl font-medium mb-1'>Memiliki Anak?</label>
                                <br />
                                <input type="checkbox" id="hasChildren" checked={hasChildren} onChange={handleHasChildrenChange} className="form-checkbox h-5 w-5 mr-3 text-indigo-600" />
                                <label htmlFor="hasChildren" className='text-black sm:text-[20px] text-2xl font-medium mb-1'>Ya</label>
                            </div>
                        ) : null}
                        {hasChildren && (
                            <div className='sm:px-10 pt-4 items-center'>
                                <label htmlFor="numberOfChildren" className='text-black sm:text-[20px] text-2xl font-medium mb-1'>Jumlah Anak</label>
                                <br />
                                <input type="number" id="numberOfChildren" value={numberOfChildren} onChange={handleNumberOfChildrenChange} className="flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm" />
                            </div>
                        )}

                    </div>
                </div>
                <div className='flex gap-3 justify-end mt-8 sm:mr-5 mr-20'>
                </div>
            </div>

            {showSpouseData && (
                <div className="items-center mr-6 w-full">
                    <h2 className="sm:text-[35px] text-[24px] sm:ml-7 ml-4 font-semibold">
                        Input Data Pasangan Nasabah
                    </h2>
                    <div className="bg-white rounded-2xl h-auto mb-6 mt-2 sm:ml-5 ml-3 w-full sm:pt-5 pt-6">
                        <div className='flex '>
                            <div className='w-1/2'>
                                <Input text={"Nama Nasabah"} placeholder={"Masukkan Nama Nasabah"} />
                                <Input text={"Alamat"} placeholder={"Masukkan Alamat"} />
                                <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Jenis Kelamin
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={jeniskelamin.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleJenisKelamin}
                            options={jeniskelamin}
                            isSearchable={true}
                            placeholder={"Pilih Jenis Kelamin"}
                        />
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Agama
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={agama.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleAgama}
                            options={agama}
                            isSearchable={true}
                            placeholder={"Pilih Agama"}
                        />
                                <Input text={"Tempat Lahir"} placeholder={"Masukkan Tipe Nasabah"} />
                                <div className="">
                                    <DateInput text="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <Input text={"Nomor Telepon"} placeholder={"Masukkan Nominal Prospek"} />
                                <Input text={"Data Pekerjaan / Usaha"} placeholder={"Masukkan Closing"} />
                                <Input text={"Alamat Pekerjaan / Usaha"} placeholder={"Masukkan Key Person"} />
                                <Input text={"Estimasi Penghasilan Bulanan"} placeholder={"Masukkan Estimasi Penghasilan Bulanan"} />
                            </div>
                        </div>
                        <div className='flex gap-3 justify-end mt-8 sm:mr-5 mr-20'>
                        </div>
                    </div>
                </div>
            )}

            {hasChildren && (
                <div className="items-center mr-6 w-full">
                    {childrenData.map((child, index) => (
                        <div key={index} text={`Nama Anak ${index + 1}`}>
                            <h2 className="sm:text-[35px] text-[24px] sm:ml-7 ml-4 font-semibold"  >Input Data Anak ke-{index + 1} Nasabah</h2>
                            <div key={index} className="bg-white rounded-2xl h-auto mb-6 mt-2 sm:ml-5 ml-3 w-full sm:pt-5 pt-6">
                                <div className='flex '>
                                    <div className='w-1/2'>
                                        <Input text={"Nama Nasabah"} placeholder={"Masukkan Nama Nasabah"} />
                                        <Input text={"Alamat"} placeholder={"Masukkan Alamat"} />
                                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                                            Jenis Kelamin
                                        </label>
                                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Jenis Kelamin
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={jeniskelamin.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleJenisKelamin}
                            options={jeniskelamin}
                            isSearchable={true}
                            placeholder={"Pilih Jenis Kelamin"}
                        />
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Agama
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={agama.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleAgama}
                            options={agama}
                            isSearchable={true}
                            placeholder={"Pilih Agama"}
                        />
                                        <Input text={"Tempat Lahir"} placeholder={"Masukkan Tipe Nasabah"} />
                                        <div className="">
                                            <DateInput text="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" />
                                        </div>
                                    </div>
                                    <div className='w-1/2'>
                                        <Input text={"Nomor Telepon"} placeholder={"Masukkan Nominal Prospek"} />
                                        <Input text={"Data Pekerjaan / Usaha"} placeholder={"Masukkan Closing"} />
                                        <Input text={"Alamat Pekerjaan / Usaha"} placeholder={"Masukkan Key Person"} />
                                        <Input text={"Estimasi Penghasilan Bulanan"} placeholder={"Masukkan Estimasi Penghasilan Bulanan"} />
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-end mt-8 sm:mr-5 mr-20'>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}



            <div className='w-full flex justify-end items-start h-full -mt-12'>
                <Button className="justify-end"
                    text={"Tambah"}
                />
            </div>
        </div>
    )
}

export default Page;
