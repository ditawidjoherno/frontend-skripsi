import React, { useEffect, useState } from "react";
import Dropdown from './dropdown';

const TabelKpiBulan = ({ selectedStaffData }) => {
  const [tableData, setTableData] = useState([]);
  const [selectedBulan, setSelectedBulan] = useState("Januari");

  useEffect(() => {
    if (selectedStaffData && selectedStaffData.target_kpi) {
      console.log("Data masuk:", selectedStaffData);

      const kpiData = selectedStaffData.target_kpi.filter(kpi => kpi.target[selectedBulan]); 
      console.log("Data yang difilter:", kpiData);

      const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      const tableRows = kpiData.map((kpi, index) => ({
        No: index + 1,
        KPI: capitalizeFirstLetter(kpi.nama_kpi),
        Target: kpi.target[selectedBulan],
        Realisasi: kpi.realisasi[selectedBulan],
        Pencapaian: `${kpi.pencapaian[selectedBulan]}%`, 
        NilaiKPI: `${kpi.nilai_kpi[selectedBulan]}%`
      }));
      console.log("Data yang akan ditampilkan:", tableRows);

      setTableData(tableRows);
    } else {
      setTableData([]);
    }
  }, [selectedStaffData, selectedBulan]);

  const handleChangeBulan = (selectedOption) => {
    setSelectedBulan(selectedOption.value);
  };

  const bulanOptions = [
    { value: "Januari", label: "Januari" },
    { value: "Februari", label: "Februari" },
    { value: "Maret", label: "Maret" },
    { value: "April", label: "April" },
    { value: "Mei", label: "Mei" },
    { value: "Juni", label: "Juni" },
    { value: "Juli", label: "Juli" },
    { value: "Agustus", label: "Agustus" },
    { value: "September", label: "September" },
    { value: "Oktober", label: "Oktober" },
    { value: "November", label: "November" },
    { value: "Desember", label: "Desember" },
  ];

  return (
    <div className="mt-5 sm:text-base text-xs">
      <Dropdown
        id="dropdown-bulan"
        value={selectedBulan}
        onChange={handleChangeBulan}
        options={bulanOptions}
        isSearchable={true}
        placeholder={"Pilih Nama Bulan"}
      />
      <div className="overflow-x-auto">
        <table className="table-auto mx- mt-5 mb-5 sm:text-base text-xs">
          <thead>
            <tr>
              <th className="border border-gray-400 px-1 py-2 bg-gray-200 " >No</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200 " >KPI</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200 " >{selectedBulan}</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200 " >Realisasi</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200 " >Pencapaian</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200 " >Nilai KPI</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{row.No}</td>
                <td className="border border-gray-400 px-4 py-2">{row.KPI}</td>
                <td className="border border-gray-400 px-4 py-2">{row.Target}</td>
                <td className="border border-gray-400 px-4 py-2">{row.Realisasi}</td>
                <td className="border border-gray-400 px-4 py-2">{row.Pencapaian}</td>
                <td className="border border-gray-400 px-4 py-2">{row.NilaiKPI}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelKpiBulan;
