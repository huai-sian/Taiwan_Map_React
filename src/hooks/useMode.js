import { useState } from 'react';

export const useMode = (id, en) => {
  const tag = id.split('_')[0];
  let mode = '';
  if(tag === 'C1') {
    mode = en ? 'ScenicSpot' : '景點';
  }
  if(tag === 'C2') {
    mode = en ? 'Activity' : '活動';
  }
  if(tag === 'C3') {
    mode = en ? 'Restaurant' : '餐廳';
  }
  if(tag === 'C4') {
    mode = en ? 'Hotel' : '旅宿';
  }
  return { mode }
}