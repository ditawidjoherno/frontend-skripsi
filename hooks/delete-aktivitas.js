import { useState } from "react";
import axios from "axios";
import { getCookie } from "@/lib/cookieFunction";

const useDeleteAktivitas = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME;

  const deleteAktivitas = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const token = getCookie(cookie);
      
      if (!token) {
        throw new Error("Token is null or invalid");
      }

      const response = await axios.delete(`https://backend-monitoring-btn-production.up.railway.app/api/hapus-aktivitas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.status, error.response.data);
        setError(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Request error:", error.request);
        setError("Request error: Failed to send request to server");
      } else {
        console.error("Error:", error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, deleteAktivitas };
};

export default useDeleteAktivitas;
