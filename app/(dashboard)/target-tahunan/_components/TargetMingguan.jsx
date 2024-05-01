import React, { useEffect, useState } from "react";
import Dropdown from './dropdown';
import useStaff from "@/hooks/use-staff";
import useTargetMingguanStaff from "@/hooks/use-target-mingguan";

const TargetMingguanMonitoring = () => {
  const [foundStaffData, setFoundStaffData] = useState(null);
  const { data: dataStaff, getUserData: getNamaStaff } = useStaff();
  const { data: dataTargetMingguan, getUserData: getTargetMingguan } = useTargetMingguanStaff();
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    getNamaStaff();
    getTargetMingguan();
  }, []);

  useEffect(() => {
    if (dataTargetMingguan && selectedStaff) {
      const foundStaffData = dataTargetMingguan.find(staff => staff.nip_staff === parseInt(selectedStaff));
      if (foundStaffData) {
        setFoundStaffData(foundStaffData);
      } else {
        setFoundStaffData(null);
      }
    }
  }, [dataTargetMingguan, selectedStaff]);

  const handleChange = (e) => {
    const selectedStaff = e.value;
    setSelectedStaff(selectedStaff);
  };

  const handleInputClick = () => {
    window.location.href = '/update-target-mingguan';
  };

  return (
    <div>
      <div className="flex justify-between mb-3">
      <h2 className="sm:text-[30px] text-[24px]  font-semibold">
          Target Mingguan
        </h2>
        <button
              className="bg-blue-500 hover:bg-[#77c9ff] text-white font-semibold px-4 py-2  rounded-md mr-3"
              onClick={handleInputClick}
            >
              Ubah Target Mingguan
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
            placeholder={"Pilih NIP Staff"}
          />
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto mr-9 mt-5 mb-5">
          <thead>
            <tr>
              <th className="border border-gray-400 px-1 py-2 bg-gray-200">No</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Target</th>
            </tr>
          </thead>
          <tbody>
            {foundStaffData && foundStaffData.target_mingguan && foundStaffData.target_mingguan.length > 0 ? (
              foundStaffData.target_mingguan.map((target, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{target}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="border border-gray-400 px-4 py-2">
                  Belum ada data target Mingguan untuk staf yang dipilih
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TargetMingguanMonitoring;
