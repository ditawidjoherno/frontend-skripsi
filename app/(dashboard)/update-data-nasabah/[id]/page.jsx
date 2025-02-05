"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Input from "../_components/Input";
import Dropdown from "../_components/dropdown";
import Button from "../_components/button";
import useUpdateNasabah from "@/hooks/update-nasabah";
import useProfileNasabah from "@/hooks/use-profile-nasabah";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { loading: fetchLoading, error: fetchError, data, getUserData } = useProfileNasabah(id);
  const { updateNasabah } = useUpdateNasabah();

  const [updatedNama, setUpdatedNama] = useState("");
  const [updatedAlamat, setUpdatedAlamat] = useState("");
  const [updatedNomorHP, setUpdatedNomorHP] = useState("");
  const [updatedTipeNasabah, setUpdatedTipeNasabah] = useState("");
  const [updatedJenisKelamin, setUpdatedJenisKelamin] = useState("");
  const [updatedAgama, setUpdatedAgama] = useState("");
  const [updatedTanggalLahir, setUpdatedTanggalLahir] = useState("");
  const [updatedStatusPernikahan, setUpdatedStatusPernikahan] = useState("");
  const [updatedKeterangan, setUpdatedKeterangan] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const statusNasabahOptions = [
    { value: "eksisting", label: "Nasabah Eksisting" },
    { value: "baru", label: "Nasabah Baru" },
  ];

  const genderOptions = [
    { value: "laki-laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  const religionOptions = [
    { value: "Islam", label: "Islam" },
    { value: "Kristen", label: "Kristen" },
    { value: "Katolik", label: "Katolik" },
    { value: "Hindu", label: "Hindu" },
    { value: "Buddha", label: "Budha" },
    { value: "Khonghucu", label: "Khonghucu" },
  ];

  const maritalStatusOptions = [
    { value: "belum menikah", label: "Belum Menikah" },
    { value: "menikah", label: "Menikah" },
    { value: "bercerai", label: "Bercerai" },
  ];

  useEffect(() => {
    if (data) {
      setUpdatedNama(data.nama);
      setUpdatedAlamat(data.alamat);
      setUpdatedNomorHP(data.nomor_telepon);
      setUpdatedTipeNasabah(data.tipe_nasabah);
      setUpdatedJenisKelamin(data.jenis_kelamin);
      setUpdatedAgama(data.agama);
      setUpdatedTanggalLahir(data.tanggal_lahir);
      setUpdatedStatusPernikahan(data.status_pernikahan);
      //   setUpdatedKeterangan(data.keterangan);
    }
  }, [data]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const body = {
        nama: updatedNama,
        alamat: updatedAlamat,
        nomor_telepon: updatedNomorHP,
        tipe_nasabah: updatedTipeNasabah,
        jenis_kelamin: updatedJenisKelamin,
        agama: updatedAgama,
        tanggal_lahir: updatedTanggalLahir,
        status_pernikahan: updatedStatusPernikahan,
        keterangan: updatedKeterangan,
      };

      if (!id) {
        throw new Error("ID Nasabah tidak ditemukan.");
      }

      await updateNasabah(id, body);
      setModalMessage("Berhasil Memperbarui Nasabah!");
      setModalType("success");
      setModalVisible(true);
    } catch (error) {
      setError(error.message || "Gagal Memperbarui Data!");
      setModalType("error");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false); 
  };
  

  const handleGoBack = () => {
    router.back();
  };

  if (fetchLoading || !data) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  return (
    <div className="bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10">
      <div className="flex items-center w-full">
        <h2 className="sm:text-3xl text-[24px] sm:ml-5 ml-2 font-bold sm:mt-3 sm:mb-3 mb-1">Update Data Nasabah</h2>
        <div>
          <IoIosArrowDropleftCircle
            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
            onClick={handleGoBack}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-2">
        <div className="sm:flex sm:ml-0 ml-2 sm:mr-0 mr-2">
          <div className="sm:w-1/2 w-full">
            <Input
              text="Nama Nasabah"
              value={updatedNama}
              onChange={(e) => setUpdatedNama(e.target.value)}
              placeholder="Masukkan Nama Nasabah"
            />
            <Input
              text="Alamat"
              value={updatedAlamat}
              onChange={(e) => setUpdatedAlamat(e.target.value)}
              placeholder="Masukkan Alamat"
            />
            <Input
              text="Nomor Telepon"
              value={updatedNomorHP}
              onChange={(e) => setUpdatedNomorHP(e.target.value)}
              placeholder="Masukkan Nomor Telepon"
            />
            <Dropdown
              text="Tipe Nasabah"
              value={updatedTipeNasabah}
              onChange={(selectedOption) => setUpdatedTipeNasabah(selectedOption.value)}
              options={statusNasabahOptions}
            />
          </div>
          <div className="sm:w-1/2 w-full">
            <Dropdown
              text="Jenis Kelamin"
              value={updatedJenisKelamin}
              onChange={(selectedOption) => setUpdatedJenisKelamin(selectedOption.value)}
              options={genderOptions}
            />
            <Dropdown
              text="Agama"
              value={updatedAgama}
              onChange={(selectedOption) => setUpdatedAgama(selectedOption.value)}
              options={religionOptions}
            />
            <Dropdown
              text="Status Pernikahan"
              value={updatedStatusPernikahan}
              onChange={(selectedOption) => setUpdatedStatusPernikahan(selectedOption.value)}
              options={maritalStatusOptions}
            />
            <Input
              text="Tanggal Lahir"
              value={updatedTanggalLahir}
              onChange={(e) => setUpdatedTanggalLahir(e.target.value)}
              placeholder="Masukkan Tanggal Lahir"
            />
            {/* <Input
              text="Keterangan"
              value={updatedKeterangan}
              onChange={(e) => setUpdatedKeterangan(e.target.value)}
              placeholder="Masukkan Keterangan"
            /> */}
          </div>
        </div>
        <div className='flex gap-3 sm:justify-end justify-center mt-8 sm:mr-5'>
          <button onClick={handleSubmit} disabled={loading}>
            <div className="sm:mt-10 mt-1 mb-6 flex justify-center">
              <div className="cursor-pointer hover:bg-[#467bac] bg-[#5293CE] items-center justify-center sm:w-[170px] w-[130px] h-[40px] flex rounded-lg sm:text-base text-xs">
                <p className="font-medium text-white text-semibold">{loading ? "Loading..." : "Simpan"}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
            <h3 className={`text-xl font-semibold ${modalType === "success" ? "text-green-600" : "text-red-600"}`}>
              {modalType === "success" ? "Berhasil!" : "Gagal"}
            </h3>
            <p className="mt-4 text-lg">{modalMessage}</p>
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
