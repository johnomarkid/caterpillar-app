export const todayDate = () => {
  // will return UTC (num of milliseconds since 1970)
  // don't care about time. 
  const td = new Date();
  return Date.UTC(td.getFullYear(), td.getMonth(), td.getDate())
}

export const dateDaysFromNow = (d) => {
  // takes d, number of days to add to today
  return todayDate() + d*1000*60*60*24
}

export const hhmmssToSeconds = (d) => {
  const a = d.split(':');
  return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])
}  
