import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './Model/action';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from '@emotion/styled';
import Header from './Components/Header';
import Recommend from './Components/Recommend';
import Home from './Pages/Home/Home';
import Detail from './Pages/Detail/Detail';
import Search from './Pages/Search/Search';

import './App.css';
import './css/variables.scss';
import './css/common.scss';


const Container = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  box-sizing: border-box;
  align-items: flex-start;
  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;

const Head = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 350px;
  height: 100vh;
  padding: 1.5rem;
  background-color: white;
  overflow: scroll;
  box-sizing: border-box;
  @media screen and (max-width: 1024px) {
    position: fixed;
    z-index: 10;
    transform: translateX(-150%);
    transition: transform .5s;
  }
  @media screen and (max-width: 767px) {
    width: 100vw;
  }
  &.show {
    @media screen and (max-width: 1024px) {
      transform: translateX(0%);
    }
  }
`


function App() {
  const [city, setCity] = useState('Taiwan');
  const [mode, setMode] = useState('ScenicSpot');
  const elementTop = useRef();
  const testData = useSelector(state => state.testData);
  const data = useSelector(state => state.data);
  const dispatch = useDispatch();

  const handleSelectCity = (val) => {
    setCity(val);
  };
  const handleMode = (val) => {
    setMode(val);
  }

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    const root = (val) => {
      document.documentElement.style.setProperty("--c-main", val);
    }
    if (mode === "ScenicSpot") root("#3fb195");
    if (mode === "Restaurant") root("#ff9999");
    if (mode === "Hotel") root("#A79BFD");
    if (mode === "Activity") root("#feb155");

  }, [mode])
  
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  useEffect(() => {
    if(data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Head>
            <Header handleSelectCity={handleSelectCity} city={city}></Header>
          </Head>
          <div className="box">
            <div className="goTop df-center fz-xl bdrs-xl shadow" onClick={scrollTop} ref={elementTop}>
              <i className="fas fa-chevron-up"></i>
            </div>
            <nav className="nav shadow">
              <button className="nav-btn show">
                <i className="ico-settings"></i>
              </button>
              <button className="nav-btn"><i className="fas fa-bars"></i></button>
            </nav>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/detail/:id" element={<Detail handleMode={handleMode} mode={mode} />}>
              </Route>
              <Route path="/search"  element={<Search handleMode={handleMode} mode={mode}/>}>
              </Route>
            </Routes>
            <footer className="foot df-around">
              <p><i className="icoTW-main-island"></i>TAIWAN TRAVEL</p>
              <p>Source：交通部PTX服務平臺</p>
            </footer>
          </div>
        </Container>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
