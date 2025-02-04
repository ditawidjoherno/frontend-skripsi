import useTargetStaff from "@/hooks/use-target-tahunan-staff";
import { useEffect, useState } from "react";
import useUserStore from "@/hooks/use-data-user";

const TableKpi = () => {
  const { loading, error, data, getUserData } = useTargetStaff();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (data) {
      const tableRows = data.map((staffData, index) => ({
        No: index + 1,
        KPI: staffData.nama_kpi,
        TargetJan: staffData.target.Januari,
        TargetFeb: staffData.target.Februari,
        TargetMar: staffData.target.Maret,
        TargetApr: staffData.target.April,
        TargetMei: staffData.target.Mei,
        TargetJun: staffData.target.Juni,
        TargetJul: staffData.target.Juli,
        TargetAgu: staffData.target.Agustus,
        TargetSep: staffData.target.September,
        TargetOkt: staffData.target.Oktober,
        TargetNov: staffData.target.November,
        TargetDes: staffData.target.Desember,
      }));
      setTableData(tableRows);
    } else {
      setTableData([]);
    }
  }, [data]);
  
  console.log(data)

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
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
  );
};

export default TableKpi;
