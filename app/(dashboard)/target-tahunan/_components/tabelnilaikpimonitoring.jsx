import React, { useEffect, useState } from "react";
import Dropdown from './dropdown';
import useStaff from "@/hooks/use-staff";
import useTargetTahunanBM from "@/hooks/use-target-tahunan-bm";
import TabelKpiBulan from './TabelKpiBulan';

const TableKpiMonitoring = () => {
  const [tableData, setTableData] = useState([]);
  const [foundStaffData, setFoundStaffData] = useState(null);
  const { data: dataStaff, getUserData: getNamaStaff } = useStaff();
  const { data: dataTargetTahunan, getUserData: getTargetTahunan } = useTargetTahunanBM();
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    getNamaStaff();
    getTargetTahunan();
  }, []);


  useEffect(() => {
    if (dataTargetTahunan && dataTargetTahunan.length > 0 && selectedStaff !== "") {
      const capitalizeFirstLetter = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };

      const foundStaffData = dataTargetTahunan.find(staff => staff.user_id === selectedStaff);
      if (foundStaffData && foundStaffData.target_kpi) {
        const tableRows = foundStaffData.target_kpi.map((kpi, index) => ({
          No: index + 1,
          KPI: capitalizeFirstLetter(kpi.nama_kpi),
          TargetJan: kpi.target.Januari,
          TargetFeb: kpi.target.Februari,
          TargetMar: kpi.target.Maret,
          TargetApr: kpi.target.April,
          TargetMei: kpi.target.Mei,
          TargetJun: kpi.target.Juni,
          TargetJul: kpi.target.Juli,
          TargetAgu: kpi.target.Agustus,
          TargetSep: kpi.target.September,
          TargetOkt: kpi.target.Oktober,
          TargetNov: kpi.target.November,
          TargetDes: kpi.target.Desember,
        }));
        setTableData(tableRows);
        setFoundStaffData(foundStaffData);
      } else {
        setTableData([]);
        setFoundStaffData(null);
      }
    }
  }, [dataTargetTahunan, selectedStaff]);

  const handleChange = (e) => {
    const selectedStaff = e.value;
    setSelectedStaff(selectedStaff);
  };


  return (
    <div>
      <h2 className="sm:text-[30px] text-[21px] font-semibold mb-3">Target Tahunan Staff</h2>
      <div className='w-full sm:text-base text-xs'>
        {dataStaff && (
          <Dropdown
            value={selectedStaff}
            onChange={handleChange}
            options={dataStaff.map((staff) => ({
              value: staff.user_id,
              label: staff.nama
            }))}
            placeholder={"Pilih Nama Staff"}
          />
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto mr-9 mt-5 mb-5">
          <thead>
            <tr>
              <th className="border border-gray-400 px-1 py-2 bg-gray-200">No</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">KPI</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Jan</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Feb</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Mar</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Apr</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Mei</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Jun</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Jul</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Agu</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Sep</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Okt</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Nov</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Des</th>
            </tr>
          </thead>
          <tbody>
            {tableData && tableData.length > 0 ? (
              tableData.map((row) => (
                <tr key={row.No}>
                  <td className="border border-gray-400 px-4 py-2">{row.No}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.KPI}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetJan}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetFeb}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetMar}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetApr}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetMei}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetJun}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetJul}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetAgu}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetSep}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetOkt}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetNov}</td>
                  <td className="border border-gray-400 px-4 py-2">{row.TargetDes}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" className="border border-gray-400 px-4 py-2">
                  Belum ada data yang ditambahkan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {foundStaffData && <TabelKpiBulan selectedStaffData={foundStaffData} />}
    </div>
  );
};

export default TableKpiMonitoring;
