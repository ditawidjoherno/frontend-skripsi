"use client"
import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/Input';
import Dropdown from './_components/Dropdown';
import AddAktivitas from '@/hooks/add-aktivitas';
import useNamaNasabah from '@/hooks/use-nama-nasabah';
import AddDokumentasi from '@/hooks/add-dokumentasi';
import Link from "next/link";

const inputdata = () => {
    const [aktivitas, setAktivitas] = useState('');
    const [namaNasabah, setNamaNasabah] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nomorHP, setNomorHP] = useState('');
    const [tipeNasabah, setTipeNasabah] = useState('');
    const [prospek, setProspek] = useState('');
    const [nominalProspek, setNominalProspek] = useState('');
    const [aktivitasSales, setAktivitasSales] = useState('');
    const [closing, setClosing] = useState('');
    const [statusAktivitas, setStatusAktivitas] = useState('');
    const [keteranganAktivitas, setKeteranganAktivitas] = useState('');
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

    const { updateData } = AddAktivitas();
    const { addDokumentasi, data: dokumentasi_url } = AddDokumentasi();

    const [selectedNasabah, setSelectedNasabah] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    // Di inputdata Component
    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const body = {
                nama_nasabah: namaNasabah,
                alamat: alamat,
                nomor_hp_nasabah: nomorHP,
                nama_aktivitas: aktivitas,
                tipe_nasabah: tipeNasabah,
                prospek: prospek,
                nominal_prospek: parseInt(nominalProspek),
                closing: parseInt(closing),
                status_aktivitas: statusAktivitas,
                aktivitas_sales: aktivitasSales,
                keterangan_aktivitas: keteranganAktivitas,
                dokumentasi: dokumentasi_url,
            };
            // console.log(body)
            // const response = await updateData(body);
            // console.log(response)

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                await addDokumentasi(formData);
                setTimeout(() => {
                    const addAktivitas = async () => {
                        body.dokumentasi = dokumentasi_url;
                        const response = await updateData(body);
                        console.log(body)
                        console.log(dokumentasi_url)
                        console.log(response)
                    }

                    addAktivitas()
                    alert("Berhasil menambahkan aktivitas")
                }, 100)
            } else {
                console.log(body)
                const response = await updateData(body);
                console.log(response)
            }
            setSuccess(true);
            // window.location.reload();
        } catch (error) {
            setError(error.message || "Terjadi kesalahan saat mengirim data.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-3xl text-[24px] sm:ml-5 ml-2 font-bold sm:mt-3 sm:mb-3 mb-1">
                    Input Data Harian
                </h2>
                <Link href="/data_aktivitas">
                <IoIosArrowDropleftCircle className="sm:h-10 h-6 sm:w-10 w-10 sm:ml-3 ml-1" />
                </Link>
            </div>
            <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4">
                <div className='sm:flex sm:ml-0 ml-1 sm:mr-0 mr-2'>
                    <div className='sm:w-1/2 w-full'>
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Nama Nasabah
                        </label>
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
                        <Input text={"Alamat"} value={alamat} onChange={e => setAlamat(e.target.value)} placeholder={"Masukkan Alamat"} />
                        <Input text={"Nomor Telepon Nasabah"} value={nomorHP} onChange={e => setNomorHP(e.target.value)} placeholder={"Masukkan Nomor Telepon"} />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Aktivitas
                        </label>
                        <Dropdown
                            value={aktivitas}
                            onChange={(e) => setAktivitas(e.value)}
                            options={[
                                { value: 'tabungan', label: 'TABUNGAN' },
                                { value: 'depo-ritel', label: 'DEPO RITEL' },
                                { value: 'ntb-pbo', label: 'NTB - PBO' },
                                { value: 'noa btn move', label: 'NOA BTN MOVE' },
                                { value: 'transaksi teller', label: 'TRANSAKSI TELLER' },
                                { value: 'transaksi crm', label: 'TRANSAKSI CRM' },
                                { value: 'operasional mkk', label: 'OPERASIONAL MKK' },
                                { value: 'qris', label: 'QRIS' },
                                { value: 'edc', label: 'EDC' },
                                { value: 'agen', label: 'AGEN' },
                                { value: 'kuadran agen', label: 'KUADRAN AGEN' },
                                { value: 'noa payroll', label: 'NOA PAYROLL' },
                                { value: 'voa payroll', label: 'VOA PAYROLL' },
                                { value: 'noa pensiun', label: 'NOA PENSIUN' },
                                { value: 'voa pensiun', label: 'VOA PENSIUN' },
                                { value: 'voa e-batarapos', label: 'VOA E-BATARAPOS' },
                                { value: 'noa giro', label: 'NOA GIRO' },
                                { value: 'akuisi satker', label: 'AKUISI SATKER' },
                                { value: 'cms', label: 'CMS' },
                                { value: 'jumlah pks ppo', label: 'JUMLAH PKS PPO' },
                                { value: 'dpk lembaga', label: 'DPK LEMBAGA' }
                            ]}
                            placeholder={"Pilih Aktivitas"}
                        />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Tipe Nasabah
                        </label>
                        <Dropdown
                            value={tipeNasabah}
                            onChange={(newValue) => setTipeNasabah(newValue.value)}
                            options={[
                                { value: 'Nasabah Existing', label: 'Nasabah Eksisting' },
                                { value: 'Nasabah Baru', label: 'Nasabah Baru' }
                            ]}
                            placeholder="Tipe Nasabah"
                        />

                        <Input text={"Prospek"} value={prospek} onChange={e => setProspek(e.target.value)} placeholder={"Masukkan Prospek"} />
                    </div>
                    <div className='sm:w-1/2 w-full'>
                        <Input text={"Nominal Prospek"} value={nominalProspek} onChange={e => setNominalProspek(e.target.value)} placeholder={"Masukkan Nominal Prospek"} />
                        <Input text={"Closing"} value={closing} onChange={e => setClosing(e.target.value)} placeholder={"Masukkan Closing"} />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Status Aktivitas
                        </label>
                        <Dropdown
                            value={statusAktivitas}
                            onChange={(newValue) => setStatusAktivitas(newValue.value)}
                            options={[
                                { value: 'selesai', label: 'Selesai' },
                                { value: 'ditunda', label: 'Ditunda' }
                            ]}
                            placeholder="Pilih  Status Aktivitas"
                        />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Keterangan Aktivitas
                        </label>
                        <Dropdown
                            value={keteranganAktivitas}
                            onChange={(newValue) => setKeteranganAktivitas(newValue.value)}
                            options={[
                                { value: 'diterima', label: 'Diterima' },
                                { value: 'ditolak', label: 'Ditolak' }
                            ]}
                            placeholder="Pilih  keterangan Aktivitas"
                        />
                        <label htmlFor="dropdown" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                            Aktivitas Sales
                        </label>
                        <Dropdown
                            value={aktivitasSales}
                            onChange={(newValue) => setAktivitasSales(newValue.value)}
                            options={[
                                { value: 'prospek', label: 'Prospek' }
                            ]}
                            placeholder="Pilih  keterangan Aktivitas"
                        />
                        <div className="mb-3 flex flex-col ">
                            <label htmlFor="dokumentasi" className="text-black  text-[20px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">
                                Dokumentasi
                            </label>
                            <input
                                type="file"
                                id="dokumentasi"
                                className="mt-1 pl- py-1 w-full rounded-md mb-1 sm:px-10 sm:gap-0 gap-6"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='flex gap-3 sm:justify-end justify-center mt-8 sm:mr-5'>

                    <button onClick={handleSubmit} disabled={loading}>
                        <div className="sm:mt-10 mt-1 mb-6 flex justify-center">
                            <div className="cursor-pointer hover:bg-[#467bac] bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg">
                                <p className="font-medium text-white text-semibold">{loading ? "Loading..." : "Tambah"}</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default inputdata;