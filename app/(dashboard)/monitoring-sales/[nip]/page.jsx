"use client";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import TeksProfil from "../_components/TeksProfil";
import { useEffect } from "react";
import useNilaiKpi from "@/hooks/use-nilai-kpi";
import { useParams, useRouter } from 'next/navigation';
import useStaff from "@/hooks/use-staff-nip";
import useUser from "@/hooks/use-user";
import Link from "next/link";


const page = () => {

  const router = useRouter()
  const { nip } = useParams()
  const { loading, error, data, getNilaiKpi } = useNilaiKpi();
  const { data: Staff, getUserData: getStaff } = useStaff();
  const { data: userData, getUserData: getDataUser } = useUser();
  
  
  useEffect(() => {
    const fetchData = async () => {
      await getNilaiKpi(nip);
      await getStaff(nip);
      await getDataUser(nip);
    };
    
    fetchData();
  }, [nip]);

  if (!userData) {
    return <div>Loading...</div>;
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



  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-3xl text-[24px] font-bold sm:mt-[12px] sm:mb-3 mb-1 sm:ml-5 ml-2 ">
          Monitoring Sales
        </h2>
        <Link href="/monitoring">
        <IoIosArrowDropleftCircle className="sm:h-10 h-6 sm:w-20 w-10 sm:mt-[0px] mt-[2px]" />
        </Link>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-6 sm:ml-5 ml-3 w-full sm:pt-5 pt-4 sm:pr-0 pr-19">
        <div className='sm:flex sm:ml-0 ml-1'>
          <div className="w-1/2 sm:flex sm:items-center sm:mt-[-10px] mt-[15px]">
            {data && data.foto_profil && (
              <img src={data.foto_profil} alt="Foto Profil" className="sm:w-[220px] w-[190px] sm:h-[220px] h-[190px] sm:ml-10 ml-20 sm:mt-[-20px] mt-[-10px] " />
            )}            <div className="w-full sm:mt-[-40px] mt-[20px] sm:text-left text-center sm:ml-0 ml-[80px]">
              {data && (
                <>
                  <TeksProfil label="Nama Staff" value={data.nama_staff} />
                  <TeksProfil label="Nip" value={data.nip_staff} />
                  <TeksProfil label="Jabatan" value={data.jabatan} />
                </>
              )}
            </div>
          </div>
          <div className="sm:w-1/2 w-full h-auto sm:ml-10 ml-left sm:mb-1 mb-219 sm:mt-[-2px] mt-6">
            <TeksProfil label="Sales Productivity" />
            <div className="w-full bg-red-600b">
              <button className="bg-[#6EE014] transition-all transform hover:bg-[#FFE500]  h-[35px] pt-30 mt-[px] ml-8 font-semibold" style={{ width: `${data ? (rataRataNilaiKpi / 130 * 400) : 0}px` }} >
              </button>
              <span className="top-[0%] text-sm transform translate-y(-100%) font-semibold">{data && rataRataNilaiKpi}%</span>
              <TeksProfil value="Ket:" />
              <TeksProfil value="Istimewa 110%-130%" />
              <TeksProfil value="Sangat Baik 100%-109%" />
              <TeksProfil value="Baik 95%-99%" />
              <TeksProfil value="Cukup 85%-94%" />
            </div >
          </div>
        </div>
        <div className="flex flex-col mt-[15px] sm:mr-[85px] mr-[70px]">
        {jabatan !== 'admin' && (

          <button className="bg-[#d9d9d9] transition-all transform hover:bg-[#a9a7a7] sm:w-[220px] w-[200px] h-[35px] ml-auto px-10 pt-30 mt-[25px] font-medium sm:mr-20 mr-middle shadow-md" onClick={handleTargetClick}>
            Lihat Target
          </button>
        )}
          <button
            className="bg-[#d9d9d9] transition-all transform hover:bg-[#a9a7a7] sm:w-[220px] w-[200px] h-[35px] ml-auto px-10 pt-30 mt-[25px] font-medium sm:mr-20 mr-middle shadow-md"
            onClick={() => {
              router.push(`/aktivitas-sales/${nip}`);
            }}
          >
            Aktivitas Sales
          </button>

        </div>
        <div className="w-full sm:pl-10 pl-[20px] flex justify-between px-9">
          <div className="flex flex-col gap-1 relative border border-gray-500 border-solid sm:border-3 border-10 sm:pr-0 pr-23 pt-[5px] sm:-mt-[90px] mt-[30px] sm:ml-0 -ml-[10px]">
            <div className="relative pr-50">
              <button className={`bg-[#F8DE22] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 mt-[25px] mr-[60px] rounded-r-xl font-semibold `} style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.januari / 130 * 400) : 50)}px`
              }}
              >
                JAN
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.januari}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#f8c322] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.februari / 130 * 400) : 50)}px`
              }}
              >
                FEB
                <tex className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.februari}%</tex>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#FD8D14] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.maret / 130 * 400) : 50)}px`
              }}>
                MAR
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.maret}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#E3651D] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold"
                style={{
                  width: `${Math.max(50, data ? (data.total_nilai_kpi.april / 130 * 400) : 50)}px`
                }}>
                APR
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.april}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#BE3144] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30  rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.mei / 130 * 400) : 50)}px`
              }}>
                MEI
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.mei}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#872341] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.juni / 130 * 400) : 50)}px`
              }}>
                JUN
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.juni}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#631c7f] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[70px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.juli / 130 * 400) : 50)}px`
              }}>
                JUL
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.juli}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#24366d] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.agustus / 130 * 400) : 50)}px`
              }}>
                AGS
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.agustus}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#315888] text-black text-left transition-all transform hover:bg-[#9ebfea] w-[270px] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.september / 130 * 400) : 50)}px`
              }}>
                SEP
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.september}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#4b6bd6] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.oktober / 130 * 400) : 50)}px`
              }}>
                OKT
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.oktober}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#488a48] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.november / 130 * 400) : 50)}px`
              }}>
                NOV
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.november}%</text>
              </button>
            </div>
            <div className="relative">
              <button className="bg-[#62c162] text-black text-left transition-all transform hover:bg-[#9ebfea] h-[35px] px-2 pt-30 rounded-r-xl font-semibold" style={{
                width: `${Math.max(50, data ? (data.total_nilai_kpi.desember / 130 * 400) : 50)}px`
              }}>
                DES
                <text className="absolute left-[100%] top-[50%] transform -translate-y-1/2 font-semibold">{data && data.total_nilai_kpi.desember}%</text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;