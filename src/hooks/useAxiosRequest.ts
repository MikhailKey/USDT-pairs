import { useState, useEffect } from 'react';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.flatqube.io/v1/pairs',
});

export const useAxiosRequest = <T>(
  url: string,
  method: string,
  payload: any
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await instance.request({
          data: payload,
          method,
          url,
        });
        setData(response.data as T);
      } catch (error: any) {
        setError(error.message as string);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return { data, error, loading };
};
