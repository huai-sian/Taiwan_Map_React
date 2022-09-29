import { useState, useEffect } from 'react';
import { useAuthHeader } from './useAuthHeader';

export const useNearInfo = (mode, lat, lon, page = 1) => {
  const [data, setData] = useState(null);
  const [perPage, setPerPage] = useState(6);
  const { Authorization, GMTString } = useAuthHeader();

  useEffect(() => {

    let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}?`;
    url += `$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
    url += `&$select=${mode}ID,${mode}Name,Address,Picture`;
    if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
    if (mode === "Restaurant") url += ",Class,OpenTime";
    if (mode === "Hotel") url += ",Class";
    if (mode === "Activity") url += ",Class1,Class2";
    url += `&$spatialFilter=nearby(${lat},${lon},50000)`;

    const fetchData = async() => {
      try {
        const res = await fetch(url, { headers: { Authorization, 'X-Date': GMTString } });
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();

  }, [mode, lat, lon, page, perPage, Authorization, GMTString])
  
  return { data }
}