// API 驗證
import jsSHA from "jssha/dist/sha1";

export const useAuthHeader = () => {
  const AppID = '62fb64915752471fb3027277da00f6cf'
  const AppKey = 'tHKmnQUiUJOJZL3KesbRFriOLi4'
  const GMTString = new Date().toGMTString()
  const ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  const HMAC = ShaObj.getHMAC('B64')
  /* eslint-disable no-useless-escape */
  const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  let Auth = { Authorization: Authorization, 'X-Date': GMTString };
  return { Authorization, GMTString }
};
