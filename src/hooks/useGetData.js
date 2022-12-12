import { useState, useEffect } from 'react';
import { useAuthHeader } from './useAuthHeader';

export const useGetData = (mode, city, page = 1, keyword = null) => {
  const [data, setData] = useState(null);
  const [perPage, setPerPage] = useState(6);
  const { Authorization, GMTString } = useAuthHeader();
    
  useEffect(() => {
    let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}/${city === 'Taiwan'? '' : city}?$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
    url += `&$select=${mode}ID,${mode}Name,Address,Picture`;
    if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
    if (mode === "Restaurant") url += ",Class,OpenTime";
    if (mode === "Hotel") url += ",Class";
    if (mode === "Activity") url += ",Class1,Class2";
    url += `&$filter=Picture/PictureUrl1 ne null`;
    if(keyword) {
      let filter = "";
      keyword.split(',').forEach((k) => {
        filter += ` or contains(${mode}Name, '${k}') `;
        if (mode === "Restaurant" || mode === "Hotel")
          filter += ` or contains(Class,'${k}')`;
        if (mode === "ScenicSpot" || mode === "Activity")
          filter += ` or contains(Class1,'${k}') or contains(Class2,'${k}')`;
        if (mode === "ScenicSpot") filter += ` or contains(Class3,'${k}')`;
      })
      filter = filter.replace(" or ", "");
      url += ` and (${filter})`;
    }

    const fetchData = async() => {
      try {
        const res = await fetch(url, { headers: { Authorization, 'X-Date': GMTString } });
        const data = await res.json();
        setData(data);
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [mode, city, page, keyword, perPage, Authorization, GMTString])
  
  return { data }
}