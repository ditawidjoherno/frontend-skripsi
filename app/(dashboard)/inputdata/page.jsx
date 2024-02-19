"use client";
import React, { useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/Input';
import Button from './_components/button';
import Dropdown from './_components/dropdown';
import DocumentationButton from './_components/DokumentasiButton';


const page = () => {
    const [selectedOptions1, setSelectedOptions1] = useState('');

    const aktivitassales = [
        { value: 'option1', label: 'TABUNGAN' },
        { value: 'option2', label: 'DEPO RITEL' },
        { value: 'option3', label: 'NTB - PBO' },
        { value: 'option4', label: 'NOA BTN MOVE' },
        { value: 'option5', label: 'TRANSAKSI TELLER' },
        { value: 'option6', label: 'TRANSAKSI CRM' },
        { value: 'option7', label: 'OPERASIONAL MKK' },
        { value: 'option8', label: 'QRIS' },
        { value: 'option9', label: 'EDC' },
        { value: 'option10', label: 'AGEN' },
        { value: 'option11', label: 'KUADRAN AGEN' },
        { value: 'option12', label: 'NOA PAYROLL' },
        { value: 'option13', label: 'VOA PAYROLL' },
        { value: 'option14', label: 'NOA PENSIUN' },
        { value: 'option15', label: 'VOA PENSIUN' },
        { value: 'option16', label: 'VOA E-BATARAPOS' },
        { value: 'option17', label: 'NOA GIRO' },
        { value: 'option18', label: 'AKUISI SATKER' },
        { value: 'option19', label: 'CMS' },
        { value: 'option20', label: 'JUMLAH PKS PPO' },
        { value: 'option21', label: 'DPK LEMBAGA' },
    ];

    const tipenasabah = [
        { value: 'option1', label: 'Nasabah Eksisting' },
        { value: 'option2', label: 'Nasabah Baru' },
    ];

    const namanasabah = [
        { value: 'option1', label: 'Tambahkan Nama Nasabah', link: '/inputdata_nasabah',  },
        { value: 'option2', label: 'Lorem Ipsum' },
        { value: 'option3', label: 'Lorem Ipsum' },
        { value: 'option4', label: 'Lorem Ipsum' },
        { value: 'option5', label: 'Lorem Ipsum' },
        { value: 'option6', label: 'Lorem Ipsum' },
    ];

    const handleAktivitasSales = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
    };


    const handleTipeNasabah = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
    };

    const handleNamaNasabah = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
        if (selectedOption.link) {
            window.location.href = selectedOption.link;
        }
    };


    const handleDropdownChange = (selectedOption) => {
        if (selectedOption.link) {
            window.location.href = selectedOption.link;
        }
    };

    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Input Data Harian
                </h2>
                <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
            </div>
            <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-6">
                <div className='flex '>
                    <div className='w-1/2'>
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Nama Nasabah
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={namanasabah.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleNamaNasabah}
                            options={namanasabah}
                            isSearchable={true}
                            placeholder={"Pilih status nasabah"}
                        />

                        <Input text={"Nomor Hp"} placeholder={"Masukkan Nomor Hp"} />
                        <Input text={"Alamat"} placeholder={"Masukkan Alamat"} />
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Tipe Nasabah
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={tipenasabah.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleTipeNasabah}
                            options={tipenasabah}
                            isSearchable={true}
                            placeholder={"Pilih Tipe Nasabah"}
                        />
                        <Input text={"Prospek"} placeholder={"Masukkan Prospek"} />
                    </div>
                    <div className='w-1/2'>
                        <Input text={"Nominal Prospek"} placeholder={"Masukkan Nominal Prospek"} />
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                            Aktivitas Sales
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={aktivitassales.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleAktivitasSales}
                            options={aktivitassales}
                            isSearchable={true}
                            placeholder={"Pilih Aktivitas Sales"}
                        />
                        <Input text={"Closing"} placeholder={"Masukkan Closing"} />
                        <Input text={"Key Person"} placeholder={"Masukkan Key Person"} />

                        <DocumentationButton />

                    </div>
                </div>
                <div className='flex gap-3 justify-end mt-8 sm:mr-5 mr-20'>
                    <Button
                        text={"Tambah"}
                    />
                </div>
            </div>

        </div>
    )
}

export default page
