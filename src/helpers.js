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

module.exports = {
  monthes,
  happyBirthsdayList
};
