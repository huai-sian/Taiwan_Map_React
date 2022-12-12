import { useState, useEffect } from "react";

export const useDataFilter = (arr, count = 4) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchLib = (arr, count) => {
      return new Promise((resolve) => {
        const result = [];
        for(let i = 0; i < count; i++) {
          if(!arr.length ) {
            return
          }
          const idx = Math.floor(Math.random() * arr.length);
          result.push(arr[idx]);
          arr.splice(idx, 1);
        }
        resolve(result);
      });
    }

    fetchLib(arr, count).then((res) => {
      setData(res);
    });

  }, [arr, count])
  
  return { data }
}