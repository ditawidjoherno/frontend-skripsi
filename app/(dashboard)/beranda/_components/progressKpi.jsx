import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/lib/cookieFunction";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { RxPieChart } from "react-icons/rx";

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardKPI = () => {
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);
  const bearerToken = `Bearer ${token}`;

  const [selectedStaff, setSelectedStaff] = useState("");
  const [kpiData, setKpiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [namaStaff, setNamaStaff] = useState([]);


  useEffect(() => {
    const fetchNamaStaff = async () => {
      try {
        const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/nama-staff`, {
          headers: {
            Authorization: bearerToken,
          },
        });
        setNamaStaff(response.data.data);
      } catch (err) {
        console.error("Error fetching staff list:", err);
        setError("Gagal memuat daftar staff.");
      }
    };

    fetchNamaStaff();
  }, [bearerToken]);

  useEffect(() => {
    if (selectedStaff) {
      setIsLoading(true);
      setError("");
      setKpiData(null);

      const fetchKPIData = async () => {
        try {
          const response = await axios.get(`https://backend-monitoring-btn-production.up.railway.app/api/nilai-kpi/${selectedStaff}`, {
            headers: {
              Authorization: bearerToken,
            },
          });
          const data = response.data.data;

          if (data && data.rata_rata_kpi) {
            setKpiData(data);
          } else {
            setKpiData(null);
          }
        } catch (err) {
          console.error("Error fetching KPI data:", err);
          setError("Gagal memuat data KPI.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchKPIData();
    } else {
      setKpiData(null);
    }
  }, [selectedStaff, bearerToken]);

  const getColor = (percentage) => {
    if (percentage >= 130) return "#6EE014";
    if (percentage >= 110) return "#6EE014";
    if (percentage >= 100) return "#2196F3";
    if (percentage >= 95) return "#FFEB3B";
    if (percentage >= 85) return "#FF9800";
    return "#F44336";
  };

  const pieChartData = {
    labels: ["Nilai KPI", "Sisa Target"],
    datasets: [
      {
        label: "KPI",
        data: kpiData
          ? [Math.min(kpiData.rata_rata_kpi, 130), 130 - Math.min(kpiData.rata_rata_kpi, 130)]
          : [0, 130],
        backgroundColor: kpiData
          ? [getColor(kpiData.rata_rata_kpi), "#e0e0e0"]
          : ["#e0e0e0", "#e0e0e0"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-white md:flex-row flex-col sm:ml-6 sm:mx-0 mx-5 sm:mt-7 mt-4 rounded-lg sm:h-[490px] h-[350px] sm:w-auto w-auto sm:mb-5 mb-0 sm:mr-6">
      <div className="flex sm:mx-9 items-center mx-5 pt-4 justify-between">
        <div className="flex gap-2 items-center transition-colors duration-300">
          <RxPieChart className="sm:text-3xl text-2xl" />
          <p className="sm:text-[22px] text-[16px] font-semibold">Progress KPI</p>
        </div>
      </div>
      <hr className="border-t border-black my-3 mx-6" />
      <div className="mb-4 ml-9 mr-9">
        <label htmlFor="staffDropdown" className="block sm:text-lg text-sm font-medium mb-2">
          Pilih Staff:
        </label>
        <select
          id="staffDropdown"
          value={selectedStaff}
          onChange={(e) => setSelectedStaff(e.target.value)}
          className="w-full sm:text-lg text-[10px] border border-gray-300 rounded-md p-2"
        >
          <option value="">Pilih Staff</option>
          {namaStaff.length > 0 ? (
            namaStaff.map((staff) => (
              <option key={staff.nip} value={staff.nip}>
                {staff.nama}
              </option>
            ))
          ) : (
            <option disabled>Data staff tidak tersedia</option>
          )}
        </select>
      </div>
      <div className="bg-white rounded-b-2xl text-center justify-center items-center">
        {selectedStaff && (
          <h3 className="sm:text-lg text-sm font-bold mb-2">
            Rata-rata KPI: {kpiData?.rata_rata_kpi ? `${kpiData.rata_rata_kpi}%` : "Data tidak tersedia"}
          </h3>
        )}
        {isLoading ? (
          <p>Loading KPI data...</p>
        ) : kpiData ? (
          <div className="flex justify-center items-center">
            <div className="w-[150px] h-[150px] sm:w-[280px] sm:h-[280px]">
              <Pie data={pieChartData} options={{ ...options, maintainAspectRatio: false }} />
            </div>
          </div>

        ) : selectedStaff ? (
          <p className="sm:text-lg text-sm">Staff ini belum mempunyai nilai KPI.</p>
        ) : (
          <p className="sm:text-lg text-sm">Silakan pilih staff untuk melihat KPI.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardKPI;
