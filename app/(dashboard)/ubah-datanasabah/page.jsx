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

    const statusaktivitas = [
        { value: 'option1', label: 'Selesai' },
        { value: 'option2', label: 'Ditunda' },
    ];

    const statusprospek = [
        { value: 'option1', label: 'Pilih Status Prospek' },
        { value: 'option2', label: 'Diterima' },
        { value: 'option2', label: 'Ditolak' },
    ];

    const namanasabah = [
        { value: 'option1', label: 'Tambahkan Nama Nasabah', link: '/inputdata-nasabah', },
        { value: 'option2', label: 'Lorem Ipsum' },
        { value: 'option3', label: 'Lorem Ipsum' },
        { value: 'option4', label: 'Lorem Ipsum' },
        { value: 'option5', label: 'Lorem Ipsum' },
        { value: 'option6', label: 'Lorem Ipsum' },
    ];

    const handleStatusProspek = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
    };

    const handleAktivitasSales = (selectedOption) => {
        setSelectedOptions1(selectedOption.value);
    };

    const handleStatusAktivitas = (selectedOption) => {
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
                <h2 className="sm:text-3xl text-[24px] sm:ml-5 ml-2 font-bold sm:mt-3 sm:mb-3 mb-1">
                    Ubah Data Nasabah
                </h2>
                <IoIosArrowDropleftCircle className="sm:h-10 h-6 sm:w-10 w-10 sm:ml-3 ml-1" />
            </div>
            <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4">
                <div className='sm:flex sm:ml-0 ml-1 sm:mr-0 mr-2'>
                    <div className='sm:w-1/2 w-full'>
                        <label htmlFor="dropdown" className="text-black text-[20px] font-medium mb-1 sm:px-10 pt-3 ">
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
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
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
                        <Input text={"Nominal Prospek"} placeholder={"Masukkan Nominal Prospek"} />
                        <label htmlFor="dropdown" className="text-black text-[20px] font-medium mb-1 sm:px-10 pt-3 ">
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
                    </div>
                    <div className='sm:w-1/2 w-full'>
                        <div className='sm:w-full '>
                        <Input text={"Closing"} placeholder={"Masukkan Closing"} />
                        <Input text={"Key Person"} placeholder={"Masukkan Key Person"} />
                        <label htmlFor="dropdown" className="text-black text-[20px] font-medium mb-1 sm:px-10 pt-3 ">
                            Status Aktivitas
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={statusaktivitas.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleStatusAktivitas}
                            options={statusaktivitas}
                            isSearchable={true}
                            placeholder={"Pilih Status Aktivitas"}
                        />
                        <label htmlFor="dropdown" className="text-black text-[20px] font-medium mb-1 sm:px-10 pt-3 ">
                            Status Prospek
                        </label>
                        <Dropdown
                            id="dropdown"
                            value={statusprospek.find((option) => option.value === String(selectedOptions1))}
                            onChange={handleStatusProspek}
                            options={statusprospek}
                            isSearchable={true}
                            placeholder={"Pilih Status Prospek"}
                        />
                        <DocumentationButton />
                    </div>
                    </div>
                </div>
                <div className='flex gap-3 sm:justify-end justify-center mt-8 sm:mr-5'>
                    <Button
                        text={"Selesai"}
                    />
                </div>
            </div>

        </div>
    )
}

export default page