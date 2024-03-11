import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const getUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const result = await axios.get(`${BASE_URL}/api/v1/user/auth`, {
        headers: {
          Authorization: token,
        },
      });

      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return { loggedIn, setLoggedIn, loading };
};

export { useAuth };
