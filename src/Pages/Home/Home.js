import { useState, useEffect, useMemo } from 'react';
import { sloganLib, cityLib } from '../../lib';
import { useDataFilter } from '../../hooks/useDataFilter';
import { Link } from "react-router-dom";
import Recommend from './../../Components/Recommend';

import './Home.scss';

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

export default function Home() {
  const [slogan, setSlogan] = useState([]);
  const [ranCity, setRanCity] = useState([]);
  const genSlogan = useMemo(() => dataFilter(sloganLib, 1), []);
  const genCity = useMemo(() => dataFilter(Object.entries(cityLib), 7), []);

  const getImg = (n) => {
    return require(`./../../Images/city_${n}.jpg`);
  }

  useEffect(() => {
    setSlogan(genSlogan[0]);
  }, [genSlogan]);

  useEffect(() => {
    setRanCity(genCity);
  }, [genCity]);

  
  return (
    <div className="home">
    <div className="banner shadow">
      <h1 className="banner-text">
        <span>{slogan[0]}</span><br />
        <span>{slogan[1]}</span>
      </h1>
    </div>
    <h2 className="title">熱門景點</h2>
    <div className="hot">
      {ranCity.map((item, i) => {
        return (<Link to="/" key={i} className="hot-city">
          <img src={getImg(i+1)} alt={item[0]} className="hot-city-img"/>
          <div className="hot-city-content">
            <span>{item[1].name}</span>
          </div>
        </Link>)
      })}
    </div>
      
    <h2 className="title">打卡美食</h2>
    <Recommend recMode={"Restaurant"} amount={3} />
    <h2 className="title">住宿推薦</h2>
    <Recommend recMode={"Hotel"} amount={3} />
    <h2 className="title">觀光活動</h2>
    <Recommend recMode={"Activity"} amount={3} />
  </div>
  )
}