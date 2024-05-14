import { useEffect, useState } from "react";
import useUserStore from "@/hooks/use-data-user";
import useGetTarget from "@/hooks/use-target-tahunan-staff1";
import UpdateTargetTahunan from "@/hooks/update-target-tahunan";
import { FaSpinner } from 'react-icons/fa';
import { IoPersonSharp } from "react-icons/io5";

const TableKpiMonitoring = () => {
  const { loading, error, data, getUserData } = useGetTarget();
  const {  data: update, getUserData: targettahunan } = UpdateTargetTahunan();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const nip = urlParams.get('nip');

    if (nip) {
      getUserData(nip);
    }
  }, []);


  useEffect(() => {
    if (data && data.target_kpi && Array.isArray(data.target_kpi)) {
      const capitalizeFirstLetter = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };
      const tableRows = data.target_kpi.map((kpi, index) => ({
        No: index + 1,
        KPI: capitalizeFirstLetter(kpi.nama_kpi),
        TargetJan: kpi.target.januari || '-',
        TargetFeb: kpi.target.februari || '-',
        TargetMar: kpi.target.maret || '-',
        TargetApr: kpi.target.april || '-',
        TargetMei: kpi.target.mei || '-',
        TargetJun: kpi.target.juni || '-',
        TargetJul: kpi.target.juli || '-',
        TargetAgu: kpi.target.agustus || '-',
        TargetSep: kpi.target.september || '-',
        TargetOkt: kpi.target.oktober || '-',
        TargetNov: kpi.target.november || '-',
        TargetDes: kpi.target.desember || '-',
      }));
      setTableData(tableRows);
    } else {
      setTableData([]);
    }
  }, [data]);


  console.log(data)

  if (loading) {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" /> Loading
        </div>
    );
}

  if (error) {
    return;
  }

  return (
    <div>
      <div className="flex items-center gap-4">
      <IoPersonSharp className="sm:w-10 w-7 sm:h-10 h-7" />
      <div>
        {data && (
          <>
            <h2 className='font-normal sm:text-[20px] text-[16px]'>Nama: {data?.nama_user}</h2>
            <h2 className='font-normal sm:text-[20px] text-[16px]'>NIP: {data?.nip_user}</h2>
          </>
        )}
      </div>
      </div>
      <hr className="border-t-2 border-black my-3 mx-0" />
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
  );
};

export default TableKpiMonitoring;
