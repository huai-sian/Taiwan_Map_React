export const useHandleTime = (arr) => {
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
  return arr;
}