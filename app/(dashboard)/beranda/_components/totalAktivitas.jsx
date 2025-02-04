import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { GiProgression } from "react-icons/gi";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TotalAktivitas = () => {
  const [aktivitasData, setAktivitasData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAktivitas = async () => {
      setIsLoading(true);
      setError("");
      try {
        const response = await axios.get("https://backend-monitoring-btn-production.up.railway.app/api/total-aktivitas");
        setAktivitasData(response.data.data);
      } catch (err) {
        console.error("Error fetching aktivitas data:", err);
        setError("Gagal memuat data aktivitas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAktivitas();
  }, []);

  const chartData = {
    labels: aktivitasData.map((item) => item.aktivitas),
    datasets: [
      {
        label: "Total Aktivitas",
        data: aktivitasData.map((item) => item.total_aktivitas),
        backgroundColor: "#4F8EF7",
        borderColor: "#3E7BCC",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Aktivitas yang Paling Banyak Dilakukan",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="md:flex-row flex-col sm:ml-11 sm:mx-0 mx-5 sm:mt-7 mt-4 p-6 sm:h-[400px] h-[220px] bg-white rounded-lg shadow-md">
      <div className="flex sm:mx-6 items-center mx-5 justify-between ">
        <div className="flex gap-2 items-center transition-colors duration-300">
          <GiProgression className="sm:text-3xl text-2xl" />
          <p className="sm:text-[22px] text-[16px] font-semibold ">
            Total Aktivitas            </p>
        </div>
      </div>
      <hr className="border-t border-black my-3 mx-6 " />
      {isLoading ? (
        <p className="text-center">Loading data...</p>
      ) : error ? (
        <p>{error}</p>
      ) : aktivitasData.length > 0 ? (
        <div className="flex justify-center items-center h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p>Tidak ada data aktivitas yang ditemukan.</p>
      )}
    </div>
  );
};

export default TotalAktivitas;
