const format = require('date-fns/format');

const monthes = [
  'Січні',
  'Лютому',
  'Березні',
  'Квітні',
  'Травні',
  'Червні',
  'Липні',
  'Серпні',
  'Вересні',
  'Жовтні',
  'Листопаді',
  'Грудні'
];

const happyBirthsdayList = rawList => {
  return rawList
    .map(({ name, birthsday }, idx) => {
      return [
        `${idx + 1}. <b>${name}</b>`,
        `${format(birthsday, 'dd.MM.yyyy')}`
      ].join('\n');
    })
    .join('\n\n');
};

const delay = ms => new Promise(res => setTimeout(res, ms));

const getCronTimerString = cronTimer => {
  const [hours, minutes, seconds] = cronTimer.time.split(':');
  return [
    seconds,
    minutes,
    hours,
    cronTimer.date,
    cronTimer.month,
    cronTimer.weekDay
  ].join(' ');
};

module.exports = {
  monthes,
  happyBirthsdayList,
  delay,
  getCronTimerString
};
