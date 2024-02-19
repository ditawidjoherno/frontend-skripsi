"use client";
import { useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import InputPopup from './_components/popup';
import TableKpi from './_components/tabelnilaikpi';
import Dropdown from './_components/dropdown';
import TabelKpiBulan from './_components/tabelkpibulan';

const page = () => {
  const [selectedOptions1, setSelectedOptions1] = useState('');

  const NamaStaff = [
    { value: 'option1', label: '== Pilih Nama Staff ==' },
    { value: 'option2', label: 'Nama Staff' },
    { value: 'option3', label: 'Nama Staff' },
    { value: 'option4', label: 'Nama Staff' },
    { value: 'option5', label: 'Nama Staff' },
  ];

  const Bulan = [
    { value: 'option1', label: '== Pilih Bulan ==' },
    { value: 'option2', label: 'Januari' },
    { value: 'option3', label: 'Februari' },
    { value: 'option4', label: 'Maret' },
    { value: 'option5', label: 'April' },
    { value: 'option2', label: 'Mei' },
    { value: 'option3', label: 'Juni' },
    { value: 'option4', label: 'Juli' },
    { value: 'option5', label: 'Agustus' },
    { value: 'option2', label: 'September' },
    { value: 'option3', label: 'Oktober' },
    { value: 'option4', label: 'November' },
    { value: 'option5', label: 'Desember' },

  ];

  const handleNamaStaff = (selectedOption) => {
    setSelectedOptions1(selectedOption.value);
  };

  const handleBulan = (selectedOption) => {
    setSelectedOptions1(selectedOption.value);
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const [inputData, setInputData] = useState([]);
  const [newItem, setNewItem] = useState('');

  const handleAddNewItem = () => {
    setPopupVisible(true);
  };

  const handleSaveNewItem = (value) => {
    setInputData([...inputData, value]);
    setPopupVisible(false);
  };

  return (
    <div className={`bg-[#EAEAEA] h-auto flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10`}>
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">
          Target Tahunan
        </h2>
        <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
      </div>
      <div className="bg-white rounded-2xl h-auto sm:ml-5 ml-3 w-full sm:pt-10 pt-6 ">
        <div className='justify-between flex mx-3 ml-9 mt-3 '>
          <Dropdown
            id="dropdown"
            value={NamaStaff.find((option) => option.value === String(selectedOptions1))}
            onChange={handleNamaStaff}
            options={NamaStaff}
            isSearchable={true}
            placeholder={"Pilih Nama Staff"}
          />
          <button onClick={handleAddNewItem} className='cursor-pointer sm:bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg font-medium text-white text-semibold'>Tambah</button>
        </div>
        {/* <TableKpi data={inputData} /> */}
        <TableKpi />
        {/* {popupVisible && <InputPopup onSave={handleSaveNewItem} />} */}
        <div className='mt-10 ml-9'>
          <Dropdown
            id="dropdown"
            value={Bulan.find((option) => option.value === String(selectedOptions1))}
            onChange={handleBulan}
            options={Bulan}
            isSearchable={true}
            placeholder={"Pilih Nama Bulan"}
          />
        </div>
          <TabelKpiBulan />
      </div>
    </div>

  );
};

export default page;