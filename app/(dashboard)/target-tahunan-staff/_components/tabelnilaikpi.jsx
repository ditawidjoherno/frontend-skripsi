import useTargetStaff from "@/hooks/use-target-tahunan-staff";
import { useEffect, useState } from "react";
import useTargetHarianStaff from "@/hooks/use-target-harian";
import useUserStore from "@/hooks/use-data-user";
import useTargetMingguanStaff from "@/hooks/use-target-mingguan";

const TableKpi = () => {
  const { loading, error, data, getUserData } = useTargetStaff();
  const {  data: harian, getUserData: getHarian } = useTargetHarianStaff();
  const {  data: mingguan, getUserData: getMingguan } = useTargetMingguanStaff();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getUserData();
    getHarian();
    getMingguan();
  }, []);

  useEffect(() => {
    if (data) {
      const tableRows = data.map((staffData, index) => ({
        No: index + 1,
        KPI: staffData.nama_kpi,
        TargetJan: staffData.target.januari,
        TargetFeb: staffData.target.februari,
        TargetMar: staffData.target.maret,
        TargetApr: staffData.target.april,
        TargetMei: staffData.target.mei,
        TargetJun: staffData.target.juni,
        TargetJul: staffData.target.juli,
        TargetAgu: staffData.target.agustus,
        TargetSep: staffData.target.september,
        TargetOkt: staffData.target.oktober,
        TargetNov: staffData.target.november,
        TargetDes: staffData.target.desember,
      }));
      setTableData(tableRows);
    } else {
      setTableData([]);
    }
  }, [data]);
  
  console.log(data)
console.log(harian)

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
    <div>
    <h2 className="font-semibold text-2xl">Target Tahunan</h2>
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
    </div>
    <div className="mt-5">
    <h2 className="font-semibold text-2xl">Target Mingguan</h2>
    <div className="">
      <table className="table-auto mr-9 mt-5 mb-5 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-1 py-2 bg-gray-200">No</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Target Mingguan</th>
            </tr>
          </thead>
          <tbody>
            {mingguan && mingguan.length > 0 ? (
              mingguan.map((row, index) => (
                <tr key={index + 1}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{mingguan}</td>

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
    
    </div>
    <div>
    <h2 className="font-semibold text-2xl">Target Harian</h2>
    <div className="">
      <table className="table-auto mr-9 mt-5 mb-5 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-1 py-2 bg-gray-200">No</th>
              <th className="border border-gray-400 px-20 py-2 bg-gray-200">Target Harian</th>
            </tr>
          </thead>
          <tbody>
          {harian && harian.length > 0 ? (
              harian.map((row, index) => (
                <tr key={index + 1}>
                  <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-400 px-4 py-2">{row}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="border border-gray-400 px-4 py-2">
                  Belum ada data yang ditambahkan
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
    
    </div>
    </div>
  );
};

export default TableKpi;
