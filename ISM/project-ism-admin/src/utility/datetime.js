import moment from 'moment';

moment.locale('vi-VN');

export const convertUnixTime = (UNIX_TIMESTAMP) => {
  const a = new Date(UNIX_TIMESTAMP);
  const months = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const days = [
    'Chủ nhật',
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  let date = a.getDate();
  if (parseInt(date) < 10) {
    date = '0' + date;
  }
  const day = days[a.getDay()];

  const time = `${day}, ${date}/${month}/${year}`;
  return time;
};

export const getToday = () => {
  const t = new Date();
  const d = t.getDate();
  const m = t.getMonth() + 1;
  const y = t.getFullYear();
  const today = checkValue(d) + '/' + checkValue(m) + '/' + y;

  return today;
};

const checkValue = (value) => {
  if (value < 10) {
    return '0' + value;
  }
  return value;
};

export const checkExpiredDate = (date) => {
  if (Date.now() >= moment(date).valueOf()) {
    return true;
  } else {
    return false;
  }
};

export const currentDate = () => {
  return moment();
};

export const checkTimeBetween = (checkTime, timeA, timeB) => {
  return moment(checkTime).isBetween(timeB, timeA);
};

export const format = (timestamp, pattern) => {
  if (timestamp) {
    return moment(timestamp).format(pattern);
  }
  return '';
};

export const formatDateTime = (timestamp) => {
  return format(timestamp, 'HH:mm:i DD/MM/YYYY');
};

export const formatDate = (timestamp) => {
  return format(timestamp, 'DD/MM/YYYY');
};

export const formatTime = (timestamp) => {
  return format(timestamp, 'HH:mm');
};

export const formatDays = (timestamp) => {
  return format(timestamp, 'DD/MM');
};
