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

  const getNamaKpi = async (userId) => {
    setLoading(true); 
    setError(null);  
    setData(null);   

    try {
      const response = await axios.get(
        `https://backend-monitoring-btn-production.up.railway.app/api/admin/target-kpi/${userId}`,
        {
          headers: { Authorization: bearerToken },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to get KPIs.");
      }

      setData(response.data.data); 
    } catch (error) {
      setError(error.message || "An error occurred while fetching KPIs.");
    } finally {
      setLoading(false); 
    }
  };

  return { loading, error, data, getNamaKpi };
};

export default useNamaKpiAdm;
