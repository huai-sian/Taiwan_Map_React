// API 驗證
import jsSHA from "jssha/dist/sha1";
const getAuthHeader = () => {
  const AppID = '62fb64915752471fb3027277da00f6cf'
  const AppKey = 'tHKmnQUiUJOJZL3KesbRFriOLi4'
  const GMTString = new Date().toGMTString()
  const ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  /* eslint-disable no-useless-escape */
  const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { Authorization: Authorization, 'X-Date': GMTString }
};

const perPage = 6;

const getDetail = (id) => {
  let url = "https://ptx.transportdata.tw/MOTC/v2/Tourism/";
  url += `${getMode(id, true)}/?$format=JSON&$filter=${getMode(id, true)}ID eq '${id}'`;
  return fetch(url, { headers: getAuthHeader() }).then((res) => {
    return res.json();
  }).then((res) => {
    if(res.length == 0) {
      throw new Error()
    }
    if (res[0].StartTime === res[0].EndTime) res[0].Date = res[0].EndTime;
    return res[0];
  })
};



const getMode = (id, en) => {
  const tag = id.split('_')[0];
  if(tag === 'C1') {
    return en ? 'ScenicSpot' : '景點';
  }
  if(tag === 'C2') {
    return en ? 'Activity' : '活動';
  }
  if(tag === 'C3') {
    return en ? 'Restaurant' : '餐廳';
  }
  if(tag === 'C4') {
    return en ? 'Hotel' : '旅宿';
  }
}

const dataFilter = (arr, count = 4) => {
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
    resolve(result)
  });
};

// const handleTime = (arr)

const handleTime = (arr) => {
  return new Promise((resolve) => {
    arr.forEach(item => {
      if(item.StartTime) {
        item.StartTime = item.StartTime.split('T')[0];
      }
      if(item.EndTime) {
        item.EndTime = item.EndTime.split('T')[0];
      }
      if(item.StartTime === item.EndTime) {
        item.Date = item.EndTime;
      }
    });
    resolve(arr);
  });
};


const getData = (mode, city, page = 1, keyword = null) => {
  city = city === 'Taiwan' ? '' : city;
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}/${city}?$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
  if(keyword) {
    let filter = "";
    filter += ` or contains(${mode}Name, '${keyword}') `;
  }
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
}

const getNearInfo = (mode, lat, lon, page) => {
  let url = `https://ptx.transportdata.tw/MOTC/v2/Tourism/${mode}?`;
  url += `$top=${perPage}&$skip=${(page - 1) * perPage}&$format=JSON`;
  url += `&$select=${mode}ID,${mode}Name,Address,Picture`;
  if (mode === "ScenicSpot") url += ",Class1,Class2,Class3,OpenTime,TicketInfo";
  if (mode === "Restaurant") url += ",Class,OpenTime";
  if (mode === "Hotel") url += ",Class";
  if (mode === "Activity") url += ",Class1,Class2";
  url += `&$spatialFilter=nearby(${lat},${lon},50000)`;
  console.log('near info');
  return fetch(url, { headers: getAuthHeader() }).then((res) => res.json());
}

export { dataFilter, getData, handleTime, getDetail, getMode, getNearInfo }