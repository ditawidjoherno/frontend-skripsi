"use client"
import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/Input';
import Button from './_components/Button';
import Dropdown from './_components/Dropdown';
// import DocumentationButton from './_components/DocumentationButton';
import AddAktivitas from '@/hooks/add-aktivitas';
import useNamaNasabah from '@/hooks/use-nama-nasabah';

const Page = () => {
    const [aktivitas, setAktivitas] = useState('');
    const [namaNasabah, setNamaNasabah] = useState('');
    const [tipeNasabah, setTipeNasabah] = useState('');
    const [prospek, setProspek] = useState('');
    const [nominalProspek, setNominalProspek] = useState('');
    const [aktivitasSales, setAktivitasSales] = useState('');
    const [closing, setClosing] = useState('');
    const [statusAktivitas, setStatusAktivitas] = useState('');
    const [keteranganAktivitas, setKeteranganAktivitas] = useState('');
    const [dokumentasi, setDokumentasi] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const { data, getNamaNasabah } = useNamaNasabah();

    useEffect(() => {
        const fetchNamaNasabah = async () => {
            await getNamaNasabah();
        }
        fetchNamaNasabah()
    }, []);


    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

    };
    const { updateData } = AddAktivitas();

    const handleSubmit = async () => {
        console.log("test");
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const body = {
                aktivitas: aktivitas,
                nama_nasabah: namaNasabah,
                tipe_nasabah: tipeNasabah,
                prospek: prospek,
                nominal_prospek: nominalProspek,
                aktivitas_sales: aktivitasSales,
                closing: parseInt(closing),
                status_aktivitas: statusAktivitas,
                keterangan_aktivitas: keteranganAktivitas,
                dokumentasi: dokumentasi
            };
            console.log(body)
            const response = await updateData(body);
            console.log(response)
            setSuccess(true);
        } catch (error) {
            setError(error.message || "Terjadi kesalahan saat mengirim data.");
        } finally {
            setLoading(false);
        }
    };

    const test = () => {
        console.log("test")
    }

    const [selectedNasabah, setSelectedNasabah] = useState("");
    if (data) {
        const dropdownOptions = data.map((nasabah, index) => ({
            value: index, // Index digunakan sebagai value pada dropdown
            label: nasabah // Nama nasabah digunakan sebagai label pada dropdown
        }));
    }

    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-3xl text-[24px] sm:ml-5 ml-2 font-bold sm:mt-3 sm:mb-3 mb-1">
                    Input Data Harian
                </h2>
                <IoIosArrowDropleftCircle className="sm:h-10 h-6 sm:w-10 w-10 sm:ml-3 ml-1" />
            </div>
            <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4">
                <div className='sm:flex sm:ml-0 ml-1 sm:mr-0 mr-2'>
                    <div className='sm:w-1/2 w-full'>
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Nama Nasabah
                        </label>
                        {/* <Dropdown
                            value={namaNasabah}
                            onChange={setNamaNasabah}
                            options={[
                                { value: 'option1', label: 'Tambahkan Nama Nasabah', link: '/inputdata-nasabah' },
                                { value: 'option2', label: 'Lorem Ipsum' },
                                { value: 'option3', label: 'Lorem Ipsum' },
                                { value: 'option4', label: 'Lorem Ipsum' },
                                { value: 'option5', label: 'Lorem Ipsum' },
                                { value: 'option6', label: 'Lorem Ipsum' }
                            ]}
                            placeholder={"Pilih Nama Nasabah"}
                        /> */}
                        {data && (
                            <Dropdown
                                value={selectedNasabah}
                                onChange={(e) => setNamaNasabah(e.label)}
                                options={data.map((nasabah, index) => ({
                                    value: index,
                                    label: nasabah
                                }))}
                                placeholder={"Pilih Nama Nasabah"}
                            />
                        )}

                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Aktivitas Sales
                        </label>
                        <Dropdown
                            value={aktivitasSales}
                            onChange={(e) => setAktivitas(e.value)}
                            options={[
                                { value: 'tabungan', label: 'TABUNGAN' },
                                { value: 'depo-ritel', label: 'DEPO RITEL' },
                                { value: 'ntb-pbo', label: 'NTB - PBO' },
                                { value: 'noa btn move', label: 'NOA BTN MOVE' },
                                { value: 'transaksi teller', label: 'TRANSAKSI TELLER' },
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
                                { value: 'option21', label: 'DPK LEMBAGA' }
                            ]}
                            placeholder={"Pilih Aktivitas Sales"}
                        />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Tipe Nasabah
                        </label>
                        <Dropdown
                            value={tipeNasabah}
                            onChange={(newValue) => setTipeNasabah(newValue.value)}
                            options={[
                                { value: 'existing', label: 'Nasabah Eksisting' },
                                { value: 'new', label: 'Nasabah Baru' }
                            ]}
                            placeholder="Tipe Nasabah"
                        />

                        <Input text={"Prospek"} value={prospek} onChange={e => setProspek(e.target.value)} />
                        <Input text={"Nominal Prospek"} value={nominalProspek} onChange={e => setNominalProspek(e.target.value)} />
                    </div>
                    <div className='sm:w-1/2 w-full'>
                        <Input text={"Closing"} value={closing} onChange={e => setClosing(e.target.value)} />
                        <Input text={"Status Aktivitas"} value={statusAktivitas} onChange={e => setStatusAktivitas(e.target.value)} />
                        <Input text={"Keterangan Aktivitas"} value={keteranganAktivitas} onChange={e => setKeteranganAktivitas(e.target.value)} />
                        <>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                            />
                            <button onClick={handleClick}>Unggah Foto</button>
                        </>
                    </div>
                </div>
                <div className='flex gap-3 sm:justify-end justify-center mt-8 sm:mr-5'>
                    {/* <button
                        text={loading ? "Loading..." : "Tambah"}
                        onClick={handleSubmit}
                        disabled={loading}
                    /> */}
                    <button onClick={handleSubmit} disabled={loading}>
                        <div className="sm:mt-10 mt-1 mb-6 flex justify-center">
                            <div className="cursor-pointer sm:bg-[#5293CE] bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg">
                                <p className="font-medium text-white text-semibold">{loading ? "Loading..." : "Tambah"}</p>
                            </div>
                        </div>
                    </button>
                </div>
                {/* {success && <div className="text-green-500">Data berhasil ditambahkan.</div>}
                {error && <div className="text-red-500">{error}</div>} */}
            </div>
        </div>
    );
};

export default Page;
