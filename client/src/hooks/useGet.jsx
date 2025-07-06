import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function useGet({ endpoint }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  setLoading(true);
  const get = async () => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`);
      if (response.data.success) {
        setData(response.data.data);
      }
      setLoading(false);
      return { data, loading };
    } catch (error) {
      setError(error);
      setLoading(false);
      return { error, loading };
    }
    useEffect(() => {
      get();
    });
  };
  return <div>useGet</div>;
}

export default useGet;
