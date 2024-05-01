"use client"
import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import InputPopup from './_components/popup';
import TableKpi from './_components/tabelnilaikpi';
import Dropdown from './_components/dropdown';
import TabelKpiBulan from './_components/tabelkpibulan';
import useUser from '@/hooks/use-user';
import TableKpiMonitoring from './_components/tabelnilaikpimonitoring';

const Page = () => {
  const { loading, error, data: userData, getUserData } = useUser();
  const [selectedOptions1, setSelectedOptions1] = useState('');
  const [inputData, setInputData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  const { jabatan } = userData;

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
        {jabatan === 'manager' && (
          <div className='mx-9'>
            <TableKpiMonitoring/>
          </div>
        )}

        {(jabatan === 'staff') && (
          <TableKpi data={inputData} />
        )}
        {/* {popupVisible && (
          <InputPop
          up onSave={handleSaveNewItem} onClose={() => setPopupVisible(false)} />
        )} */}
        {/* {jabatan === 'manager' && (
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
        )} */}
        {/* {jabatan === 'manager' && <TabelKpiBulan />} */}
      </div>
    </div>
  );
};

export default Page;
