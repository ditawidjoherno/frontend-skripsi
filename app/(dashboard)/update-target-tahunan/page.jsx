"use client";

import { useState, useEffect } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "@/lib/cookieFunction";
import useNamaKpiAdm from "@/hooks/use-nama-kpi-adm";
import updateTargetTahunan from "@/hooks/update-target-tahunan";

const Page = () => {
  const [selectedKpi, setSelectedKpi] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [targetValue, setTargetValue] = useState("");
  const [message, setMessage] = useState("");
  const { storeTargetTahunan } = updateTargetTahunan();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error, data: kpiData, getNamaKpi } = useNamaKpiAdm();
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);
  const bearerToken = `Bearer ${token}`;
  const [namaStaff, setNamaStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");

  useEffect(() => {
    const fetchNamaStaff = async () => {
      try {
        const response = await axios.get("https://backend-monitoring-btn-production.up.railway.app/api/nama-staff", {
          headers: { Authorization: bearerToken },
        });
        setNamaStaff(response.data.data);
      } catch (error) {
        console.error("Failed to fetch staff:", error);
      }
    };

    fetchNamaStaff();
  }, [bearerToken]);

  useEffect(() => {
    if (selectedStaff) {
      getNamaKpi(selectedStaff);
    }
  }, [selectedStaff]);

  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  const months = [
    "januari", "februari", "maret", "april", "mei", "juni",
    "juli", "agustus", "september", "oktober", "november", "desember"
  ];

  const handleKpiChange = (e) => {
    setSelectedKpi(e.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleTargetChange = (event) => {
    setTargetValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedKpi || !selectedMonth || !targetValue || !selectedStaff) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const monthIndex = months.indexOf(selectedMonth);
      const requestBody = { month_index: monthIndex, target: targetValue };

      const encodedKpi = encodeURIComponent(selectedKpi);

      const response = await axios.patch(
        `https://backend-monitoring-btn-production.up.railway.app/api/update-target-tahunan/${selectedStaff}/${encodedKpi}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage(response.data.message || "Target has been updated successfully!");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error during PATCH request:", error);
      setMessage(error.response?.data?.message || "Failed to update the target.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#EAEAEA] h-full flex flex-col items-center sm:pt-[75px] pt-[60px] sm:pr-4 pr-3 sm:ml-20 ml-10">
      <div className="flex items-center w-full">
        <h2 className="sm:text-[40px] text-[24px] sm:ml-5 ml-4 font-semibold">Update Target Staff</h2>
        <Link href="/beranda">
          <IoIosArrowDropleftCircle className="sm:h-10 sm:w-10 h-5 w-5 sm:ml-3 ml-1" />
        </Link>
      </div>
      <div className="bg-white rounded-2xl h-auto mb-16 sm:ml-5 ml-3 w-full sm:pt-4 pt-6">
        <div className="pl-8 mt-4">
          <h2 className="sm:text-[30px] text-[24px] font-semibold mb-5">Update Target Tahunan</h2>
          <div className="mb-4 flex gap-5">
            <div>
              <label htmlFor="staffSelect" className="block mb-2">Nama Staff:</label>
              <select
                id="staffSelect"
                className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md bg-white"
                value={selectedStaff}
                onChange={handleStaffChange}
              >
                <option value="">Select Nama Staff</option>
                {namaStaff.map((staff) => (
                  <option key={staff.user_id} value={staff.user_id}>
                    {staff.nama}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="kpiSelect" className="block mb-2">Nilai KPI:</label>
              <select
                id="kpiSelect"
                className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md bg-white"
                onChange={handleKpiChange}
                value={selectedKpi}
                disabled={loading || !selectedStaff}
              >
                <option value="">Pilih KPI</option>
                {loading ? (
                  <option disabled>Loading...</option>
                ) : (
                  kpiData && Array.isArray(kpiData) && kpiData.length > 0 ? (
                    kpiData.map(({ id, nama_kpi }) => (
                      <option key={id} value={nama_kpi}>
                        {nama_kpi}
                      </option>
                    ))
                  ) : (
                    <option disabled>No KPI available</option>
                  )
                )}
              </select>
            </div>
          </div>

          {selectedKpi && (
            <div className="mb-4">
              <div className="mb-2">
                <label htmlFor="monthSelect" className="block">Pilih Bulan:</label>
                <select
                  id="monthSelect"
                  className="border border-gray-300 sm:w-[200px] w-[100px] p-2 rounded-md bg-white"
                  onChange={handleMonthChange}
                  value={selectedMonth}
                >
                  <option value="">Select Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month.charAt(0).toUpperCase() + month.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {selectedMonth && (
                <div>
                  <label htmlFor="targetInput" className="block mb-2">
                    Target {selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}:
                  </label>
                  <input
                    type="number"
                    className="border border-gray-500 p-2 w-1/3 rounded-md mb-2 bg-white"
                    value={targetValue || ""}
                    onChange={handleTargetChange}
                    placeholder="Enter target value"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end mt-5 mr-3">
            <button
              className="bg-blue-500 text-white px-4 py-2 mb-10 rounded-md mr-2"
              onClick={handleSubmit}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <div className="flex justify-center items-center mb-4">
              <FaRegCheckCircle className="text-green-500" size={60} />
            </div>
            <p className="text-lg font-semibold">Target berhasil diperbarui.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={closeModal}
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Page;
