"use client"
import React, { useState, useEffect } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from '../_components/Input';
import Dropdown from '../_components/Dropdown';
import updateAktivitas from '@/hooks/update-aktivitas';
import useDetailAktivitas from "@/hooks/use-detail-aktivitas";
import { useParams } from 'next/navigation';
import Link from "next/link";
import SuccessMessage from '../_components/popup';



const Page = ({ }) => {
    const { id } = useParams();
    const { error, data, getUserData } = useDetailAktivitas(id);
    const [updatedNama, setUpdatedNama] = useState('');
    const [updatedAlamat, setUpdatedAlamat] = useState('');
    const [updatedNomorHP, setUpdatedNomorHP] = useState('');
    const [updatedTipeNasabah, setUpdatedTipeNasabah] = useState('');
    const [updatedProspek, setUpdatedProspek] = useState('');
    const [updatedNominalProspek, setUpdatedNominalProspek] = useState('');
    const [updatedAktivitasSales, setUpdatedAktivitasSales] = useState('');
    const [updatedClosing, setUpdatedClosing] = useState('');
    const [updatedStatusAktivitas, setUpdatedStatusAktivitas] = useState('');
    const [updatedKeteranganAktivitas, setUpdatedKeteranganAktivitas] = useState('');
    const [updatedAktivitas, setUpdatedAktivitas] = useState('');
    const [isDataUpdated, setIsDataUpdated] = useState(false);
    const [loading, setLoading] = useState(false);


    const { updateData } = updateAktivitas();

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (data) {
            setUpdatedNama(data.nama_nasabah);
            setUpdatedAlamat(data.alamat);
            setUpdatedNomorHP(data.nomor_hp_nasabah);
            setUpdatedTipeNasabah(data.tipe_nasabah);
            setUpdatedProspek(data.prospek);
            setUpdatedNominalProspek(data.nominal_prospek);
            setUpdatedAktivitasSales(data.aktivitas_sales);
            setUpdatedClosing(data.closing);
            setUpdatedStatusAktivitas(data.status_aktivitas);
            setUpdatedKeteranganAktivitas(data.keterangan_aktivitas);
            setUpdatedAktivitas(data.nama_aktivitas)
        }
    }, [data]);

    console.log(data)

    const handleSubmit =  async () => {
        setLoading(true);

        const updatedDataAktivitas = {
            nama_nasabah: updatedNama,
            alamat: updatedAlamat,
            nomor_hp_nasabah: updatedNomorHP,
            tipe_nasabah: updatedTipeNasabah,
            prospek: updatedProspek,
            nominal_prospek: updatedNominalProspek,
            aktivitas_sales: updatedAktivitasSales.value,
            closing: updatedClosing,
            status_aktivitas: updatedStatusAktivitas.value,
            keterangan_aktivitas: updatedKeteranganAktivitas.value,
            nama_aktivitas: updatedAktivitas.value
        };
        try {
            await updateData(id, data.tanggal_aktivitas, updatedDataAktivitas);
            setIsDataUpdated(true);
        } catch (error) {
            console.error("Gagal memperbarui data:", error);
        }
        finally {
            setLoading(false);
        }
    };


    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Data not found</div>;

    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-3xl text-[24px] sm:ml-5 ml-2 font-bold sm:mt-3 sm:mb-3 mb-1">
                    Input Data Harian
                </h2>
                <Link href="/data-aktivitas">
                <IoIosArrowDropleftCircle className="sm:h-10 h-6 sm:w-10 w-10 sm:ml-3 ml-1" />
                </Link>
            </div>
            {isDataUpdated && <SuccessMessage onClose={() => setIsDataUpdated(false)} />}
            <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4">
                <div className='sm:flex sm:ml-0 ml-1 sm:mr-0 mr-2'>
                    <div className='sm:flex sm:ml-0 w-full ml-1 sm:mr-0 mr-2'>
                        <div className='sm:w-1/2 w-full'>
                            <Input
                                text={"Nama Nasabah"}
                                value={updatedNama}
                                onChange={(e) => setUpdatedNama(e.target.value)}
                                placeholder={"Masukkan Nama Nasabah"}
                                disabled
                            />
                            <Input text={"Alamat"} value={updatedAlamat} onChange={(e) => setUpdatedAlamat(e.target.value)} placeholder={"Masukkan Alamat"} />
                            <Input text={"Nomor Telepon"} value={updatedNomorHP} onChange={(e) => setUpdatedNomorHP(e.target.value)} placeholder={"Masukkan Nomor Telepon"} />
                            <Dropdown
                                text={"Aktivitas"}
                                value={updatedAktivitas}
                                onChange={(newValue) => setUpdatedAktivitas(newValue)}
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
                            <Dropdown
                                text={"Tipe Nasabah"}
                                value={updatedTipeNasabah}
                                onChange={(newValue) => setUpdatedTipeNasabah(newValue)}
                                options={[
                                    { value: 'nasabah existing', label: 'Nasabah Eksisting' },
                                    { value: 'nasabah baru', label: 'Nasabah Baru' }
                                ]}
                                placeholder={"Pilih Tipe Nasabah"}
                            />
                            <Input text={"Prospek"} value={updatedProspek} onChange={(e) => setUpdatedProspek(e.target.value)} placeholder={"Masukkan Prospek"} />
                        </div>
                        <div className='sm:w-1/2 w-full'>
                            <Input text={"Nominal Prospek"} value={updatedNominalProspek} onChange={(e) => setUpdatedNominalProspek(e.target.value)} placeholder={"Masukkan Nominal Prospek"} />
                            <Input text={"Closing"} value={updatedClosing} onChange={(e) => setUpdatedClosing(e.target.value)} placeholder={"Masukkan Closing"} />
                            <Dropdown
                                text={"Status Aktivitas"}
                                value={updatedStatusAktivitas}
                                onChange={(newValue) => setUpdatedStatusAktivitas(newValue)}
                                options={[
                                    { value: '', label: 'Pilih Status Aktivitas' },
                                    { value: 'selesai', label: 'Selesai' },
                                    { value: 'ditunda', label: 'Ditunda' }
                                ]}
                                placeholder={"Pilih Status Aktivitas"}
                            />
                            <Dropdown
                                text={"Keterangan Aktivitas"}
                                value={updatedKeteranganAktivitas}
                                onChange={(newValue) => setUpdatedKeteranganAktivitas(newValue)}
                                options={[
                                    { value: 'diterima', label: 'Diterima' },
                                    { value: 'ditolak', label: 'Ditolak' }
                                ]}
                                placeholder={"Pilih Keterangan Aktivitas"}
                            />
                            <Dropdown
                                text={"Aktivitas Sales"}
                                value={updatedAktivitasSales}
                                onChange={(newValue) => setUpdatedAktivitasSales(newValue)}
                                options={[
                                    { value: 'prospek', label: 'Prospek' }
                                ]}
                                placeholder={"Pilih Jenis Aktivitas Sales"}
                            />
                        </div>
                    </div>

                </div>
                <div className='flex gap-3 sm:justify-end justify-center mt-8 sm:mr-5'>

                    <button onClick={handleSubmit} disabled={loading}>
                        <div className="sm:mt-10 mt-1 mb-6 flex justify-center">
                            <div className="cursor-pointer sm:bg-[#5293CE] bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg">
                                <p className="font-medium text-white text-semibold">{loading ? "Loading..." : "Tambah"}</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Page;

