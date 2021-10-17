// const { uk } = require('date-fns/locale');
const format = require('date-fns/format');
const { monthes, happyBirthsdayList } = require('./helpers');

const listBirthdaysForMonth = (month, { myCamarades, others }) => {
  const lenCamarades = myCamarades.length;
  const lenOthers = others.length;
  const isSomebody = lenCamarades + lenOthers > 0;
  const isMany = lenCamarades + lenOthers > 1;

  const nobody = `Весь місяць ( <b>${month}</b> ) без тортиків 😳`;
  const oneEmployer = `У <b>${month}</b>, свій День народження святкує:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
  const manyEmployers = `У <b>${month}</b>, Дні народження святкують:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
  const inOurManagement =
    lenCamarades > 0 ? `✅ <b>У Вашому Управлінні</b> 🥳\n\n` : '';
  const inOthers =
    lenOthers > 0 ? `✅ <b>Колеги з інших Управлінь</b> 🥳\n\n` : '';

  const head = isSomebody ? (isMany ? manyEmployers : oneEmployer) : nobody;

  const resultCamarades =
    happyBirthsdayList(myCamarades) + (lenCamarades ? '\n\n' : '');
  const resultOthers = happyBirthsdayList(others);

  return isSomebody
    ? head + inOurManagement + resultCamarades + inOthers + resultOthers
    : head;
};
const listBirthdaysForDay = (birthdays, date, when) => {
  const len = birthdays.length;
  const isSomebody = len > 0;
  const isMany = len > 1;
  const nobody = `${when} ( <b>${date}</b> ) без тортиків 😧`;
  const oneEmployer = `${when} ( <b>${date}</b> ), свій День народження святкує:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
  const manyEmployers = `${when} ( <b>${date}</b> ), Дні народження святкують:\n🌟🎂 🍻 💵 🎉 🎁 🥳\n\n`;
  const head = isSomebody ? (isMany ? manyEmployers : oneEmployer) : nobody;
  return isSomebody ? head + happyBirthsdayList(birthdays) : head;
};
const when = dateObj => {
  const today = new Date();
  return dateObj.getDate() === today.getDate() ? 'Сьогодні' : 'Завтра';
};
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
  listBirthdaysFromSelectedMonth: (monthNum, { myCamarades, others }) => {
    return listBirthdaysForMonth(monthes[monthNum], {
      myCamarades,
      others
    });
  },
  listBirthdaysForThisMonth: ({ myCamarades, others }) => {
    const date = new Date();
    return listBirthdaysForMonth(monthes[date.getMonth()], {
      myCamarades,
      others
    });
  },
  listBirthdaysForNextMonth: ({ myCamarades, others }) => {
    const date = new Date();
    return listBirthdaysForMonth(monthes[date.getMonth() + 1], {
      myCamarades,
      others
    });
  },
  listBirthdaysForToday: todayBirthdays => {
    const date = format(new Date(), 'dd.MM.yyyy');
    return listBirthdaysForDay(todayBirthdays, date, when(new Date()));
  },
  listBirthdaysForTomorrow: tomorrowBirthdays => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const date = format(tomorrow, 'dd.MM.yyyy');
    return listBirthdaysForDay(tomorrowBirthdays, date, when(tomorrow));
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
      '⚜️Натиснувши <b>/help 🧭</b> ви побачите це повідомлення.',
      '⚜️Натиснувши <b>/start 👻</b> буде відкрито головну клавіатуру.\n',
      `1️⃣ Вам щодня 🗓 о 09:00 🕘 буде приходити повідомлення 📩 про те, в кого сьогодні День народження;\n`,
      `2️⃣ <b>Пошук</b>🔎 - у будь який момент ви можете ввести частину прізвища або ім'я (українською мовою 🇺🇦 та мінімум 3 символи) і отримати список колег з їх датами народження.\n`,
      `3️⃣ <b>Клавіатура ⌨️:</b>`,
      `✅<b>В кого сьогодні</b> - видасть список тих в кого сьогодні ДН, або повідомить що таких нема.`,
      `✅<b>В кого завтра</b>  - видасть список тих в кого завтра ДН, або повідомить що таких нема.`,
      `✅<b>У цьому місяці</b> - видасть список тих в кого ДН у поточному місяці відсортувавши по дням місяця, або повідомить що таких нема.`,
      `✅<b>У наступному місяці</b> - видасть список тих в кого ДН у наступному місяці відсортувавши по дням місяця, або повідомить що таких нема.`,
      `✅<b>Обрати місяць</b> - видасть список місяців, обравши один з яких ви отримаєте список колег в кого ДН у обраному місяці</i>`
    ].join('\n');
  },
  toShortForSearch: () => {
    return [
      `🔴 <b>Це дуже коротко.</b>\n`,
      `<i>Введіть частину прізвища або ім'я (українською мовою 🇺🇦 та <b>мінімум 3️⃣ символи</b>)</i>`
    ].join('\n');
  }
};
