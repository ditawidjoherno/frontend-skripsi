"use client";
import React, { useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from './_components/Input';
import Button from './_components/button';
import Dropdown from './_components/dropdown';
import DateInput from './_components/Date';
import useAddNasabah from '@/hooks/use-nasabah';
import { useRouter } from 'next/navigation';

const Page = () => {
    const router = useRouter();

    const [maritalStatus, setMaritalStatus] = useState("");
    const [hasChildren, setHasChildren] = useState(false);
    const [numberOfChildren, setNumberOfChildren] = useState(0);
    const [showSpouseData, setShowSpouseData] = useState(false);
    const [childrenData, setChildrenData] = useState([]);
    const { loading, error, data, addNasabah } = useAddNasabah();

    const [selectedOptions1, setSelectedOptions1] = useState('option1'); // inisialisasi selectedOptions1

    const statusnasabah = [
        { value: 'option1', label: 'Pilih Status Nasabah' },
        { value: 'eksisting', label: 'Nasabah Eksisting' },
        { value: 'baru', label: 'Nasabah Baru' },
    ];

    const jeniskelamin = [
        { value: 'perempuan', label: 'Perempuan' },
        { value: 'laki-laki', label: 'Laki-laki' }
    ];

    const agama = [
        { value: 'islam', label: 'Islam' },
        { value: 'kristen', label: 'Kristen' },
        { value: 'katolik', label: 'Katolik' },
        { value: 'hindu', label: 'Hindu' },
        { value: 'budha', label: 'Budha' },
        { value: 'khonghucu', label: 'Khonghucu' }
    ];

    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };


    const handleStatusNasabah = (selectedOption) => {
        setNasabahData({
            ...nasabahData,
            tipe_nasabah: selectedOption.value
        });
    };


    const handleJenisKelamin = (selectedOption) => {
        setNasabahData({
            ...nasabahData,
            jenis_kelamin: selectedOption.value
        });
    };

    const handleAgama = (selectedOption) => {
        setNasabahData({
            ...nasabahData,
            agama: selectedOption.value
        });
    };


    const handleMaritalStatusChange = (event) => {
        const selectedStatus = event.target.value;
        setNasabahData({
            ...nasabahData,
            status_pernikahan: selectedStatus
        });
        setNumberOfChildren(0);
        setHasChildren(false);
        if (nasabahData.status_pernikahan === "menikah") {
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
        setNasabahData({
            ...nasabahData,
            memiliki_anak: event.target.checked
        });
        if (!event.target.checked) {
            setNumberOfChildren(0);
            setChildrenData([]);
        }
    };

    const [nasabahData, setNasabahData] = useState({
        nama: '',
        tipe_nasabah: selectedOptions1,
        nomor_telepon: '',
        alamat: '',
        jenis_kelamin: '',
        agama: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        pekerjaan: '',
        alamat_pekerjaan: '',
        estimasi_penghasilan_bulanan: '',
        key_person: '',
        status_pernikahan: maritalStatus,
        memiliki_anak: false,
        jumlah_anak: 0,
        data_pasangan: {
            nama: '',
            nomor_telepon: '',
            alamat: '',
            jenis_kelamin: '',
            agama: '',
            tempat_lahir: '',
            tanggal_lahir: '',
            pekerjaan: '',
            alamat_pekerjaan: '',
            estimasi_penghasilan_bulanan: '',
        },
        data_anak: [],
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "nomor_telepon") {
            newValue = value.replace(/\D/g, '');
        }

        if (name === "estimasi_penghasilan_bulanan") {
            newValue = newValue.replace(/[^\d.]/g, '');

            newValue = newValue.replace(/\./g, '');

            newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

            if (!newValue.startsWith("Rp")) {
                newValue = "Rp" + newValue;
            }
        }

        if (name === "nama") {
            const capitalizeWords = (str) => {
                return str.replace(/\b\w/g, (char) => char.toUpperCase());
            };
            newValue = capitalizeWords(newValue);
        }

        setNasabahData({ ...nasabahData, [name]: newValue });
    };



    const handleInputJumlahAnakChange = (e) => {
        const { name, value } = e.target;

        setNasabahData(prevData => {
            const numValue = parseInt(value, 10);

            const newData = { ...prevData, [name]: numValue };

            if (name === 'jumlah_anak') {
                const numChildren = numValue || 0; 
                if (numChildren > prevData.data_anak.length) {
                    const diff = numChildren - prevData.data_anak.length;
                    const newDataAnak = Array.from({ length: diff }, () => ({
                        nama: '',
                        nomor_telepon: '',
                        alamat: '',
                        jenis_kelamin: '',
                        agama: '',
                        tempat_lahir: '',
                        tanggal_lahir: '',
                        pekerjaan: '',
                        alamat_pekerjaan: '',
                        estimasi_penghasilan_bulanan: '',
                    }));
                    newData.data_anak = [...prevData.data_anak, ...newDataAnak];
                } else if (numChildren < prevData.data_anak.length) {
                    newData.data_anak = prevData.data_anak.slice(0, numChildren);
                }
            }

            return newData;
        });
    };



    const handleChildInputChange = (index, e) => {
        const { name, value } = e.target;

        if (name === "nomor_telepon") {
            const newValue = value.replace(/\D/g, '');

            const newDataAnak = [...nasabahData.data_anak];
            newDataAnak[index][name] = newValue;
            setNasabahData({ ...nasabahData, data_anak: newDataAnak });
        } else if (name === "estimasi_penghasilan_bulanan") {
            let newValue = value;

            newValue = newValue.replace(/[^\d.]/g, '');

            newValue = newValue.replace(/\./g, '');

            newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

            if (!newValue.startsWith("Rp")) {
                newValue = "Rp" + newValue;
            }

            const newDataAnak = [...nasabahData.data_anak];
            newDataAnak[index][name] = newValue;
            setNasabahData({ ...nasabahData, data_anak: newDataAnak });
        } else {
            const newDataAnak = [...nasabahData.data_anak];
            newDataAnak[index][name] = value;
            setNasabahData({ ...nasabahData, data_anak: newDataAnak });
        }
    };




    const handlePasanganInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "nomor_telepon") {
            newValue = value.replace(/\D/g, '');
        }

        if (name === "estimasi_penghasilan_bulanan") {
            newValue = newValue.replace(/[^\d.]/g, '');

            newValue = newValue.replace(/\./g, '');

            newValue = newValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

            if (!newValue.startsWith("Rp")) {
                newValue = "Rp" + newValue;
            }
        }

        setNasabahData({
            ...nasabahData,
            data_pasangan: {
                ...nasabahData.data_pasangan,
                [name]: newValue,
            },
        });
    };


    const handleAddChild = () => {
        setNasabahData({
            ...nasabahData,
            data_anak: [
                ...nasabahData.data_anak,
                {
                    nama: '',
                    nomor_telepon: '',
                    alamat: '',
                    jenis_kelamin: '',
                    agama: '',
                    tempat_lahir: '',
                    tanggal_lahir: '',
                    pekerjaan: '',
                    alamat_pekerjaan: '',
                    estimasi_penghasilan_bulanan: '',
                }
            ]
        })
    }

    const handleRemoveChild = (index) => {
        const newDataAnak = [...nasabahData.data_anak];
        newDataAnak.splice(index, 1);
        setNasabahData({ ...nasabahData, data_anak: newDataAnak });
    };

    const handleSubmit = async () => {
        let newData = { ...nasabahData };


        if (!nasabahData.estimasi_penghasilan_bulanan.startsWith("Rp")) {
            newData = {
                ...nasabahData,
                estimasi_penghasilan_bulanan: "Rp" + nasabahData.estimasi_penghasilan_bulanan
            };
        }

        if (nasabahData.status_pernikahan !== "menikah") {
            newData = {
                ...newData,
                data_pasangan: {}
            };
        }

        await addNasabah(newData);
    };

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
            <div className="flex items-center w-full">
                <h2 className="sm:text-[35px] text-[24px] sm:ml-5 ml-4 font-semibold">
                    Input Data Nasabah
                </h2>
                <IoIosArrowDropleftCircle
                    className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
                    onClick={handleGoBack}
                />
            </div>
            <div className="bg-white rounded-2xl h-auto mt-2 sm:ml-5 ml-3 w-full sm:pt-5 pt-6">
                <div className='sm:flex '>
                    <div className='sm:w-1/2 sm:mt-0 -mt-6 sm:ml-0 ml-2 sm:mr-0 -mr-2'>
                        <Input text={"Nama Nasabah"} placeholder={"Masukkan Nama Nasabah"} name="nama" value={nasabahData.nama} onChange={handleInputChange} />
                        <div className="flex flex-col ">
                            <label htmlFor="dropdown" className="text-black sm:text-[20px] text-[20px] font-medium mb-1 sm:px-10 pt-3">
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
                        <Input text={"Alamat"} placeholder={"Masukkan Alamat"} name="alamat" value={nasabahData.alamat} onChange={handleInputChange} />
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-[20px] font-medium sm:mb-1 -mb-1 sm:px-10 flex items-center sm:mt-3 mt-3 sm:pb-0 pb- ">
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
                        <label htmlFor="dropdown" className="text-black sm:text-[20px] text-[20px] font-medium flex sm:mb-1 -mb-1 sm:px-10 pt-3">
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
                        <Input text={"Tempat Lahir"} placeholder={"Masukkan Tipe Nasabah"} name="tempat_lahir" value={nasabahData.tempat_lahir} onChange={handleInputChange} />
                        <div className="">
                            <DateInput text="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" name="tanggal_lahir" value={nasabahData.tanggal_lahir} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className='sm:w-1/2 w-full sm:ml-0 ml-2 '>
                        <Input text={"Nomor Telepon"} placeholder={"Masukkan Nominal Prospek"} name="nomor_telepon" value={nasabahData.nomor_telepon} onChange={handleInputChange} />
                        <div>

                            <label htmlFor="maritalStatus" className="flex items-center text-black sm:text-[20px] text-[20px] font-medium sm:mb-1 -mb-3 sm:px-10 sm:pt-3 pt-4">Status Pernikahan</label>
                            <div className='sm:px-10 pt-3 sm:mr-0 mr-3'>
                                <select id="maritalStatus" value={nasabahData.status_pernikahan} onChange={handleMaritalStatusChange} isSearchable={true} className="flex gap-2 w-full px-5 py-1 items-center rounded-sm border border-gray-300 focus:outline-none  bg-[#D9D9D9]" name="status_pernikahan">
                                    <option value="" className='bg-white sm:text-[20px] text-[12px]'>Pilih Status Pernikahan</option>
                                    <option value="belum menikah" className='bg-white sm:text-[20px] text-[12px]'>Belum Menikah</option>
                                    <option value="menikah" className='bg-white sm:text-[20px] text-[12px]'>Menikah</option>
                                    <option value="bercerai" className='bg-white sm:text-[20px] text-[12px]'>Bercerai</option>
                                </select>
                            </div>
                        </div>


                        <Input text={"Data Pekerjaan / Usaha"} placeholder={"Masukkan Pekerjaan"} name="pekerjaan" value={nasabahData.pekerjaan} onChange={handleInputChange} />
                        <Input text={"Alamat Pekerjaan / Usaha"} placeholder={"Masukkan Key Person"} name="alamat_pekerjaan" value={nasabahData.alamat_pekerjaan} onChange={handleInputChange} />
                        <Input text={"Estimasi Penghasilan Bulanan"} placeholder={"Masukkan Estimasi Penghasilan Bulanan"} name="estimasi_penghasilan_bulanan" value={nasabahData.estimasi_penghasilan_bulanan} onChange={handleInputChange} />
                        <Input text={"Key Person"} placeholder={"Masukkan Key Person"} name="key_person" value={nasabahData.key_person} onChange={handleInputChange} />

                        {nasabahData.status_pernikahan === "menikah" ? (
                            <div className='sm:px-10 pt-4 sm:mr-0 mr-1 items-center'>
                                <label htmlFor="hasChildren" className='text-black sm:text-[20px] text-[20px] font-medium mb-1'>Memiliki Anak?</label>
                                <br />
                                <input type="checkbox" id="hasChildren" checked={nasabahData.memiliki_anak} onChange={handleHasChildrenChange} className="form-checkbox h-5 w-5 mr-3 text-indigo-600" />
                                <label htmlFor="hasChildren" className='text-black sm:text-[20px] text-[20px] font-medium mb-1'>Ya</label>
                            </div>
                        ) : null}
                        {nasabahData.memiliki_anak && (
                            <div className='sm:px-10 pt-4 items-center sm:mr-0 mr-3'>
                                <label htmlFor="numberOfChildren" className='text-black sm:text-[20px] text-[20px] font-medium mb-1'>Jumlah Anak</label>
                                <br />
                                <input type="number" id="numberOfChildren" name='jumlah_anak' value={nasabahData.jumlah_anak} onChange={handleInputJumlahAnakChange} className="flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm" />
                            </div>
                        )}

                    </div>
                </div>
                <div className='flex gap-3 justify-end mt-8 sm:mr-5 mr-20'>
                </div>
            </div>

            {nasabahData.status_pernikahan === "menikah" && (
                <div className="items-center mr-6 w-full sm:pr-0 -pr-3">
                    <h2 className="sm:text-[35px] text-[24px] ml-7 font-semibold">
                        Input Data Pasangan Nasabah
                    </h2>
                    <div className="bg-white sm:pl-0 pl-5 rounded-2xl h-auto mb-6 mt-2 sm:ml-5 ml-5 w-full sm:pt-5 pt-1 ">
                        <div className='sm:flex sm:ml-0 -ml-[12px] sm:mr-0 -mr-2'>
                            <div className='sm:w-1/2 w-full'>
                                <Input text={"Nama Nasabah"} placeholder={"Masukkan Nama Nasabah"} name="nama" value={nasabahData.data_pasangan.nama} onChange={handlePasanganInputChange} />
                                <Input text={"Alamat"} placeholder={"Masukkan Alamat"} name="alamat" value={nasabahData.data_pasangan.alamat} onChange={handlePasanganInputChange} />
                                <label htmlFor="maritalStatus" className="flex items-center text-black sm:text-[20px] text-[20px] font-medium sm:mb-1 -mb-3 sm:px-10 sm:pt-3 pt-4">Jenis Kelamin</label>
                                <div className='sm:px-10 pt-3 sm:mr-0 mr-3'>
                                    <select id="maritalStatus" name="jenis_kelamin" value={nasabahData.data_pasangan.jenis_kelamin} onChange={handlePasanganInputChange} isSearchable={true} className="flex gap-2 w-full px-5 py-1 items-center rounded-sm border border-gray-300 focus:outline-none  bg-[#D9D9D9]">
                                        <option value="" className='bg-white sm:text-[20px] text-[12px]'>Pilih Jenis Kelamin</option>
                                        <option value="laki-laki" className='bg-white sm:text-[20px] text-[12px]'>Laki-laki</option>
                                        <option value="perempuan" className='bg-white sm:text-[20px] text-[12px]'>Perempuan</option>
                                    </select>
                                </div>
                                <label htmlFor="maritalStatus" className="flex items-center text-black sm:text-[20px] text-[20px] font-medium sm:mb-1 -mb-3 sm:px-10 sm:pt-3 pt-4">Agama</label>
                                <div className='sm:px-10 pt-3 sm:mr-0 mr-3'>
                                    <select id="maritalStatus" name="agama" value={nasabahData.data_pasangan.agama} onChange={handlePasanganInputChange} isSearchable={true} className="flex gap-2 w-full px-5 py-1 items-center rounded-sm border border-gray-300 focus:outline-none  bg-[#D9D9D9]">
                                        <option value="" className='bg-white sm:text-[20px] text-[12px]'>Pilih Agama</option>
                                        <option value="islam" className='bg-white sm:text-[20px] text-[12px]'>islam</option>
                                        <option value="katolik" className='bg-white sm:text-[20px] text-[12px]'>katolik</option>
                                        <option value="kristen" className='bg-white sm:text-[20px] text-[12px]'>kristen</option>
                                        <option value="hindu" className='bg-white sm:text-[20px] text-[12px]'>hindu</option>
                                        <option value="budha" className='bg-white sm:text-[20px] text-[12px]'>budha</option>
                                        <option value="khonghucu" className='bg-white sm:text-[20px] text-[12px]'>khonghucu</option>
                                    </select>
                                </div>
                                <Input text={"Tempat Lahir"} placeholder={"Masukkan Tempat Lahir"} name="tempat_lahir" value={nasabahData.data_pasangan.tempat_lahir} onChange={handlePasanganInputChange} />
                                <div className="">
                                    <DateInput text="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" name="tanggal_lahir" value={nasabahData.data_pasangan.tanggal_lahir} onChange={handlePasanganInputChange} />
                                </div>
                            </div>
                            <div className='sm:w-1/2 w-full'>
                                <Input text={"Nomor Telepon"} placeholder={"Masukkan Nominal Prospek"} name="nomor_telepon" value={nasabahData.data_pasangan.nomor_telepon} onChange={handlePasanganInputChange} />
                                <Input text={"Data Pekerjaan / Usaha"} placeholder={"Masukkan Closing"} name="pekerjaan" value={nasabahData.data_pasangan.pekerjaan} onChange={handlePasanganInputChange} />
                                <Input text={"Alamat Pekerjaan / Usaha"} placeholder={"Masukkan Key Person"} name="alamat_pekerjaan" value={nasabahData.data_pasangan.alamat_pekerjaan} onChange={handlePasanganInputChange} />
                                <Input text={"Estimasi Penghasilan Bulanan"} placeholder={"Masukkan Estimasi Penghasilan Bulanan"} name="estimasi_penghasilan_bulanan" value={nasabahData.data_pasangan.estimasi_penghasilan_bulanan} onChange={handlePasanganInputChange} />
                            </div>
                        </div>
                        <div className='flex gap-3 justify-end mt-8 sm:mr-5 mr-20'>
                        </div>
                    </div>
                </div>
            )}

            {nasabahData.data_anak.length > 0 && (
                <div className="items-center mr-6 w-full  ">
                    {nasabahData.data_anak.map((child, index) => (
                        <div key={index} text={`Nama Anak ${index + 1}`}>
                            <h2 className="sm:text-[35px] text-[24px] sm:ml-7 ml-7 font-semibold"  >Input Data Anak ke-{index + 1} Nasabah</h2>
                            <div key={index} className="bg-white rounded-2xl h-auto mb-2 mt-2 sm:ml-5 ml-5 w-full sm:pt-5 pt-1">
                                <div className='sm:flex'>
                                    <div className='sm:w-1/2 w-full sm:ml-0 ml-2'>
                                        <Input text={"Nama Nasabah"} placeholder={"Masukkan Nama Nasabah"} name="nama" value={child.nama} onChange={(e) => handleChildInputChange(index, e)} />
                                        <Input text={"Alamat"} placeholder={"Masukkan Alamat"} name="alamat" value={child.alamat} onChange={(e) => handleChildInputChange(index, e)} />
                                        <label htmlFor="maritalStatus" className="flex items-center text-black sm:text-[20px] text-[20px] font-medium sm:mb-1 -mb-3 sm:px-10 sm:pt-3 pt-4">Jenis Kelamin</label>
                                        <div className='sm:px-10 pt-3 sm:mr-0 mr-3'>
                                            <select id="maritalStatus" name="jenis_kelamin" value={child.jenis_kelamin} onChange={(e) => handleChildInputChange(index, e)} isSearchable={true} className="flex gap-2 w-full px-5 py-1 items-center rounded-sm border border-gray-300 focus:outline-none  bg-[#D9D9D9]">
                                                <option value="" className='bg-white sm:text-[20px] text-[12px]'>Pilih Jenis Kelamin</option>
                                                <option value="laki-laki" className='bg-white sm:text-[20px] text-[12px]'>Laki-laki</option>
                                                <option value="perempuan" className='bg-white sm:text-[20px] text-[12px]'>Perempuan</option>
                                            </select>
                                        </div>
                                        <label htmlFor="maritalStatus" className="flex items-center text-black sm:text-[20px] text-[20px] font-medium sm:mb-1 -mb-3 sm:px-10 sm:pt-3 pt-4">Agama</label>
                                        <div className='sm:px-10 pt-3 sm:mr-0 mr-3'>
                                            <select id="maritalStatus" name="agama" value={child.agama} onChange={(e) => handleChildInputChange(index, e)} isSearchable={true} className="flex gap-2 w-full px-5 py-1 items-center rounded-sm border border-gray-300 focus:outline-none  bg-[#D9D9D9]">
                                                <option value="" className='bg-white sm:text-[20px] text-[12px]'>Pilih Agama</option>
                                                <option value="islam" className='bg-white sm:text-[20px] text-[12px]'>islam</option>
                                                <option value="katolik" className='bg-white sm:text-[20px] text-[12px]'>katolik</option>
                                                <option value="kristen" className='bg-white sm:text-[20px] text-[12px]'>kristen</option>
                                                <option value="hindu" className='bg-white sm:text-[20px] text-[12px]'>hindu</option>
                                                <option value="budha" className='bg-white sm:text-[20px] text-[12px]'>budha</option>
                                                <option value="khonghucu" className='bg-white sm:text-[20px] text-[12px]'>khonghucu</option>
                                            </select>
                                        </div>
                                        <Input text={"Tempat Lahir"} placeholder={"Masukkan Tipe Nasabah"} name="tempat_lahir" value={child.tempat_lahir} onChange={(e) => handleChildInputChange(index, e)} />
                                        <div className="">
                                            <DateInput text="Tanggal Lahir" placeholder="Masukkan Tanggal Lahir" name="tanggal_lahir" value={child.tanggal_lahir} onChange={(e) => handleChildInputChange(index, e)} />
                                        </div>
                                    </div>
                                    <div className='sm:w-1/2 w-full sm:ml-0 ml-2'>
                                        <Input text={"Nomor Telepon"} placeholder={"Masukkan No Telp"} name="nomor_telepon" value={child.nomor_telepon} onChange={(e) => handleChildInputChange(index, e)} />
                                        <Input text={"Data Pekerjaan / Usaha"} placeholder={"Masukkan Pekerjaan"} name="pekerjaan" value={child.pekerjaan} onChange={(e) => handleChildInputChange(index, e)} />
                                        <Input text={"Alamat Pekerjaan / Usaha"} placeholder={"Masukkan Alamat Pekerjaan"} name="alamat_pekerjaan" value={child.alamat_pekerjaan} onChange={(e) => handleChildInputChange(index, e)} />
                                        <Input text={"Estimasi Penghasilan Bulanan"} placeholder={"Masukkan Estimasi Penghasilan Bulanan"} name="estimasi_penghasilan_bulanan" value={child.estimasi_penghasilan_bulanan} onChange={(e) => handleChildInputChange(index, e)} />
                                    </div>
                                </div>
                                <div className='flex gap-3 justify-end mt-8 sm:mr-5 mr-20'>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}



            <div className='flex gap-3 sm:justify-end justify-center sm:mt-1 mt-4 sm:mr-5'>
                <Button
                    text={loading ? "Loading" : "Tambah"}
                    onClick={handleSubmit}
                    disabled={loading}
                />
            </div>
        </div>
    )
}

export default Page;