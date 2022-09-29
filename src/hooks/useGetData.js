import { useState, useEffect } from 'react';
import { useAuthHeader } from './useAuthHeader';

export const useGetData = (mode, city, page = 1, keyword = null) => {
  const [data, setData] = useState(null);
  const [perPage, setPerPage] = useState(6);
  const { Authorization, GMTString } = useAuthHeader();
    
  useEffect(() => {
    let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}/${city === 'Taiwan'? '' : city}?$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
    if(keyword) {
      let filter = "";
      filter += ` or contains(${mode}Name, '${keyword}') `;
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