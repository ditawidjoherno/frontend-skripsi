"use client";
import React, { useState, useEffect } from "react";
import { IoIosArrowDropleftCircle, IoIosClose } from "react-icons/io";
import Input from "../_components/Input";
import Dropdown from "../_components/Dropdown";
import useAktivitas from "@/hooks/update-aktivitas";
import useDetailAktivitas from "@/hooks/use-detail-aktivitas";
import { useParams } from "next/navigation";
import useNamaKpi from "@/hooks/use-nama-kpi";
import SuccessMessage from "../_components/popup";
import { useRouter } from "next/navigation";

const Page = ({ }) => {
  const router = useRouter();
  const { id } = useParams();
  const { error, data, getUserData } = useDetailAktivitas(id);
  const { updateAktivitas, tambahDokumentasi, hapusDokumentasi } = useAktivitas();
  const { data: dataKpi, getNamaKpi } = useNamaKpi();

  const [updatedNama, setUpdatedNama] = useState("");
  const [updatedAlamat, setUpdatedAlamat] = useState("");
  const [updatedNomorHP, setUpdatedNomorHP] = useState("");
  const [updatedTipeNasabah, setUpdatedTipeNasabah] = useState("");
  const [updatedProspek, setUpdatedProspek] = useState("");
  const [updatedNominalProspek, setUpdatedNominalProspek] = useState("");
  const [updatedAktivitasSales, setUpdatedAktivitasSales] = useState("");
  const [updatedClosing, setUpdatedClosing] = useState("");
  const [updatedStatusAktivitas, setUpdatedStatusAktivitas] = useState("");
  const [updatedKeteranganAktivitas, setUpdatedKeteranganAktivitas] = useState("");
  const [updatedAktivitas, setUpdatedAktivitas] = useState("");
  const [updatedDokumentasi, setUpdatedDokumentasi] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const [selectedKpi, setSelectedKpi] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const fetchNamaKpi = async () => {
      await getNamaKpi();
    };
    fetchNamaKpi();
  }, []);



  useEffect(() => {
    if (data) {
      setUpdatedNama(data.nama_nasabah);
      setUpdatedTipeNasabah(data.tipe_nasabah);
      setUpdatedProspek(data.prospek);
      setUpdatedNominalProspek(data.nominal_prospek);
      setUpdatedClosing(data.closing);
      setUpdatedStatusAktivitas(data.status_aktivitas);
      setUpdatedKeteranganAktivitas(data.keterangan_aktivitas);
      setUpdatedAktivitas(data.aktivitas);
      setUpdatedDokumentasi(data.dokumentasi || []);
    }
  }, [data]);

  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    console.log("New files:", newFiles); 
    if (newFiles) {
      setSelectedFiles(currentFiles => {
        console.log("Current files before update:", currentFiles); 
        const updatedFiles = [
          ...(Array.isArray(currentFiles) ? currentFiles : []),
          ...Array.from(newFiles)
        ];
        console.log("Updated files:", updatedFiles); 
        return updatedFiles;
      });
    }
  };



  const handleSubmit = async () => {
    setLoading(true);
  
    try {
      if (!id) {
        throw new Error("ID aktivitas tidak ditemukan.");
      }
  
      const body = {
        nama_nasabah: updatedNama,
        tipe_nasabah: updatedTipeNasabah,
        prospek: updatedProspek,
        nominal_prospek: updatedNominalProspek,
        closing: updatedClosing,
        status_aktivitas: updatedStatusAktivitas,
        keterangan_aktivitas: updatedKeteranganAktivitas,
        aktivitas: updatedAktivitas,
      };
  
      const formData = new FormData();
      if (selectedFiles && selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formData.append('dokumentasi[]', file);
        });
      }
  
      for (const key in body) {
        formData.append(key, body[key]);
      }
  
      let dokumentasiUrls = [];
      if (selectedFiles && selectedFiles.length > 0) {
        dokumentasiUrls = await tambahDokumentasi(id, formData);
        if (!dokumentasiUrls) {
          throw new Error("Gagal meng-upload dokumentasi. URL tidak tersedia.");
        }
      }
  
      body.dokumentasi = dokumentasiUrls;
  
      await updateAktivitas(id, body);
  
      setIsDataUpdated(true);
      setSuccess(true);
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  


  const handleGoBack = () => {
    router.back();
  };

  const handleDeleteDokumentasi = async (fileId) => {
    try {
        await hapusDokumentasi(id, fileId); 
        setUpdatedDokumentasi(currentDokumentasi => 
            currentDokumentasi.filter(doc => doc.id !== fileId)
        );
    } catch (error) {
        console.error("Gagal menghapus dokumentasi:", error);
        alert("Gagal menghapus dokumentasi.");
    }
};


  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles(currentFiles =>
      currentFiles.filter((_, index) => index !== indexToRemove)
    );
  };



  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-3xl text-[24px] sm:ml-5 ml-2 font-bold sm:mt-3 sm:mb-3 mb-1">Ubah Data Harian</h2>
        <div>
          <IoIosArrowDropleftCircle
            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
            onClick={handleGoBack}
          />
        </div>
      </div>
      {isDataUpdated && <SuccessMessage id={data.id} onClose={() => setIsDataUpdated(false)} />}
      <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4">
        <div className="sm:flex sm:ml-0 ml-1 sm:mr-0 mr-2">
          <div className="sm:flex sm:ml-0 w-full ml-1 sm:mr-0 mr-2">
            <div className="sm:w-1/2 w-full">
              <Input text={"Nama Nasabah"} value={updatedNama} onChange={(e) => setUpdatedNama(e.target.value)} placeholder={"Masukkan Nama Nasabah"} disabled />
              {/* <Input text={"Alamat"} value={updatedAlamat} onChange={(e) => setUpdatedAlamat(e.target.value)} placeholder={"Masukkan Alamat"} />
              <Input text={"Nomor Telepon"} value={updatedNomorHP} onChange={(e) => setUpdatedNomorHP(e.target.value)} placeholder={"Masukkan Nomor Telepon"} /> */}
              <label htmlFor="dropdown" className="text-black sm:text-[20px] text-[14px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6">Aktivitas Sales</label>
              {dataKpi && Array.isArray(dataKpi) && dataKpi.length > 0 && (
                <Dropdown
                  value={updatedAktivitas}
                  onChange={(selectedOption) => { setUpdatedAktivitas(selectedOption.value) }}
                  options={dataKpi.map(({ nama_kpi }) => ({
                    value: nama_kpi,
                    label: nama_kpi
                  }))}
                  placeholder="Pilih Aktivitas"
                />
              )}
              <Dropdown
                text={"Tipe Nasabah"}
                value={updatedTipeNasabah}
                onChange={(selectedOption) => { setUpdatedTipeNasabah(selectedOption.value) }}
                options={[{ value: "eksisting", label: "Nasabah Eksisting" }, { value: "baru", label: "Nasabah Baru" }]}
                placeholder="Pilih Tipe Nasabah"
              />
              <div className="mb-3 flex flex-col">
          <label
            htmlFor="dokumentasi"
            className="text-black sm:text-[20px] text-[14px] font-medium mb-1 sm:px-10 pt-3 sm:gap-0 gap-6"
          >
            Upload Dokumentasi
          </label>
          <input
            type="file"
            id="dokumentasi"
            className="mt-1 pl- py-1 w-full rounded-md mb-1 sm:px-10 sm:gap-0 gap-6"
            onChange={handleFileChange}
            multiple
          />
          <div className="mt-1 pl- py-1 w-full rounded-md mb-1 sm:px-10 sm:gap-0 gap-6">
            <ul>
              {selectedFiles && selectedFiles.length > 0 ? (
                <>
                  <li>Dokumentasi yang ditambahkan:</li>
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between">
                      {file.name}
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </li>
                  ))}
                </>
              ) : (
                <li>Belum ada dokumentasi yang ditambahkan</li>
              )}
            </ul>
          </div>
        </div>
            </div>
            <div className="sm:w-1/2 w-full">
              <Input
                text={"Prospek"}
                value={updatedProspek}
                onChange={(e) => setUpdatedProspek(e.target.value)}
                placeholder={"Masukkan Prospek"}
              />
              <Input
                text={"Nominal Prospek"}
                value={updatedNominalProspek}
                onChange={(e) => setUpdatedNominalProspek(e.target.value)}
                placeholder={"Masukkan Nominal Prospek"}
              />
              {/* <Input
                text={"Aktivitas Sales"}
                value={updatedAktivitasSales}
                onChange={(e) => setUpdatedAktivitasSales(e.target.value)}
                placeholder={"Masukkan Aktivitas Sales"}
              /> */}
              <div className="w-full">
                <Input
                  text={"Closing"}
                  value={updatedClosing}
                  onChange={(e) => setUpdatedClosing(e.target.value)}
                  placeholder={"Masukkan Closing"}
                />
                <Dropdown
                  text={"Status Aktivitas"}
                  value={updatedStatusAktivitas}
                  onChange={(selectedOption) => { setUpdatedStatusAktivitas(selectedOption.value) }}
                  options={[{ value: "selesai", label: "Selesai" }, { value: "ditunda", label: "Ditunda" }]}
                  placeholder="Pilih Status Aktivitas"
                />
                <Input
                  text={"Keterangan Aktivitas"}
                  value={updatedKeteranganAktivitas}
                  onChange={(e) => setUpdatedKeteranganAktivitas(e.target.value)}
                  placeholder={"Masukkan Keterangan Aktivitas"}
                />
        
              </div>
            </div>
          </div>
        </div>
        <div className="justify-end flex w-auto px-4 mr-5">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded text-md"
          >
            {loading ? "Loading..." : "Simpan"}
          </button>
        </div>
        <div className="sm:ml-5 ml-3 flex flex-col mt-6 mb-5">
          <h3 className=" sm:text-[20px] text-[14px] font-medium mb-3">Dokumentasi yang Diupload:</h3>
          <div className="grid grid-cols-3 gap-4">
            {updatedDokumentasi && updatedDokumentasi.length > 0 ? (
              updatedDokumentasi.map((doc, index) => (
                <div key={index} className="relative">
                  <img
                    src={`/storage/${doc.file_path}`}
                    alt={`Dokumentasi ${index + 1}`}
                    className="w-[300px] h-[300px] object-cover rounded-md"
                  />
                  <button
                    className="absolute top-1 right-1 bg-white rounded-full text-red-500 p-1 hover:bg-gray-200"
                    onClick={() => handleDeleteDokumentasi(doc.id)}
                  >
                    <IoIosClose className="sm:w-6 sm:h-6 w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <p>Tidak ada dokumentasi yang ditambahkan.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
