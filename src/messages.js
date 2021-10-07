// const { uk } = require('date-fns/locale');
const format = require('date-fns/format');
const { monthes, happyBirthsdayList } = require('./helpers');
module.exports = {
  testMessage: () => {
    return `Test message`;
  },

  whomAreWeAdding: () => [`<b>Кого додаємо?</b>`].join('\n'),
  candidatReject: () => {
    return [`<b>Вам відмовлено у доступі.</b>`].join('\n');
  },
  youHaveRejectCandidat: () => {
    return [`<b>Кандидату відмовлено</b>`].join('\n');
  },
  messageToNewUser: (first_name, username, chatId) => {
    return [
      `Доброго дня`,
      `Ваші дані з Telegram:`,
      `<b>${first_name} ${username}</b>`,
      `<b>${chatId}</b>`,
      `Перешліть це повідомлення адміну, щоб він додав Вас до бази.`
    ].join('\n');
  },
  messageToCreator: (first_name, username, chatId) => {
    return [
      `Доброго дня`,
      `Маємо нового користувача`,
      `У Telegram:`,
      `<b>${first_name} ${username}</b>`,
      `<b>${chatId}</b>`
    ].join('\n');
  },
  failToAddToDb: (status, message) => {
    return [
      `Не вдалося додати до бази`,
      `<b>${status}</b>`,
      `<i>${message}</i>`
    ].join('\n');
  },
  addedToDb: (name, message) => {
    return [`${message}`, `<b>${name}</b>`, `<i>Доданий до бази.</i>`].join(
      '\n'
    );
  },
  listBirthdaysFromSelectedMonth: (monthNum, birthdaysFromSelectedMonth) => {
    const head = `У <b>${monthes[monthNum]}</b>, Дні народження святкують:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
    const resultStr = happyBirthsdayList(birthdaysFromSelectedMonth);
    return head + resultStr;
  },
  listBirthdaysForThisMonth: thisMonthBirthdays => {
    const date = new Date();
    const head = `У цьму місяці ( <b>${
      monthes[date.getMonth()]
    }</b> ),\nДні народження святкують:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
    const resultStr = happyBirthsdayList(thisMonthBirthdays);
    return head + resultStr;
  },
  listBirthdaysForNextMonth: nextMonthBirthdays => {
    const date = new Date();

    const len = nextMonthBirthdays.length;
    const isSomebody = len > 0;
    const isMany = len > 1;

    const nobody = `Сьогодні ( <b>${date}</b> ) без тортиків 😧`;
    const oneEmployer = `У наступному місяці ( <b>${
      monthes[date.getMonth() + 1]
    }</b> ),\nсвій День народження святкує:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
    const manyEmployers = `У наступному місяці ( <b>${
      monthes[date.getMonth() + 1]
    }</b> ),\nДні народження святкують:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;

    const head = isSomebody ? (isMany ? manyEmployers : oneEmployer) : nobody;
    return isSomebody ? head + happyBirthsdayList(nextMonthBirthdays) : head;
  },
  listBirthdaysForToday: todayBirthdays => {
    const date = format(new Date(), 'dd.MM.yyyy');
    const len = todayBirthdays.length;
    const isSomebody = len > 0;
    const isMany = len > 1;
    const nobody = `Сьогодні ( <b>${date}</b> ) без тортиків 😧`;
    const oneEmployer = `Сьогодні ( <b>${date}</b> ), свій День народження святкує:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
    const manyEmployers = `Сьогодні ( <b>${date}</b> ), Дні народження святкують:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;

    const head = isSomebody ? (isMany ? manyEmployers : oneEmployer) : nobody;
    return isSomebody ? head + happyBirthsdayList(todayBirthdays) : head;
  },
  listBirthdaysForTomorrow: tomorrowBirthdays => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const date = format(d, 'dd.MM.yyyy');
    const len = tomorrowBirthdays.length;
    const isSomebody = len > 0;
    const isMany = len > 1;
    const nobody = `Завтра ( <b>${date}</b> ) без тортиків 😧`;
    const oneEmployer = `Завтра ( <b>${date}</b> ), свій День народження святкує:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
    const manyEmployers = `Завтра ( <b>${date}</b> ), Дні народження святкують:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
    const head = isSomebody ? (isMany ? manyEmployers : oneEmployer) : nobody;
    return isSomebody ? head + happyBirthsdayList(todayBirthdays) : head;
  }
};
