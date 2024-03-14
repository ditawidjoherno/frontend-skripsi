"use client";

import { useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Link from 'next/link';

const Page = () => {
  const [selectedKpi, setSelectedKpi] = useState('');
  const [inputTarget, setInputTarget] = useState({});
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState('');

  const handleChangeKPI = (event) => {
    const { value } = event.target;
    setSelectedKpi(value);
    setInputTarget({});
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, bobot_penilaian: value }));
  };

  const handleChangeTarget = (event, month) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, [month]: value }));
  };

  const handleAddData = () => {
    if (!selectedKpi || !inputTarget.bobot_penilaian || Object.keys(inputTarget).length - 1 !== 12) {
      setMessage("Please select KPI, fill in the weight of assessment, and fill in all monthly targets.");
      return;
    }

    const newData = {
      kpi: selectedKpi,
      value: inputTarget.bobot_penilaian,
      monthlyValues: Object.values(inputTarget).slice(1),
    };

    setTableData((prevData) => [...prevData, newData]);
    setInputTarget({});
    setSelectedKpi('');
    setMessage('');
  };

  const test = () => {
    console.log(tableData)
    console.log(inputTarget)
  }

  const months = [
    "januari", "februari", "maret", "april",
    "mei", "juni", "juli", "agustus",
    "september", "oktober", "november", "desember"
  ];

  const monthlyInputs = months.map(month => `${month.charAt(0).toUpperCase()}${month.slice(1)}`);

  return (
    <div className={`bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Input Target Tahunan
        </h2>
        <Link href="/beranda">
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-16 sm:ml-5 ml-3 w-full sm:pt-4 pt-6 ">
        <div className="pl-8 mt-4">
          <div className="mb-4 flex gap-5">
            <div className=''>
              <label htmlFor="staffSelect" className="block mb-2">Nama Staff:</label>
              <select
                id="staffSelect"
                className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md"
              >
                <option value="">Select Nama Staff</option>
                <option value="Nama Staff 1">Nama Staff 1</option>
                <option value="Nama staff 2">Nama Staff 2</option>
                <option value="Nama Staff 3">Nama Staff 3</option>
                <option value="Nama Staff 4">Nama Staff 4</option>
                <option value="Nama Staff 5">Nama Staff 5</option>
                <option value="Nama Staff 6">Nama Staff 6</option>
                <option value="Nama Staff 7">Nama Staff 7</option>
              </select>
            </div>
            <div>
              <label htmlFor="kpiSelect" className="block mb-2">Nilai KPI:</label>
              <select
                id="kpiSelect"
                className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md"
                onChange={handleChangeKPI}
                value={selectedKpi}
              >
                <option value="">Select KPI</option>
                <option value="TABUNGAN">T ABUNGAN</option>
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
                className="border border-gray-500 p-2 w-1/3 rounded-md mb-2"
                value={inputTarget.bobot_penilaian || ""}
                onChange={handleInputChange}
              />
              <div className="grid grid-cols-3 gap-4 h-full mr-3">
                {monthlyInputs.map((month, index) => (
                  <div key={index} className="flex flex-col justify-center h-full">
                    <span className="mb-2">{month.charAt(0).toUpperCase() + month.slice(1)}:</span>
                    <input
                      type="text"
                      className="border border-gray-500 p-2 rounded-md w-full"
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
          <div className="bg-white rounded-b-2xl h-auto overflow-x-scroll">
            <table className="border border-gray-300 w-full mr-5">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-14 sm:py-4 py-2">KPI</th>
                  <th className="border border-gray-300 px-14 sm:py-4 py-2">Bobot Penilaian</th>
                  {months.map((month, index) => (
                    <th key={index} className="border border-gray-300 px-14 sm:py-4 py-2">{month.charAt(0).toUpperCase() + month.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{data.kpi}</td>
                    <td className="border border-gray-300 p-2">{data.value}</td>
                    {data.monthlyValues.map((value, index) => (
                      <td key={index} className="border border-gray-300 p-2">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='justify-end mt-5 flex mr-3'>
            <button
              className="bg-blue-500 text-white px-4 py-2 mb-10 rounded-md mr-2"
              onClick={test}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
