"use client";

import { getCookie } from "@/lib/cookieFunction";
import axios from "axios";
import { useState } from "react";
import useUserStore from "./use-data-user";

const updateTargetTahunan = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const cookie = process.env.NEXT_PUBLIC_COOKIE_NAME; // Retrieve the cookie name
  const token = getCookie(cookie); // Fetch the token from the cookie
  const { user } = useUserStore(); // Store user info from Zustand

  // Ensure the bearerToken is only created if token is available
  const bearerToken = token ? `Bearer ${token}` : null;

  const storeTargetTahunan = async (user_id, kpi_name, body) => {
    setLoading(true);
    setError(null);
    setData(null);

    // Ensure that the bearerToken exists before making the request
    if (!bearerToken) {
      setError("Authorization token is missing");
      return;
    }

    try {
      // API request to the endpoint
      const response = await axios.patch(
        `http://localhost:8000/api/update-target-tahunan/${user_id}/${kpi_name}`,
        body, // Body containing the new target value
        { headers: { Authorization: bearerToken } }
      );

      // Check if the response status is successful
      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to send target data");
      }

      // Set the response data to state if successful
      setData(response.data.message);
      return response.data.message; // Returning message for further use

    } catch (error) {
      // Handle error if request fails
      setError(error.response?.data?.message || error.message);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, storeTargetTahunan };
};

export default updateTargetTahunan;
