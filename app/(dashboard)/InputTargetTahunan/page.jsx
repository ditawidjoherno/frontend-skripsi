"use client"
import { useState } from 'react';
import Link from 'next/link';
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Page = () => {
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [monthlyInputs, setMonthlyInputs] = useState(Array(12).fill(''));

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleMonthlyInputChange = (index, e) => {
    const newInputs = [...monthlyInputs];
    newInputs[index] = e.target.value;
    setMonthlyInputs(newInputs);
  };

  const handleAddData = () => {
    if (!inputValue || !selectedKPI) return;
    const newData = {
      kpi: selectedKPI,
      value: inputValue,
      monthlyValues: [...monthlyInputs],
    };
    setTableData([...tableData, newData]);
    setInputValue('');
    setMonthlyInputs(Array(12).fill(''));
  };

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
                onChange={(e) => setSelectedStaff(e.target.value)}
                value={selectedStaff}
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
                onChange={(e) => setSelectedKPI(e.target.value)}
                value={selectedKPI}
              >
                <option value="">Select KPI</option>
                <option value="DPK RITEL">DPK RITEL</option>
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
          {selectedKPI && (
            <div className="mb-4 ">
              <label htmlFor="inputValue" className="block mb-2">Bobot Penilaian:</label>
              <input
                type="text"
                id="inputValue"
                className="border border-gray-500 p-2 w-1/3 rounded-md mb-2"
                value={inputValue}
                onChange={handleInputChange}
              />
              <div className="grid grid-cols-3 gap-4 h-full mr-3">
                {monthlyInputs.map((value, index) => (
                  <div key={index} className="flex flex-col  justify-center h-full">
                    <span className="mb-2">{`${months[index]}:`}</span>
                    <input
                      type="text"
                      className="border border-gray-500 p-2 rounded-md w-full"
                      value={value}
                      onChange={(e) => handleMonthlyInputChange(index, e)}
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
          <div className="bg-white rounded-b-2xl h-auto overflow-x-scroll">
            <table className="border border-gray-300 w-full mr-5">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-14 sm:py-4 py-2">KPI</th>
                  <th className="border border-gray-300 px-14 sm:py-4 py-2">Bobot Penilaian</th>
                  {monthlyInputs.map((_, index) => (
                    <th key={index} className="border border-gray-300 px-14 sm:py-4 py-2">{months[index]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">{data.kpi}</td>
                    <td className="border border-gray-300 p-2">{data.value}%</td>
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
              onClick={handleAddData}
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
