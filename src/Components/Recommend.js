import { useState, useEffect, useCallback } from 'react';
import { useGetData } from './../hooks/useGetData';
import { Link } from "react-router-dom";

const dataFilter = (arr, count = 4) => {
  const result = [];
  for(let i = 0; i < count; i++) {
    if(!arr.length ) {
      return
    }
    const idx = Math.floor(Math.random() * arr.length);
    result.push(arr[idx]);
    arr.splice(idx, 1);
  }
  return result;
}

export default function Recommend({ recMode, amount}) {
  const [result, setResult] = useState(null);
  const { data } = useGetData(recMode, 'Taiwan');
  
  const memoizedDataFilter = useCallback(() => {
    return dataFilter(data, amount);
  }, [data, amount]);

  useEffect(() => {
    if(data) {
      setResult(memoizedDataFilter());
    }
    console.log(data);
  }, [data, memoizedDataFilter]);
  return (
    <div className={`card-${recMode}`}>
      {result && result.map((item, i) => {
        return (
          <Link key={item[`${recMode}ID`]} to={`/detail/${item[recMode+'ID']}`} className="card">
              <div className="card-box">
                <img className="card-img" 
                  src={item.Picture.PictureUrl1}
                  alt={item.Picture.PictureDescription1 || item[`${recMode}Name`]}></img>
              </div>
              <div className="card-content">
                <h2 className="card-title" >{item[recMode + 'Name']}</h2>
                {item.Date &&
                  <p className="card-text mb-1" >
                    <i className="ico-calendar"></i>
                    <span>{item.Date.split('T')[0]}</span>
                  </p>
                }
                {item.TicketInfo && 
                  <p className="card-text mb-1" >
                    <i className="ico-ticket"></i>
                    <span>{item.TicketInfo}</span>
                  </p>
                }
                {!item.Date && item.StartTime && 
                  <p className="card-text mb-1" >
                    <i className="ico-calendar"></i>
                    {item.StartTime === item.EndTime ?
                      <span>{item.EndTime.split('T')[0]}</span> :
                      <>
                        <span>{item.StartTime.split('T')[0]} ~ </span>
                        <span>{item.EndTime.split('T')[0]}</span>
                    </>}
                  </p>
                }
                {item.OpenTime && 
                  <p className="card-text mb-1" >
                    <i className="ico-clock-time"></i>
                    <span>{item.OpenTime}</span>
                  </p>
                }
                {item.Address && 
                  <p className="card-text mb-1" >
                    <i className="ico-location-pin"></i>
                    { item.Location && 
                      <span>{item.Location}</span>
                    }
                    <span>{item.Address}</span>
                  </p>
                }
                <p className="card-text mb-1">
                  <i className="ico-tags"></i>
                  {item.Class && <span className="card-tag">{item.Class}</span>}
                  {item.Class1 && <span className="card-tag">{item.Class1}</span>}
                  {item.Class2 && <span className="card-tag">{item.Class2}</span>}
                  {item.Class3 && <span className="card-tag">{item.Class3}</span>}
                </p>
                
              </div>
            
          </Link>
        )
      })}
    </div>
  )
}