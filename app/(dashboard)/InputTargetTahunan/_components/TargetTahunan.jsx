import { useState, useEffect } from 'react';
import axios from 'axios';
import useTargetTahunan from '@/hooks/use-target-tahunan';
import { getCookie } from '@/lib/cookieFunction';
import { useRouter } from 'next/navigation';

const TargetTahunan = () => {
  const router = useRouter();
  const [selectedKpi, setSelectedKpi] = useState('');
  const [inputTarget, setInputTarget] = useState({});

  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);
  const bearerToken = `Bearer ${token}`;
  const [tableData, setTableData] = useState([]);
  const [message, setMessage] = useState('');
  const [finalData, setFinalData] = useState({ target_kpi: [] });
  const [namaStaff, setNamaStaff] = useState();
  const [selectedStaff, setSelectedStaff] = useState();
  const { loading, error, data, storeTargetTahunan } = useTargetTahunan();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchNamaStaff = async () => {
      const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/nama-staff`, {
        headers: {
          Authorization: bearerToken
        }
      });
      setNamaStaff(response.data.data);
    };

    fetchNamaStaff();
  }, [bearerToken, selectedStaff]);

  const months = [
    "Januari", "Februari", "Maret", "April",
    "Mei", "Juni", "Juli", "Agustus",
    "September", "Oktober", "November", "Desember"
  ];

  const transformData = (stateData) => {
    const targetArray = months.map((month) => parseInt(stateData[month] || 0));
    return {
      nama_kpi: selectedKpi,
      bobot_penilaian: parseInt(stateData.bobot_penilaian),
      indikator: stateData.indikator,
      target: targetArray
    };
  };

  const handleChangeKPI = (event) => {
    const { value } = event.target;
    setSelectedKpi(value);
    setInputTarget({});
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, bobot_penilaian: value }));
  };

  const handleInputIndikatorChange = (event) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, indikator: value }));
  };

  const handleChangeTarget = (event, month) => {
    const { value } = event.target;
    setInputTarget((prevInput) => ({ ...prevInput, [month]: value }));
  };

  const handleAddData = () => {
    if (!selectedKpi || !inputTarget.bobot_penilaian || Object.keys(inputTarget).length - 2 !== 12) {
      setMessage("Silakan pilih KPI, isi bobot penilaian, dan isi seluruh target bulanan.");
      return;
    }

    const transformedData = transformData(inputTarget);

    setTableData((prevData) => [...prevData, transformedData]);
    setFinalData((prevFinalData) => ({
      ...prevFinalData,
      target_kpi: [...prevFinalData.target_kpi, transformedData],
    }));

    setInputTarget({});
    setSelectedKpi('');
    setMessage('');
  };

  const handleSubmit = async () => {
    try {
      const response = await storeTargetTahunan(selectedStaff, finalData);
      alert(response);
    } catch (error) {
      setModalMessage("Berhasil menambahkan Target Tahunan");
      setModalType("success");
      setModalVisible(true);    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (modalType === "success") {
        router.push("/InputTargetTahunan");
    }
};
  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, idx) => idx !== index);
    setTableData(updatedData); 
  };


  const monthlyInputs = months.map(month => `${month.charAt(0).toUpperCase()}${month.slice(1)}`);

  return (
    <div className="pl- sm:mt-4 mt-0 ">
      <h2 className="sm:text-[30px] sm:pl-8 pl-4 sm:mb-4 mb-1 text-[22px] font-semibold">
        Input Target Tahunan
      </h2>
      <div className="mb-4 sm:pl-8 pl-4 flex md:flex-row flex-col gap-5">
        <div className=''>
          <label htmlFor="staffSelect" className="block mb-2 sm:text-base text-xs">Nama Staff:</label>
          <select
            id="staffSelect"
            className="border border-gray-300 sm:w-[200px] w-[150px] p-2 rounded-md bg-white sm:text-base text-xs"
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
          >
            <option className="sm:text-base text-xs" value="">Select Nama Staff</option>
            {namaStaff && namaStaff.map((staff, index) => (
              <option className="sm:text-base text-xs" key={index} value={staff.user_id}>{staff.nama}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="kpiSelect" className="block mb-2 sm:text-base text-xs ">Nilai KPI:</label>
          <select
            id="kpiSelect"
            className="border border-gray-300 sm:w-[200px] w-[145px] p-2 rounded-md bg-white sm:text-base text-xs"
            onChange={handleChangeKPI}
            value={selectedKpi}
          >
            <option className="sm:text-base text-xs" value="">Select KPI</option>
            <option className="sm:text-base text-xs" value="Tabungan">TABUNGAN</option>
            <option className="sm:text-base text-xs" value="Depo Ritel">DEPO RITEL</option>
            <option className="sm:text-base text-xs" value="NTB - PBO">NTB - PBO</option>
            <option className="sm:text-base text-xs" value="NOA BTN Move">NOA BTN MOVE</option>
            <option className="sm:text-base text-xs" value="Transaksi Teller">TRANSAKSI TELLER</option>
            <option className="sm:text-base text-xs" value="Transaksi CRM">TRANSAKSI CRM</option>
            <option className="sm:text-base text-xs" value="Operasional MKK">OPERASIONAL MKK</option>
            <option className="sm:text-base text-xs" value="QRIS">QRIS</option>
            <option className="sm:text-base text-xs" value="EDC">EDC</option>
            <option className="sm:text-base text-xs" value="Agen">Agen</option>
            <option className="sm:text-base text-xs" value="Kuadran Agen">KUADRAN AGEN</option>
            <option className="sm:text-base text-xs" value="NOA Payroll">NOA PAYROLL</option>
            <option className="sm:text-base text-xs" value="VOA Payroll">VOA PAYROLL</option>
            <option className="sm:text-base text-xs" value="NOA Pensiun">NOA PENSIUN</option>
            <option className="sm:text-base text-xs" value="VOA Pensiun">VOA PENSIUN</option>
            <option className="sm:text-base text-xs" value="VOA E-Batarapos">VOA E-BATARAPOS</option>
            <option className="sm:text-base text-xs" value="NOA Giro">NOA GIRO</option>
            <option className="sm:text-base text-xs" value="Akuisi Satker">AKUISISI SATKER</option>
            <option className="sm:text-base text-xs" value="CMS">CMS</option>
            <option className="sm:text-base text-xs" value="Jumlah PKS PPO">JUMLAH PKS PPO</option>
            <option className="sm:text-base text-xs" value="DPK Lembaga">DPK LEMBAGA</option>
          </select>
        </div>
      </div>
      {selectedKpi && (
        <div className="mb-4 sm:pl-8 pl-4 ">
          <label htmlFor="inputValue" className="block mb-2 sm:text-base text-xs">Bobot Penilaian:</label>
          <input
            type="text"
            id="inputValue"
            className="border border-gray-500 p-2 w-1/3 sm:text-base text-xs rounded-md mb-2 bg-white"
            value={inputTarget.bobot_penilaian || ""}
            onChange={handleInputChange}
          />
          <div>
            <label htmlFor="kpiSelect" className="block mb-2 sm:text-base text-xs">Indikator:</label>
            <select
              id="indikatorSelect"
              className="border border-gray-300 sm:text-base text-xs p-2 rounded-md bg-white"
              onChange={handleInputIndikatorChange}
              value={inputTarget.indikator || ""}
            >
              <option value="">Select Indikator</option>
              <option value="%">%</option>
              <option value="unit">Unit</option>
              <option value="rp">RP</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4 h-full mr-3 sm:text-base text-xs">
            {monthlyInputs.map((month, index) => (
              <div key={index} className="flex flex-col justify-center h-full">
                <span className="mb-2">{month.charAt(0).toUpperCase() + month.slice(1)}:</span>
                <input
                  type="text"
                  className="border border-gray-500 p-2 rounded-md w-full bg-white"
                  value={inputTarget[month] || ""}
                  onChange={(e) => handleChangeTarget(e, month)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='flex justify-end mt-5 mr-3'>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-10 rounded-md mr-2 sm:text-base text-xs"
          onClick={handleAddData}
        >
          Tambah Data
        </button>
      </div>
      {message && <p className="text-red-500 sm:ml-8 ml-4 ">{message}</p>}
      <div className="bg-white rounded-b-2xl sm:pl-8 pl-6 h-auto overflow-x-scroll">
        <table className="border border-gray-300 w-full mr-5 sm:text-base text-xs">
          <thead>
            <tr>
              <th className="border border-gray-300 px-14 sm:py-4 py-2 sm:text-base text-xs">KPI</th>
              <th className="border border-gray-300 px-14 sm:py-4 py-2 sm:text-base text-xs">Bobot Penilaian</th>
              <th className="border border-gray-300 px-14 sm:py-4 py-2 sm:text-base text-xs">Indikator</th>
              {months.map((month, index) => (
                <th key={index} className="border border-gray-300 px-14 sm:py-4 py-2 sm:text-base text-xs">
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </th>
              ))}
              <th className="border border-gray-300 px-14 sm:py-4 py-2 sm:text-base text-xs">Aksi</th> 
            </tr>
          </thead>
          <tbody className='sm:text-base text-xs'>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{data.nama_kpi}</td>
                <td className="border border-gray-300 p-2">{data.bobot_penilaian}</td>
                <td className="border border-gray-300 p-2">{data.indikator}</td>
                {Object.entries(data.target).map(([month, value], idx) => (
                  <td key={idx} className="border border-gray-300 p-2">{value}</td>
                ))}
                <td className="border border-gray-300 p-2">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(index)} 
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className='justify-end mt-5 flex mr-3'>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-10 rounded-md mr-2 sm:text-base text-xs"
          onClick={handleSubmit}
        >
          Simpan
        </button>
      </div>
      {modalVisible && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px] text-center">
                        <h3 className={`text-xl font-semibold ${modalType === "success" ? "text-green-600" : "text-red-600"}`}>
                            {modalType === "success" ? "Berhasil!" : "Gagal"}
                        </h3>
                        <p className="mt-4 text-lg">{modalMessage}</p>
                        <button
                            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleCloseModal}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
    </div>
  );
};

export default TargetTahunan;