export function formatDate(timestamps) {
  const date = new Date(timestamps);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 加 1 因为月份是从 0 开始的
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatTime(dateTime) {
  const date = new Date(dateTime)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
  return formattedTime
}

export function formatDateAndTime(timestamps) {
  const date = new Date(timestamps);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 使用padStart補0
  const day = date.getDate().toString().padStart(2, '0'); // 使用padStart補0
  const hours = date.getHours().toString().padStart(2, '0'); // 使用padStart補0
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 使用padStart補0

  const formattedDateTime = `${year}/${month}/${day} ${hours}:${minutes}`;
  return formattedDateTime
}



export function getDayFormat(isoDate) {
  let d = isoDate.split('-')[2]
  let _d = ['01', '02', '03', '04', '05', '06', '07', '08', '09']
  if (_d.includes(d)) {
      return d.split('0')[1]
  } else {
      return d
  }
}
