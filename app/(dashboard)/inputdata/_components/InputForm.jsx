import React, { useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import AddAktivitas from '@/hooks/add-aktivitas';
// import Input from './_components/Input';
// import Button from './_components/button';
// import Dropdown from './_components/dropdown';
import DocumentationButton from './DokumentasiButton';
// import Link from 'next/link';
import Dropdown from './dropdown';

const AktivitasForm = () => {
    const [aktivitas, setAktivitas] = useState('');
    // const [nama_nasabah, setNamaNasabah] = useState('');
    const [noHP, setNoHP] = useState('');
    const [alamat, setAlamat] = useState('');
    const [tipe_nasabah, setTipeNasabah] = useState('');
    const [prospek, setProspek] = useState('');
    const [nominalProspek, setNominalProspek] = useState('');
    // const [aktivitasSales, setAktivitasSales] = useState('');
    const [closing, setClosing] = useState('');
    const [keyPerson, setKeyPerson] = useState('');
    const [dokumentasi, setDokumentasi] = useState('');
    const [error, setError] = useState('');

    const { loading, data, add } = AddAktivitas()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginResult = await login(nip, password);
        if (loginResult && loginResult.success) {
            setError('');
        } else {
            if (!loginResult || !loginResult.success) {
                setError('NIP atau password salah');
            }
            setPassword('');
            passwordInputRef.current.focus();
        }
    }

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
        { value: 'option1', label: 'Tambahkan Nama Nasabah', link: '/inputdata_nasabah', },
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

    const handleKeyPressNIP = (e) => {
        if (e.key === 'Enter') {
            passwordInputRef.current.focus();
        }
    }

    const handleKeyPressPassword = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    }

    return (
        <>
            {error && <p className="text-red-500 items-center justify-center flex text-sm mt-3">{error}</p>}
            <div className='flex '>
                <div className='w-1/2'>
                    <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                        Nama Nasabah
                    </label>
                    <Dropdown
                        id="dropdown"
                        value={namanasabah.find((option) => option.value === String(selectedOptions1))}
                        onChange={(e) => setNamaNasabah(e.target.value)}
                        options={nama_nasabah}
                        isSearchable={true}
                        placeholder={"Pilih status nasabah"}
                    />
                    <div className='flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm'>
                        <input 
                        className='border-none outline-none w-full bg-transparent font-lightitalic' 
                        placeholder="Masukkan Nomor HP" 
                        onChange={(e) => setNoHP(e.target.value)}
                        value={noHP}
                        />
                    </div>
                    <div className='flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm'>
                        <input 
                        className='border-none outline-none w-full bg-transparent font-lightitalic' 
                        placeholder="Masukkan Alamat" 
                        onChange={(e) => setAlamat(e.target.value)}
                        value={alamat}
                        />
                    </div>
                    <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                        Tipe Nasabah
                    </label>
                    <Dropdown
                        id="dropdown"
                        value={tipenasabah.find((option) => option.value === String(selectedOptions1))}

                        onChange={(e) => setTipeNasabah(e.target.value)}
                        options={tipe_nasabah}
                        isSearchable={true}
                        placeholder={"Pilih Tipe Nasabah"}
                    />
                    <div className='flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm'>
                        <input 
                        className='border-none outline-none w-full bg-transparent font-lightitalic' 
                        placeholder="Masukkan Prospek" 
                        onChange={(e) => setProspek(e.target.value)}
                        value={prospek}
                        />
                    </div>
                </div>
                <div className='w-1/2'>
                <div className='flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm'>
                        <input 
                        className='border-none outline-none w-full bg-transparent font-lightitalic' 
                        placeholder="Masukkan Nominal Prospek" 
                        onChange={(e) => setNominalProspek(e.target.value)}
                        value={nominalProspek}
                        />
                    </div>
                    <label htmlFor="dropdown" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
                        Aktivitas Sales
                    </label>
                    <Dropdown
                        id="dropdown"
                        value={aktivitassales.find((option) => option.value === String(selectedOptions1))}

                        onChange={(e) => setAktivitasSales(e.target.value)}
                        options={aktivitasSales}
                        isSearchable={true}
                        placeholder={"Pilih Aktivitas Sales"}
                    />
                    <div className='flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm'>
                        <input 
                        className='border-none outline-none w-full bg-transparent font-lightitalic' 
                        placeholder="Masukkan Closing" 
                        onChange={(e) => setClosing(e.target.value)}
                        value={closing}
                        />
                    </div>
                    <div className='flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm'>
                        <input 
                        className='border-none outline-none w-full bg-transparent font-lightitalic' 
                        placeholder="Masukkan Key Person" 
                        onChange={(e) => setKeyPerson(e.target.value)}
                        value={keyPerson}
                        />
                    </div>
                    <DocumentationButton />
                </div>
            </div>
        </>
    )
}

export default AktivitasForm;
