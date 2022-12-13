import { useState, useEffect, useMemo } from 'react';
import { sloganLib, cityLib } from '../../lib';
import { Link } from "react-router-dom";
import Recommend from './../../Components/Recommend';
import CityImg1 from './../../Images/city_1.jpg';
import CityImg2 from './../../Images/city_2.jpg';
import CityImg3 from './../../Images/city_3.jpg';
import CityImg4 from './../../Images/city_4.jpg';
import CityImg5 from './../../Images/city_5.jpg';
import CityImg6 from './../../Images/city_6.jpg';
import CityImg7 from './../../Images/city_7.jpg';


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

const ImgArr = {
  1: CityImg1,
  2: CityImg2,
  3: CityImg3,
  4: CityImg4,
  5: CityImg5,
  6: CityImg6,
  7: CityImg7,
};


export default function Home() {
  const [slogan, setSlogan] = useState([]);
  const [ranCity, setRanCity] = useState([]);
  const genSlogan = useMemo(() => dataFilter(sloganLib, 1), []);
  const genCity = useMemo(() => dataFilter(Object.entries(cityLib), 7), []);

  /* const getImg = (n) => {
    return ImgArr[n];
  } */

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
        return (<Link to={`/search?mode=ScenicSpot&city=${item[0]}`} key={i} className="hot-city">
          <img src={ImgArr[i+1]} alt={item[0]} className="hot-city-img"/>
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