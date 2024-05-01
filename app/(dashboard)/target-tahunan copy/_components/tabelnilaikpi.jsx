import useTargetTahunanStaff from "@/hooks/use-target-tahunan-staff1";
import { useEffect, useState } from "react";
import useUserStore from "@/hooks/use-data-user";

const TableKpi = () => {
  const { loading, error, data, getUserData } = useTargetTahunanStaff();
  const [tableData, setTableData] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      getUserData(user.nip);
    }
  }, [user]);

  useEffect(() => {
    if (data && data.target_kpi) { 
      const { target_kpi } = data;
      const tableRows = target_kpi.flatMap((mainKpi, mainIndex) => {
        const mainRow = {
          No: mainIndex + 1,
          KPI: mainKpi.nama_kpi,
          ...mainKpi.target
        };
  
        const subRows = mainKpi.sub_kpi ? mainKpi.sub_kpi.map((subKpi, subIndex) => ({
          KPI: subKpi.nama,
          ...subKpi.target
        })) : [];
  
        return [mainRow, ...subRows];
      });
      setTableData(tableRows);
    }
  }, [data]);
  
  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto mx-9 mt-5 mb-5">
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
  {tableData.length > 0 ? (
    tableData.map((row, index) => (
      <tr key={index}>
        <td className="border border-gray-400 px-4 py-2">{row.No}</td>
        <td className="border border-gray-400 px-4 py-2">{row.KPI}</td>
        <td className="border border-gray-400 px-4 py-2">{row.januari}</td>
        <td className="border border-gray-400 px-4 py-2">{row.februari}</td>
        <td className="border border-gray-400 px-4 py-2">{row.maret}</td>
        <td className="border border-gray-400 px-4 py-2">{row.april}</td>
        <td className="border border-gray-400 px-4 py-2">{row.mei}</td>
        <td className="border border-gray-400 px-4 py-2">{row.juni}</td>
        <td className="border border-gray-400 px-4 py-2">{row.juli}</td>
        <td className="border border-gray-400 px-4 py-2">{row.agustus}</td>
        <td className="border border-gray-400 px-4 py-2">{row.september}</td>
        <td className="border border-gray-400 px-4 py-2">{row.oktober}</td>
        <td className="border border-gray-400 px-4 py-2">{row.november}</td>
        <td className="border border-gray-400 px-4 py-2">{row.desember}</td>
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
