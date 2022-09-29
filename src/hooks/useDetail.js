import { useState, useEffect } from 'react';
import { useAuthHeader } from './useAuthHeader';
import { useMode } from './useMode';

export const useDetail = (id) => {
  const [data, setData] = useState(null);
  const { Authorization, GMTString } = useAuthHeader();
  const { mode } = useMode(id, true);
  const { mode: chMode } = useMode(id, false);
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${mode}/?$format=JSON&$filter=${mode}ID eq '${id}'`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res =  await fetch(url, { headers:  { Authorization, 'X-Date': GMTString  } });
        const data = await res.json();
        if (data[0].StartTime === data[0].EndTime) data[0].Date = data[0].EndTime;
        setData(data[0]);
      } catch(err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id, Authorization, GMTString, mode, url])

  return { data, mode, chMode }
}