import { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDetail } from '../../hooks/useDetail';
import Nearinfo from '../../Components/NearInfo.js';
import './Detail.scss'

const handleTime = (item) => {
  if(item.StartTime) {
    item.StartTime = item.StartTime.split('T')[0];
  }
  if(item.EndTime) {
    item.EndTime = item.EndTime.split('T')[0];
  }
  if(item.StartTime === item.EndTime) {
    item.Date = item.EndTime;
  }
  console.log(item);
  return item;
}

// C3_315081100H_000020,
export default function Detail({ mode, handleMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, mode: recMode, chMode } = useDetail(id);
  const updateMode = useCallback(() => {
    handleMode(recMode);
  }, []);

  console.log(data);

  const clickEvent = () => {
    window.print();
  }
  useEffect(() => {
    updateMode();
  }, [updateMode]);

  return (  
    <div className="detail">
      {data && 
      <>
      <div className="detail-title">
        <div className="d-flex align-items-center">
          <button className="detail-btn" onClick={() => navigate(-1)}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <h1 className="detail-title">{data[`${recMode}Name`]}</h1>
        </div>
        <div>
          <button className="detail-btn" onClick={clickEvent}><i className="fas fa-print"></i></button>
        </div>
      </div>
      <div className="banner">
        <img className="banner-img" src={data.Picture.PictureUrl1} alt={data.Picture.PictureDescription1} />
      </div>
      <h2 className="detail-info-title">
        <i className="fas fa-info"></i>
        <span>{chMode}資訊</span>
      </h2>
      <div className="detail-info">
        {data.Date &&
          <p className="card-text mb-1" >
            <i className="ico-calendar"></i>
            <span> 活動日期：</span>
            <span>{data.Date.split('T')[0]}</span>
          </p>
        }
        {!data.Date && data.StartTime && 
          <p className="card-text mb-1">
            <span> 活動期間：</span>
            {data.StartTime === data.EndTime ?
              <span>{data.EndTime.split('T')[0]}</span> :
              <>
                <span>{data.StartTime.split('T')[0]} ~ </span>
                <span>{data.EndTime.split('T')[0]}</span>
            </>}
          </p>
        }
        {data.OpenTime && 
          <p className="card-text mb-1" >
            <i className="ico-calendar"></i>
            <span> 開放時段：</span>
            <span>{data.OpenTime}</span>
          </p>
        }
        {data.TicketInfo && 
          <p className="card-text mb-1" >
            <i className="ico-calendar"></i>
            <span> 門票費用：</span>
            <span>{data.TicketInfo}</span>
          </p>
        }
        {data.Address && 
          <p className="card-text mb-1" >
            <i className="ico-location-pin"></i>
            <span>{chMode}地點：</span>
            {data.Location &&
              <span>{data.Location}</span>
            }
            <span>{data.Address}</span>
          </p>
        }
        {data.Phone && 
          <p className="card-text mb-1" >
            <i className="ico-ui-touch-phone"></i>
            <span> 聯絡電話：</span>
          <a href={`tel:${data.Phone}`}>{data.Phone}</a>
          </p>
        }
        {data.WebsiteUrl && 
          <p className="card-text mb-1" >
            <i className="ico-earth"></i>
            <span> 官方網站：</span>
            <a href={data.WebsiteUrl} target="_blank" rel="noreferrer">點我前往</a>
          </p>
        }
        {data.Organizer && 
          <p className="card-text mb-1" >
            <i className="ico-people"></i>
            <span> 主辦單位：</span>
            <span>{data.Organizer}</span>
          </p>
        }
        {data.Cycle && 
          <p className="card-text mb-1" >
            <i className="ico-ui-text-chat"></i>
            <span> 備註說明：</span>
            <span>{data.Cycle}</span>
          </p>
        }

      </div>
      <h2 className="fz-md c-main">
        <i className="ico-google-talk"></i>
        <span>{chMode}介紹</span>
      </h2>
      <p className="detail-pre">
        {data.DescriptionDetail || data.Description}
      </p>
      {data.TravelInfo &&
        <>
          <h2 className="fz-md c-main detail-info-title"><i className="fas fa-car"></i> 交通方式</h2>
          <p className="detail-pre">{data.TravelInfo}</p>
        </>
      }
      {data.ParkingInfo &&
        <>
          <h2 className="fz-md c-main detail-info-title"><i className="fas fa-car"></i> 交通方式</h2>
          <p className="detail-pre">{data.ParkingInfo}</p>
        </>
      }
      <div className="space"></div>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="detail-info-title">
          <i className="fas fa-location-arrow"></i>
          <span className="me-1">查看鄰近的景點</span>
        </h2>
        <Link
          to={`/detail?mode=ScenicSpot&lat=${data.Position.PositionLat}&lon=${data.Position.PositionLon}`}
          className="detail-more"
        >
          More
        </Link>
      </div>
      <Nearinfo
          recMode={"ScenicSpot"}
          lat={data.Position.PositionLat}
          lon={data.Position.PositionLon}
          amount={3}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="detail-info-title">
          <i className="fas fa-flag"></i>
          <span className="me-1">查看鄰近的活動</span>
        </h2>
        <Link
          to={`/detail?mode=Activity&lat=${data.Position.PositionLat}&lon=${data.Position.PositionLon}`}
          className="detail-more"
        >
          More
        </Link>
      </div>
      <Nearinfo
          recMode={"Activity"}
          lat={data.Position.PositionLat}
          lon={data.Position.PositionLon}
          amount={3}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="detail-info-title">
          <i className="fas fa-utensils"></i>
          <span className="me-1">查看鄰近的餐飲</span>
        </h2>
        <Link
          to={`/detail?mode=Restaurant&lat=${data.Position.PositionLat}&lon=${data.Position.PositionLon}`}
          className="detail-more"
        >
          More
        </Link>
      </div>
      <Nearinfo
          recMode={"Restaurant"}
          lat={data.Position.PositionLat}
          lon={data.Position.PositionLon}
          amount={3}
      />
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="detail-info-title">
          <i className="fas fa-hotel"></i>
          <span className="me-1">查看鄰近的旅宿</span>
        </h2>
        <Link
          to={`/detail?mode=Hotel&lat=${data.Position.PositionLat}&lon=${data.Position.PositionLon}`}
          className="detail-more"
        >
          More
        </Link>
      </div>
      <Nearinfo
          recMode={"Hotel"}
          lat={data.Position.PositionLat}
          lon={data.Position.PositionLon}
          amount={3}
      />
      </>
    }
    </div>
    
    
    
  )
}