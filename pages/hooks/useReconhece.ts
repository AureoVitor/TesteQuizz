import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ErrorContext } from "./Error";

export const useReconhece = (rout: string) => {
  const [loading, setloading] = useState<any>();
  const [data, setData] = useState<any>();

  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    setloading(true);
    const api = `http://20.201.78.20/platform-catalog-desktop-client/api/${rout}`;

    const token = window.localStorage.getItem("");

    axios({
      url: api,
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data.data);
        setloading(false);
      })
      .catch((error) => {
        setError(JSON.stringify(error));
      });
  }, []);

  return {
    loading,
    error: "",
    data,
  };
};
