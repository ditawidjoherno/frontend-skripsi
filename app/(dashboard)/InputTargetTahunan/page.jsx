"use client";

import { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Link from 'next/link';
import axios from 'axios';
import { getCookie } from '@/lib/cookieFunction';
import useTargetTahunan from '@/hooks/use-target-tahunan';
import TargetHarian from './_components/TargetHarian';
import TargetMingguan from './_components/TargetMingguan';

const Page = () => {
  const [selectedKpi, setSelectedKpi] = useState('');
  const [inputTarget, setInputTarget] = useState({});

  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie)
  const bearerToken = `Bearer ${token}`
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState('');
  const [finalData, setFinalData] = useState({ target_kpi: [] });
  const [namaStaff, setNamaStaff] = useState()
  const [selectedStaff, setSelectedStaff] = useState();
  const { loading, error, data, storeTargetTahunan } = useTargetTahunan()

  useEffect(() => {
    const fetchNamaStaff = async () => {
      const response = await axios.get(`https://back-btn-boost.vercel.app/nama-staff`, {
        headers: {
          Authorization: bearerToken
        }
      })

      setNamaStaff(response.data.data)
    }

    fetchNamaStaff();
  }, [bearerToken, selectedStaff])

  const months = [
    "januari", "februari", "maret", "april",
    "mei", "juni", "juli", "agustus",
    "september", "oktober", "november", "desember"
  ];

  const transformData = (stateData) => {
    const target = {};
    for (const key in stateData) {
      if (key !== 'bobot_penilaian' && key !== 'indikator') {
        target[key.toLowerCase()] = parseInt(stateData[key]);
      }
    }
    return {
      nama_kpi: selectedKpi,
      bobot_penilaian: parseInt(stateData.bobot_penilaian),
      indikator: stateData.indikator,
      target: target
    };
  };

  const handleChangeKPI = (event) => {
    const { value } = event.target;
    setSelectedKpi(value);
    setInputTarget({});
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, bobot_penilaian: value }));
  };

  const handleInputIndikatorChange = (event) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, indikator: value }));
  };

  const handleChangeTarget = (event, month) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, [month]: value }));
  };

  const handleAddData = () => {
    if (!selectedKpi || !inputTarget.bobot_penilaian || Object.keys(inputTarget).length - 2 !== 12) {
      setMessage("Please select KPI, fill in the weight of assessment, and fill in all monthly targets.");
      return;
    }

    const newData = {
      nama_kpi: selectedKpi,
      bobot_penilaian: parseInt(inputTarget.bobot_penilaian),
      indikator: inputTarget.indikator,
      target: Object.values(inputTarget).slice(2),
    };

    const transformedData = transformData(inputTarget);

    setTableData((prevData) => [...prevData, transformedData]);
    setFinalData({
      ...finalData,
      target_kpi: [...finalData.target_kpi, transformedData],
    });

    setInputTarget({});
    setSelectedKpi('');
    setMessage('');
  };

  const handleSubmit = async () => {
    try {

      const response = await storeTargetTahunan(selectedStaff, finalData);
      alert(response);
    } catch (error) {
      console.error("Errorrs: ", error);
      alert("Gagal menambahkan target");
    }
  };


  const monthlyInputs = months.map(month => `${month.charAt(0).toUpperCase()}${month.slice(1)}`);

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Input Target Staff
        </h2>
        <Link href="/beranda">
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-16 sm:ml-5 ml-3 w-full sm:pt-4 pt-6 ">
        <div className="pl- mt-4">
        <h2 className="sm:text-[30px] pl-8 mb-4 text-[24px] font-semibold">
                Input Target Tahunan
            </h2>
          <div className="mb-4 pl-8 flex gap-5">
            <div className=''>
              <label htmlFor="staffSelect" className="block mb-2">Nama Staff:</label>
              <select
                id="staffSelect"
                className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md bg-white"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
              >
                <option value="">Select Nama Staff</option>
                {namaStaff && namaStaff.map((staff, index) => (
                  <option key={index} value={staff.nip}>{staff.nama}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="kpiSelect" className="block mb-2">Nilai KPI:</label>
              <select
                id="kpiSelect"
                className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md bg-white"
                onChange={handleChangeKPI}
                value={selectedKpi}
              >
                <option value="">Select KPI</option>
                <option value="TABUNGAN">TABUNGAN</option>
                <option value="DEPO RITEL">DEPO RITEL</option>
                <option value="NTB - PBO">NTB - PBO</option>
                <option value="NOA BTN MOVE">NOA BTN MOVE</option>
                <option value="TRANSAKSI TELLER">TRANSAKSI TELLER</option>
                <option value="TRANSAKSI CRM">TRANSAKSI CRM</option>
                <option value="OPERASIONAL MKK">OPERASIONAL MKK</option>
                <option value="QRIS">QRIS</option>
                <option value="EDC">EDC</option>
                <option value="KUADRAN AGEN">KUADRAN AGEN</option>
                <option value="NOA PAYROLL">NOA PAYROLL</option>
                <option value="VOA PAYROLL">VOA PAYROLL</option>
                <option value="NOA PENSIUN">NOA PENSIUN</option>
                <option value="VOA PENSIUN">VOA PENSIUN</option>
                <option value="VOA E-BATARAPOS">VOA E-BATARAPOS</option>
                <option value="NOA GIRO">NOA GIRO</option>
                <option value="AKUISISI SATKER">AKUISISI SATKER</option>
                <option value="CMS">CMS</option>
                <option value="JUMLAH PKS PPO">JUMLAH PKS PPO</option>
                <option value="DPK LEMBAGA">DPK LEMBAGA</option>
              </select>
            </div>
          </div>
          {selectedKpi && (
            <div className="mb-4 ">
              <label htmlFor="inputValue" className="block mb-2">Bobot Penilaian:</label>
              <input
                type="text"
                id="inputValue"
                className="border border-gray-500 p-2 w-1/3 rounded-md mb-2 bg-white"
                value={inputTarget.bobot_penilaian || ""}
                onChange={handleInputChange}
              />
              <div>
                <label htmlFor="kpiSelect" className="block mb-2">Indikator:</label>
                <select
                  id="indikatorSelect"
                  className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md bg-white"
                  onChange={handleInputIndikatorChange}
                  value={inputTarget.indikator || ""}
                >
                  <option value="">Select Indikator</option>
                  <option value="%">%</option>
                  <option value="rp">Rp</option>
                  <option value="unit">Unit</option>
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4 h-full mr-3">
                {monthlyInputs.map((month, index) => (
                  <div key={index} className="flex flex-col justify-center h-full">
                    <span className="mb-2">{month.charAt(0).toUpperCase() + month.slice(1)}:</span>
                    <input
                      type="text"
                      className="border border-gray-500 p-2 rounded-md w-full bg-white"
                      value={inputTarget[month] || ""}
                      onChange={(e) => handleChangeTarget(e, month)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className='flex justify-end mt-5 mr-3'>
            <button
              className="bg-blue-500 text-white px-4 py-2 mb-10 rounded-md mr-2"
              onClick={handleAddData}
            >
              Tambah Data
            </button>
          </div>
          {message && <p className="text-red-500">{message}</p>}
          <div className="bg-white rounded-b-2xl pl-8 h-auto overflow-x-scroll">
            <table className="border border-gray-300 w-full mr-5">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-14 sm:py-4 py-2">KPI</th>
                  <th className="border border-gray-300 px-14 sm:py-4 py-2">Bobot Penilaian</th>
                  <th className="border border-gray-300 px-14 sm:py-4 py-2">Indikator</th>
                  {months.map((month, index) => (
                    <th key={index} className="border border-gray-300 px-14 sm:py-4 py-2">{month.charAt(0).toUpperCase() + month.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{data.nama_kpi}</td>
                    <td className="border border-gray-300 p-2">{data.bobot_penilaian}</td>
                    <td className="border border-gray-300 p-2">{data.indikator}</td>
                    {/* {data.target.map((value, index) => (
                      <td key={index} className="border border-gray-300 p-2">{value}</td>
                    ))} */}
                    {Object.entries(data.target).map(([month, value], index) => (
                      <td key={index} className="border border-gray-300 p-2">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='justify-end mt-5 flex mr-3'>
            <button
              className="bg-blue-500 text-white px-4 py-2 mb-10 rounded-md mr-2"
              onClick={handleSubmit}
            >
              Simpan
            </button>
          </div>
        </div>
        <TargetHarian />
        <TargetMingguan />
      </div>
    </div>
  );
};

export default Page;

