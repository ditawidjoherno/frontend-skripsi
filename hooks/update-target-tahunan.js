"use client";

import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import useUserStore from "./use-data-user";

const updateTargetTahunan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME; 
  const token = getCookie(cookie); 
  const { user } = useUserStore(); 

  const bearerToken = token ? `Bearer ${token}` : null;

  const storeTargetTahunan = async (user_id, kpi_name, body) => {
    setLoading(true);
    setError(null);
    setData(null);

    if (!bearerToken) {
      setError("Authorization token is missing");
      return;
    }

    try {
      const response = await axios.patch(
        `https://backend-monitoring-btn-production.up.railway.app/api/update-target-tahunan/${user_id}/${kpi_name}`,
        body, 
        { headers: { Authorization: bearerToken } }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to send target data");
      }

      setData(response.data.message);
      return response.data.message; 

    } catch (error) {
      setError(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, storeTargetTahunan };
};

export default updateTargetTahunan;
