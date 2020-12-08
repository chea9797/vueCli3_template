import moment from "dayjs"; //时间格式化插件

//格式化时间
export function dateFmt(date, format = "YYYY-MM-DD hh:mm:ss") {
  if (date == "" || date == null || date == undefined) {
    return "";
  }
  return moment(date).format(format);
}

//保留小数点
export function getFloat(number, n) {
  if (number == "" || number == undefined) {
    return (number = "");
  }
  n = n ? parseInt(n) : 0;
  if (n <= 0) return Math.round(number);
  number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n);
  return number;
}

//经度转换
export function Lon(lon) {
  if (lon == null || lon == "") {
    return (lon = "");
  }
  var ew = "E";
  if (lon < 0) {
    ew = "W";
  }
  if (lon == 0) {
    ew = "";
  }
  var degree = Math.floor(Math.abs(lon / 10000 / 60));
  var minute = (Math.abs(lon / 10000 / 60) - degree) * 60;
  var f = getFloat(minute, 3);
  return degree + "°" + f + "′" + ew;
}

// 纬度转换
export function lat(lat) {
  if (lat == null || lat == "") {
    return;
  }
  var ns = "N";
  if (lat < 0) {
    ns = "S";
  }
  if (lat == 0) {
    ns = "";
  }
  var degrees = Math.floor(Math.abs(lat / 10000 / 60));
  var minutes = (Math.abs(lat / 10000 / 60) - degrees) * 60;
  var fs = getFloat(minutes, 3);
  return degrees + "°" + fs + "′" + ns;
}