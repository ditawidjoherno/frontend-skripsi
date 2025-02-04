import { useState } from "react";
import axios from "axios";
import { getCookie } from "@/lib/cookieFunction";

const useNamaKpiAdm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;
  const token = getCookie(cookie);

  const bearerToken = `Bearer ${token}`;

  // Mendapatkan KPI untuk user yang dipilih
  const getNamaKpi = async (userId) => {
    setLoading(true); // Set loading to true sebelum API call
    setError(null);    // Reset error state
    setData(null);     // Reset data state

    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/target-kpi/${userId}`,
        {
          headers: { Authorization: bearerToken },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to get KPIs.");
      }

      setData(response.data.data); // Set data dengan response.data.data
    } catch (error) {
      setError(error.message || "An error occurred while fetching KPIs.");
    } finally {
      setLoading(false); // Set loading to false setelah API call selesai
    }
  };

  return { loading, error, data, getNamaKpi };
};

export default useNamaKpiAdm;
