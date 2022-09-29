import './Search.scss';
import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from "react-router-dom";
import Searchdata from './../../Components/Searchdata';
import Searchnear from './../../Components/Searchnear';
import { sloganLib, cityLib, modeLib } from './../../lib.js';

export default function Search() {
  let params = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let mode = searchParams.get('mode');
  let city = searchParams.get('city');
  let keyword = searchParams.get('keyword');
  let lat = searchParams.get('lat');
  let lon = searchParams.get('lon');

  if(city !== '') {
    return <Searchdata></Searchdata>
  } else {
    return <Searchnear></Searchnear>
  }
  
}