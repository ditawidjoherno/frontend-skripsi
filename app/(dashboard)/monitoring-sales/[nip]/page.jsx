"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from "../_components/TeksProfil";
import { useState, useEffect } from 'react';
import useNilaiKpi from "@/hooks/use-nilai-kpi";
import { useParams, useRouter } from 'next/navigation';
import useStaff from "@/hooks/use-staff";
import useUser from "@/hooks/use-user";
import axios from 'axios';
import { getCookie } from '@/lib/cookieFunction';
import { FaSpinner } from 'react-icons/fa';

const Page = () => {

  const router = useRouter()
  const { nip } = useParams()
  const { loading, error, data, getNilaiKpi } = useNilaiKpi();
  const { data: Staff, getUserData: getStaff } = useStaff();
  const { data: userData, getUserData: getDataUser } = useUser();
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie)
  const bearerToken = `Bearer ${token}`
  const [namaStaff, setNamaStaff] = useState()


  useEffect(() => {
    const fetchNamaStaff = async () => {
      const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/nama-staff-nip?nip=${nip}`, {
        headers: {
          Authorization: bearerToken
        }
      })

      setNamaStaff(response.data)
    }

    fetchNamaStaff();
  }, [bearerToken, nip])


  useEffect(() => {
    const fetchData = async () => {
      await getNilaiKpi(nip);
      await getStaff(nip);
      await getDataUser(nip);
    };

    fetchData();
  }, [nip]);

  if (!userData) {
    return;
  }

  const { jabatan } = userData;

  const handleTargetClick = () => {
    window.location.href = `/target-tahunan-staff?nip=${nip}`;
  };

  console.log(data)
  console.log(Staff)

  let totalNilaiKpi = 0;
  let jumlahBulan = 0;

  if (data && data.total_nilai_kpi) {
    const totalNilaiKpiStaf = Object.values(data.total_nilai_kpi).reduce((total, nilai) => total + nilai, 0);
    totalNilaiKpi += totalNilaiKpiStaf;
    jumlahBulan += Object.keys(data.total_nilai_kpi).length;
  }

  const rataRataNilaiKpi = jumlahBulan !== 0 ? parseInt(totalNilaiKpi / jumlahBulan) : 0;

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    if (string && typeof string === 'string' && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
      return string;
    }
  };

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-3xl text-[24px] font-bold sm:mt-[12px] sm:mb-3 mb-1 sm:ml-5 ml-2 ">
          Monitoring Sales
        </h2>
        <div>
          <IoIosArrowDropleftCircle
            className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-0 transition-colors duration-300 hover:text-gray-400 focus:text-gray-400 cursor-pointer"
            onClick={handleGoBack}
          />
        </div>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4 sm:pr-0 pr-1">
        <div className='sm:flex sm:ml-0 ml-1'>
          <div className="w-1/2 sm:flex sm:items-center sm:mt-[-10px] mt-[15px]">
            {namaStaff && (
              <img src={namaStaff.foto_profil || '/img/profil.png'} alt="Foto Profil" className="sm:w-[220px] w-[190px] sm:h-[220px] h-[190px] sm:ml-10 ml-20 sm:mt-[-20px] mt-[-10px] " />
            )}            <div className="w-full sm:mt-[-40px] mt-[20px] sm:text-left text-center sm:ml-0 ml-[80px]">
              {namaStaff && (
                <>
                  <TeksProfil label="Nama Staff" value={capitalizeFirstLetter(namaStaff.nama)} />
                  <TeksProfil label="Nip" value={capitalizeFirstLetter(namaStaff.nip)} />
                  <TeksProfil label="Jabatan" value={capitalizeFirstLetter(namaStaff.jabatan)} />
                </>
              )}
            </div>
          </div>
          <div className="sm:w-1/2 w-full h-auto sm:ml-10 ml-0 sm:mb-1 mb-29 sm:mt-[-2px] mt-6">
            <TeksProfil label="Sales Productivity" />
            <div className="w-full bg-red-600b">
              <button className="bg-[#6EE014] transition-all transform hover:bg-[#FFE500]  h-[35px] pt-30 mt-[px] ml-8 font-semibold" style={{ width: `${data ? (data.rata_rata_kpi / 130 * 400) : 0}px` }} >
              </button>
              <span className="top-[0%] text-sm transform translate-y(-100%) font-semibold">{data && data.rata_rata_kpi}%</span>
              <TeksProfil value="Ket:" />
              <TeksProfil value="Istimewa 110%-130%" />
              <TeksProfil value="Sangat Baik 100%-109%" />
              <TeksProfil value="Baik 95%-99%" />
              <TeksProfil value="Cukup 85%-94%" />
            </div >
          </div>
        </div>
        <div className="flex flex-col mt-[15px] sm:mr-[85px] mr-[70px]">
          {/* {jabatan !== 'admin' && (

            <button className="bg-[#d9d9d9] transition-all transform hover:bg-[#a9a7a7] sm:w-[220px] w-[200px] h-[35px] ml-auto px-10 pt-30 mt-[25px] font-medium sm:mr-20 mr-middle shadow-md" onClick={() => router.push(`/target-tahunan-staff?nip=${nip}`)}>
              Lihat Target
            </button>
          )} */}
          <button
            className="bg-[#d9d9d9] transition-all transform hover:bg-[#a9a7a7] sm:w-[220px] w-[200px] h-[35px] ml-auto px-10 pt-30 mt-[25px] font-medium sm:mr-20 mr-middle shadow-md"
            onClick={() => {
              router.push(`/aktivitas-sales/${nip}`);
            }}
          >
            Aktivitas Sales
          </button>

        </div>
        <div className="w-full sm:pl-14 pl-[20px] mb-5 flex justify-between sm:px-9 px-0">
          <div className="flex flex-col gap-1 sm:w-[350px] w-full border border-gray-500 border-solid sm:border-3 border-10 sm:pr-0 pr-23 pt-[5px] sm:-mt-[90px] mt-[30px] sm:ml-0 -ml-[10px]">
            <TeksProfil label="Sales Productivity Bulanan" />
            <div className="relative pr-50">
              <button className={`bg-[#F8DE22] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 mt-[25px] mr-[60px] rounded-r-xl font-semibold `} style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[0] / 130 * 300) : 50)}px`
              }}
              >
                JAN
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[0]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#f8c322] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[1] / 130 * 300) : 50)}px`
              }}
              >
                FEB
                <tex className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[1]}%</tex>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#FD8D14] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[2] / 130 * 300) : 50)}px`
              }}>
                MAR
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[2]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#E3651D] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold"
                style={{
                  width: `${Math.max(50, data ? (data.total_nilai_kpi[3] / 130 * 300) : 50)}px`
                }}>
                APR
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[3]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#BE3144] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[4] / 130 * 300) : 50)}px`
              }}>
                MEI
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[4]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#872341] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[5] / 130 * 300) : 50)}px`
              }}>
                JUN
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[5]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#631c7f] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[70px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[6] / 130 * 300) : 50)}px`
              }}>
                JUL
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[6]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#24366d] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[7] / 130 * 300) : 50)}px`
              }}>
                AGS
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[7]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#315888] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[270px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[8] / 130 * 300) : 50)}px`
              }}>
                SEP
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[8]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#4b6bd6] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[9] / 130 * 300) : 50)}px`
              }}>
                OKT
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[9]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#488a48] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[10] / 130 * 300) : 50)}px`
              }}>
                NOV
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[10]}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#62c162] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi[11] / 130 * 300) : 50)}px`
              }}>
                DES
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi[11]}%</text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;