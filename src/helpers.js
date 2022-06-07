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
  if (rawList.lenght === 0) {
    return;
  }
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

const accessRights = (mgtIdx, status, myCamarades, others) => {
  if (mgtIdx === 4) {
    switch (status) {
      case 0: // Я
        return { myCamarades, others };
      case 1: // Заст Кер та всі хто вище + довірені
        return { myCamarades, others };
      case 2: // Нач відділу та заст
        return { myCamarades, others: [] };
      case 3: // Бійці!
        return { myCamarades, others: [] };
      case 9: // DEFAULT
        return { myCamarades, others: [] };
    }
  } else {
    const sfFilter = others.filter(empl => {
      if (!empl.managId) {
        return true;
      }
      return empl.managId.mgtIdx !== 4;
    });
    switch (status) {
      case 1: // Заст Кер та всі хто вище + довірені
        return { myCamarades, others };
      case 3: // Інші
        return { myCamarades, others: sfFilter };
      case 9: // Інші
        return { myCamarades, others: sfFilter };
    }
  }
  // Усо видит всех
  // Никто не видит УСО
  // Сотрудника УСО видно только в его ДР
  // поиск по ФИО только для кер управ
};

const apiSplitCamaradesAndOthers = (employers, mgtIdx, status) => {
  const myCamarades = employers.filter(camarad => {
    if (camarad.managId) {
      return camarad.managId.mgtIdx === mgtIdx;
    }
    return false;
  });
  const others = employers.filter(camarad => {
    return camarad.managId === null || camarad.managId.mgtIdx !== mgtIdx;
  });
  return accessRights(mgtIdx, status, myCamarades, others);
};

const logger = (id, name, from, txt) => {
  const date = new Date();
  console.log('----------------------------------------------------');
  console.log(date.toLocaleString('ua', { timeZone: 'Europe/Kiev' }));
  console.log(id + ' ' + name + ' === ' + from + ' ===> ' + txt);
};

const loggerGhost = (from, msg) => {
  const date = new Date();
  console.log('------------------- Unautorized user -------------------');
  console.log(date.toLocaleString('ua', { timeZone: 'Europe/Kiev' }));
  console.log(msg.chat.id + ' === ' + from + ' === ');
  console.log(msg);
};

module.exports = {
  monthes,
  happyBirthsdayList,
  delay,
  getCronTimerString,
  apiSplitCamaradesAndOthers,
  logger,
  loggerGhost
};
