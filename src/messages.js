// const { uk } = require('date-fns/locale');
const format = require('date-fns/format');
const { monthes, happyBirthsdayList } = require('./helpers');
module.exports = {
  testMessage: () => {
    return `Test message`;
  },

  whomAreWeAdding: () => [`<b>Кого додаємо?</b>`].join('\n'),
  choseTheMonth: () => [`<b>Оберіть місяць</b>`].join('\n'),
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
  },
  listEmplByPartOfName: emplByPartOfName => {
    const len = emplByPartOfName.length;
    const isSomebody = len > 0;
    const nobody = `Немає в нас таких 🤷\n\n`;
    const searchResult = `Результат пошуку 🔎\n\n`;
    const head = isSomebody ? searchResult : nobody;
    return isSomebody ? head + happyBirthsdayList(emplByPartOfName) : head;
  },
  helpMessage: () => {
    return [
      `<i><b>Коротенько про цього бота.</b> 🦾\n`,
      'Натиснувши <b>/help 🧭</b> ви побачите це повідомлення.',
      'Натиснувши <b>/start 👻</b> буде відкрито головну клавіатуру.\n',
      `1. Вам щодня о 09:00 буде приходити повідомлення про те, в кого сьогодні День народження;\n`,
      `2. <b>Пошук</b> - у будь який момент ви можете ввести частину прізвища ім'я або по батькові (українською мовою та мінімум 3 символи) і отримати список колег з їх датами народження.\n`,
      `3. <b>Клавіатура:</b>`,
      `<b>В кого сьогодні</b> - видасть список тих в кого сьогодні ДН, або повідомить що таких нема.`,
      `<b>В кого завтра</b>  - видасть список тих в кого завтра ДН, або повідомить що таких нема.`,
      `<b>У цьому місяці</b> - видасть список тих в кого ДН у поточному місяці відсортувавши по дням місяця, або повідомить що таких нема.`,
      `<b>У наступному місяці</b> - видасть список тих в кого ДН у наступному місяці відсортувавши по дням місяця, або повідомить що таких нема.`,
      `<b>Обрати місяць</b> - видасть список місяців, обравши один з яких ви отримаєте список колег в кого ДН у обраному місяці</i>`
    ].join('\n');
  },
  toShortForSearch: () => {
    return [
      `🔴 <b>Це дуже коротко.</b>\n`,
      `<i>Введіть частину прізвища, ім'я або по батькові (українською мовою 🇺🇦 та <b>мінімум 3️⃣ символи</b>)</i>`
    ].join('\n');
  }
};
