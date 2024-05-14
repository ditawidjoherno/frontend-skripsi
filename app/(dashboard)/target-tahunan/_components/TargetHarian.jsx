import React, { useEffect, useState } from "react";
import Dropdown from './dropdown';
import useStaff from "@/hooks/use-staff";
import useTargetHarianStaff from "@/hooks/use-target-harian";
import { useRouter } from "next/navigation";

const TargetHarianMonitoring = () => {
  const router = useRouter();
  const [foundStaffData, setFoundStaffData] = useState(null);
  const { data: dataStaff, getUserData: getNamaStaff } = useStaff();
  const { data: dataTargetHarian, getUserData: getTargetHarian } = useTargetHarianStaff();
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    getNamaStaff();
    getTargetHarian();
  }, []);

  useEffect(() => {
    if (dataTargetHarian && selectedStaff) {
      const foundStaffData = dataTargetHarian.find(staff => staff.nip_staff === parseInt(selectedStaff));
      if (foundStaffData) {
        setFoundStaffData(foundStaffData);
      } else {
        setFoundStaffData(null);
      }
    }
  }, [dataTargetHarian, selectedStaff]);

  const handleChange = (e) => {
    const selectedStaff = e.value;
    setSelectedStaff(selectedStaff);
  };

  const handleInputClick = () => {
    window.location.href = '/update-target-harian';
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

  return (
    <div>
      <div className="flex justify-between mb-3">
      <h2 className="sm:text-[30px] text-[21px] font-semibold">
          Target Harian
        </h2>
        <button
              className="bg-blue-500 hover:bg-[#77c9ff] sm:w-[200px] w-[100px] sm:h-[45px] h-[37px] text-white font-semibold sm:px-4 px-2 sm:py-2 py-0 rounded-md mr-3 sm:text-[16px] text-[10px]"
              onClick={() => router.push("/update-target-harian")}
            >
              Ubah Target Harian
            </button>
      </div>
      <div className='w-full'>
        {dataStaff && (
          <Dropdown
            value={selectedStaff}
            onChange={handleChange}
            options={dataStaff.map((staff) => ({
              value: staff.nip,
              label: staff.nama
            }))}
            placeholder={"Pilih Nama Staff"}
          />
        )}
      </div>
      <div className="">
        <table className="table-auto w-full mr-9 mt-5 mb-5">
          <thead>
            <tr>
              <th className="border border-gray-400 px-1 py-2 bg-gray-200 sm:text-[17px] text-[12px]">No</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200 sm:text-[17px] text-[12px]">Target</th>
            </tr>
          </thead>
          <tbody>
            {foundStaffData && foundStaffData.target_harian && foundStaffData.target_harian.length > 0 ? (
              foundStaffData.target_harian.map((target, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{capitalizeFirstLetter(target)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="border border-gray-400 px-4 py-2 sm:text-[17px] text-[12px] text-center">
                  Belum ada data target harian untuk staf yang dipilih
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TargetHarianMonitoring;
