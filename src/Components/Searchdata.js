import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useGetData } from './../hooks/useGetData';
import { sloganLib, cityLib, modeLib } from './../lib.js';
import Error from './Error';

import Banner_Activity from './../Images/banner_Activity.png';
import Banner_Hotel from './../Images/banner_Hotel.png';
import Banner_Restaurant from './../Images/banner_Restaurant.png';
import Banner_ScenicSpot from './../Images/banner_ScenicSpot.png';

const ImgArr = {
  Activity: Banner_Activity,
  Hotel: Banner_Hotel,
  Restaurant: Banner_Restaurant,
  ScenicSpot: Banner_ScenicSpot,
};

export default function Searchdata() {
  let params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let mode = searchParams.get('mode');
  let city = searchParams.get('city');
  let keyword = searchParams.get('keyword');
  const [page, setPage] = useState(1);

  const { data } = useGetData(mode, city, page, keyword);


  const getTitle = () => {
    if(keyword) {
      return keyword.split(',').join(' ');
    } else if(city) {
      return city.replace(/[A-Z]/g, " $&");
    } else {
      return mode;
    }
  }


  return (
    <div className="search">
      <div className="banner shadow">
        <img className="banner-img" alt="Travel Guide" src={ImgArr[mode]} />
        <h1 className="banner-text">
          {getTitle()}
        </h1>
      </div>
    <div className="mode">
      <Link
        to={`/search?mode=ScenicSpot&city=${city}&keyword=${keyword || ""}`}
        className={`mode-btn bdrs-sm ${mode === 'ScenicSpot'? 'active': ''}`}
      >
        景點
      </Link>
      <Link
        to={`/search?mode=Restaurant&city=${city}&keyword=${keyword || ""}`}
        className={`mode-btn bdrs-sm ${mode === 'Restaurant'? 'active': ''}`}
      >
        餐飲
      </Link>
      <Link
        to={`/search?mode=Hotel&city=${city}&keyword=${keyword || ""}`}
        className={`mode-btn bdrs-sm ${mode === 'Hotel'? 'active': ''}`}
      >
        旅宿
      </Link>
      <Link
        to={`/search?mode=Activity&city=${city}&keyword=${keyword || ""}`}
        className={`mode-btn bdrs-sm ${mode === 'Activity'? 'active': ''}`}
      >
        活動
      </Link>
    </div>
    {data && 
      <div className={`card-${mode}`}>
        {data.length == 0 && <Error />}
        {data.length > 0 && data.map((item, i) =>  (
          <Link to={`/detail/${item[mode+'ID']}`} className="card bdrs-sm" key={item[mode+'ID']}>
            <div className="card-box">
              <img className="card-img" 
                src={item.Picture.PictureUrl1}
                alt={item.Picture.PictureDescription1 || item[`${mode}Name`]}></img>
            </div>
            <div className="card-content">
              <h2 className="card-title">{item[mode+'Name']}</h2>
              {item.Date &&
                  <p className="card-text mb-1" >
                    <i className="ico-calendar"></i>
                    <span>{item.Date.split('T')[0]}</span>
                  </p>
                }
              {!item.Date && item.StartTime && 
                  <p className="card-text mb-1">
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
                <p>
                  <i className="fas fa-clock"></i>
                  <span>{item.OpenTime.split(';')[0]} ~ </span>
                </p>
              }
              {item.TicketInfo && 
                <p>
                  <i className="far fa-ticket"></i>
                  <span>{item.TicketInfo.split(';')[0]} ~ </span>
                </p>
              }
              {item.Address && 
                <p>
                  <i className="fas fa-location-arrow"></i>
                  {item.Location && 
                    <span>{item.Location}</span>
                  }
                  <span>{item.Address}</span>
                </p>
              }
              <p className="card-text mb-1">
                <i className="fas fa-tag"></i>
                {item.Class && <span className="card-tag">{item.Class}</span>}
                {item.Class1 && <span className="card-tag">{item.Class1}</span>}
                {item.Class2 && <span className="card-tag">{item.Class2}</span>}
                {item.Class3 && <span className="card-tag">{item.Class3}</span>}
              </p>
            </div>
          </Link>
          )
        )}
      </div>}
    <div className="pagination d-flex">
      {page >= 2 && 
        <button className={`loadBtn fz-md bdrs-sm`} onClick={() => setPage(prev => prev - 1)}>
          上一頁
        </button>
      }
      {data && data.length == 6 &&
        <button className={`loadBtn fz-md bdrs-sm`} onClick={() => setPage(prev => prev + 1)}>
          下一頁
        </button>
      }
    </div>
    
  </div>
  )
}