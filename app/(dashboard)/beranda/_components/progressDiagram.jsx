"use client";

import React, { useEffect, useState } from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { getCookie } from "@/lib/cookieFunction";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const KPIProgress = () => {
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyKpi, setMonthlyKpi] = useState([]);
  const [kpiValue, setKpiValue] = useState(0); // Tambahkan state baru

  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);
  const bearerToken = `Bearer ${token}`;

  useEffect(() => {
    const fetchKpiData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://backend-monitoring-btn-production.up.railway.app/api/rata-rata-kpi', {
          headers: {
            Authorization: bearerToken,
          },
        });

        console.log('Response:', response.data);
        const data = response.data?.data;

        if (data) {
          if (data.rata_rata_kpi) {
            const percentage = (data.rata_rata_kpi / 130) * 100;
            setPercentage(percentage);
            setKpiValue(data.rata_rata_kpi); // Simpan nilai rata-rata KPI
          } else {
            setPercentage(0);
            setKpiValue(0); // Set nilai ke 0 jika tidak ada data
          }
          if (data.total_nilai_kpi && Array.isArray(data.total_nilai_kpi)) {
            setMonthlyKpi(data.total_nilai_kpi);
          } else {
            setMonthlyKpi(new Array(12).fill(0));
          }
        }
      } catch (err) {
        console.error('Error:', err.response?.data || err.message);
        setError('Anda belum mempunyai Nilai KPI!');
      } finally {
        setLoading(false);
      }
    };


    fetchKpiData();
  }, []);

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total KPI',
        data: monthlyKpi,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total KPI per Bulan',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 130,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="bg-white sm:ml-6 sm:mt-5 sm:mr-5 mt-4 rounded-lg sm:h-[620px] h-[350px] sm:w-auto w-[400px]">
      <div className="flex sm:mx-9 items-center mx-5 pt-4 justify-between">
        <div className="flex gap-2 items-center">
          <IoAnalyticsSharp className="sm:text-3xl text-2xl" />
          <p className="sm:text-[22px] text-[16px] font-semibold">KPI Progress</p>
        </div>
      </div>
      <hr className="border-t border-black mx-6" />
      <div className="flex justify-center items-center bg-white rounded-b-2xl sm:h-auto h-[200px]">
        {loading ? (
          <p className="text-gray-500 mt-8">Memuat data KPI...</p>
        ) : error ? (
          <p className="text-black mt-8">{error}</p>
        ) : (
          <div className="w-full h-full">
            <div className="justify-between space-x-8">
              <div className="ml-5 mt-8">
                <h3 className="text-[12px] mt-2 font-semibold text-center mb-3">Nilai KPI per Tahun</h3>
                <div className="flex justify-center items-center">
                  <div className="w-40 h-40">
                    <CircularProgressbar
                      value={percentage}
                      text={`${kpiValue}%`}
                      styles={buildStyles({
                        textColor: "#000",
                        pathColor: percentage > 75 ? "#6EE014" : "#FFE500",
                        trailColor: "#ddd",
                        textSize: "18px",
                      })}
                    />

                  </div>
                </div>
              </div>
              <div className="w-[480px] h-[300px] mt-8">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIProgress;
