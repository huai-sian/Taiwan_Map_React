import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { cityLib, modeLib } from "./../lib.js";
import img1 from './../Images/theme_1.png';
import img2 from './../Images/theme_2.png';
import img3 from './../Images/theme_3.png';
import img4 from './../Images/theme_4.png';
import img5 from './../Images/theme_5.png';
import img6 from './../Images/theme_6.png';
import img7 from './../Images/theme_7.png';
import img8 from './../Images/theme_8.png';


export default function Header({ handleSelectCity, city }) {
  let navigate = useNavigate();
  const [mode, setMode] = useState('ScenicSpot');
  const [keyword, setKeyword] = useState('');
  const [openCity, setOpenCity] = useState(false);
  const [chMode, setChMode] = useState('臺灣');

  const cityFilter = (region) => {
    return Object.keys(cityLib).filter((item) => cityLib[item].region === region)
  };
  const cityName = (city) => cityLib[city].name;
  const goSearch = (nowMode, nowCity, nowKeyword) => {
    console.log(mode, city, keyword);
    navigate(`/search?mode=${nowMode}&city=${nowCity}&keyword=${nowKeyword.split(" ").join()}`);
  }
  
  useEffect(() => {
    setChMode(() => {
      return modeLib[mode];
    })
  }, [mode])
  
  return (
    <div className="header">
      <div className="header-main d-flex align-items-center justify-content-between">
        <Link to="/" className="header-logo"></Link>
        <button className="header-btn">
          <i className="fas fa-chevron-left"></i>
        </button>
      </div>
      <div className="header-select d-flex" onClick={() => setOpenCity(prev => !prev)}>
        <span className="select-input">{cityName(city)} | {chMode}</span>
        <button className={`select-btn ${openCity ? '' : 'down'}`}>
          <i className="fas fa-chevron-circle-down"></i>
        </button>
      </div>
      <div 
        className={`
          drowdown df-around bdrs-xl
          ${ openCity ? 'shadow': '' }
          ${ openCity? 'show' : '' }
        `}
      >
      <h3 className="dropdown-title">選擇區域</h3>
      <span className="tabs-ctl-item" style={{width: '15%', textAlign: 'start'}}>臺灣</span>
      <div className="tabs">
        <input type="radio" id="tabs1" className="tabs-radio" name="tabs" defaultChecked='true' />
        <input type="radio" id="tabs2" className="tabs-radio" name="tabs" />
        <input type="radio" id="tabs3" className="tabs-radio" name="tabs" />
        <input type="radio" id="tabs4" className="tabs-radio" name="tabs" />
        <ul className="tabs-cnt">
          <li className="tabs-cnt-item d-flex justify-content-around">
            {cityFilter('North').map(item => (
              <span 
                key={cityName(item)}
                onClick={() => handleSelectCity(item)}
                className={`drowdown-item bdrs-sm ${item === city ? 'active' : ''}`}
              >
                {cityName(item)}
              </span>
            ))}
          </li>
          <li className="tabs-cnt-item d-flex justify-content-around">
            {cityFilter('Central').map(item => (
              <span 
                key={cityName(item)}
                onClick={() => handleSelectCity(item)}
                className={`drowdown-item bdrs-sm ${item === city ? 'active' : ''}`}
              >
                {cityName(item)}
              </span>
            ))}
          </li>
          <li className="tabs-cnt-item d-flex justify-content-around">
            {cityFilter('South').map(item => (
              <span 
                key={cityName(item)}
                onClick={() => handleSelectCity(item)}
                className={`drowdown-item bdrs-sm ${item === city ? 'active' : ''}`}
              >
                {cityName(item)}
              </span>
            ))}
          </li>
          <li className="tabs-cnt-item d-flex justify-content-around">
            {cityFilter('East').map(item => (
              <span 
                key={cityName(item)}
                onClick={() => handleSelectCity(item)}
                className={`drowdown-item bdrs-sm ${item === city ? 'active' : ''}`}
              >
                {cityName(item)}
              </span>
            ))}
          </li>
          <li className="tabs-cnt-item d-flex justify-content-around">
            {cityFilter('Outer').map(item => (
              <span 
                key={cityName(item)}
                onClick={() => handleSelectCity(item)}
                className={`drowdown-item bdrs-sm ${item === city ? 'active' : ''}`}
              >
                {cityName(item)}
              </span>
            ))}
          </li>
        </ul>
        <div className="tabs-ctl d-flex justify-content-around">
          <label htmlFor="tabs1" className="tabs-ctl-item">北部</label>
          <label htmlFor="tabs2" className="tabs-ctl-item">中部</label>
          <label htmlFor="tabs3" className="tabs-ctl-item">南部</label>
          <label htmlFor="tabs4" className="tabs-ctl-item">東部&離島</label>
        </div>
      </div>
      <hr className="dropdown-hr" />
      <h3 className="dropdown-title">選擇類型</h3>
      <div className="dropdown-mode d-flex justify-content-around align-items-center" style={{flexWrap: 'wrap'}}>
        <span
          className={`
            drowdown-item bdrs-sm
            ${mode === 'ScenicSpot' ? 'active' : ''}
          `}
          onClick={() => setMode('ScenicSpot')}
          >景點</span>
        <span
          className={`
            drowdown-item bdrs-sm
            ${mode === 'Restaurant' ? 'active' : ''}
          `}
          onClick={() => setMode('Restaurant')}
        >餐飲</span>
        <span
          className={`
            drowdown-item bdrs-sm
            ${mode === 'Hotel' ? 'active' : ''}
          `}
          onClick={() => setMode('Hotel')}
        >旅宿</span>
        <span
          className={`
            drowdown-item bdrs-sm
            ${mode === 'Activity' ? 'active' : ''}
          `}
          onClick={() => setMode('Activity')}
        >活動</span>
      </div>
      <button className="dropdown-btn fz-sm bdrs-sm" onClick={() => setOpenCity(prev => !prev)}>
        OK!
      </button>
    </div>
    <div className="textbox d-flex">
      <input 
        type="text"
        placeholder="多筆資料用空格格開(選填)"
        className="textbox-input"
        onChange={(e) => setKeyword(e.target.value)} />
      <button  className="textbox-btn">
        <i className="fas fa-search"></i>
      </button>
    </div> 
    <button className="searchBtn" onClick={() => goSearch(mode, city, keyword)}>
      <i className="fas fa-search"></i>
      開始搜尋
      </button>
    <h3 className="title">精選主題</h3>
    <div className="theme d-flex justify-content-around align-items-center">
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('ScenicSpot', 'Taiwan', '觀光,遊憩')}
      >
        <img
          src={img1}
          alt="觀光遊憩"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">觀光遊憩</h4>
      </div>
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('ScenicSpot', 'Taiwan', '自然,風景')}
      >
        <img
          src={img2}
          alt="自然風景"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">自然風景</h4>
      </div>
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('Restaurant', 'Taiwan', '地方特產')}
      >
        <img
          src={img3}
          alt="地方特產"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">地方特產</h4>
      </div>
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('Restaurant', 'Taiwan', '異國料理')}
      >
        <img
          src={img4}
          alt="異國料理"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">異國料理</h4>
      </div>
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('Hotel', 'Taiwan', '度假,民宿')}
      >
        <img
          src={img5}
          alt="度假民宿"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">度假民宿</h4>
      </div>
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('Hotel', 'Taiwan', '國際,旅館')}
      >
        <img
          src={img6}
          alt="國際旅館"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">國際旅館</h4>
      </div>
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('Activity', 'Taiwan', '節慶活動')}
      >
        <img
          src={img7}
          alt="節慶活動"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">節慶活動</h4>
      </div>
      <div
        className="theme-item bdrs-sm"
        onClick={() => goSearch('Activity', 'Taiwan', '藝文,體驗')}
      >
        <img
          src={img8}
          alt="藝文體驗"
          className="theme-img"
        />
        <h4 className="theme-text df-center fz-sm">藝文體驗</h4>
      </div>
    </div>
    </div>
  );
}