const format = require('date-fns/format');
const { uk } = require('date-fns/locale');

const Employer = require('../db/model/employer-mod');
const Management = require('../db/model/management-mod');

const helper = require('../helpers');

// все у кого сегодня <<<---------- DONE !!!
// все у кого завтра <<<----------- DONE !!!
// все у кого в этом месяце <<<---- DONE !!!
// все у кого в след месяце <<<---- DONE !!!
// все месяца и дням <<<----------- DONE !!!
// поиск по части ф, и или о <<<--- DONE !!!

const getTodayBirthdays = async () => {
  const today = new Date();
  const day = today.getDate();
  const mon = today.getMonth();
  try {
    const arrTodayBirthdays = await Employer.find({ mon, day })
      .select('name day birthsday')
      .collation({ locale: 'uk' })
      .sort({ name: 'asc' });
    arrTodayBirthdays.sort((a, b) => a.day - b.day);
    return arrTodayBirthdays;
  } catch (e) {
    console.log(e);
  }
};

const getTomorrowBirthdays = async () => {
  const today = new Date();
  const day = today.getDate() + 1;
  const mon = today.getMonth();
  try {
    const arrTomorrowBirthdays = await Employer.find({ mon, day })
      .select('name day birthsday')
      .collation({ locale: 'uk' })
      .sort({ name: 'asc' });
    arrTomorrowBirthdays.sort((a, b) => a.day - b.day);
    return arrTomorrowBirthdays;
  } catch (e) {
    console.log(e);
  }
};

const getThisMonthBirthdays = async (status, mgtIdx) => {
  const today = new Date();
  const mon = today.getMonth();
  try {
    const arrThisMonthBirthdays = await Employer.find({ mon })
      .select('name day birthsday managId')
      .populate('managId', 'mgtIdx -_id')
      .collation({ locale: 'uk' })
      .sort({ name: 'asc' });
    arrThisMonthBirthdays.sort((a, b) => a.day - b.day);

    return helper.apiSplitCamaradesAndOthers(
      arrThisMonthBirthdays,
      mgtIdx,
      status
    );
  } catch (e) {
    console.log(e);
  }
};

const getNextMonthBirthdays = async (status, mgtIdx) => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  const nextMonthDate = date;
  try {
    const arrNextMonthBirthdays = await Employer.find({
      mon: nextMonthDate.getMonth()
    })
      .select('name day birthsday')
      .populate('managId', 'mgtIdx -_id')
      .collation({ locale: 'uk' })
      .sort({ name: 'asc' });
    arrNextMonthBirthdays.sort((a, b) => a.day - b.day);
    return helper.apiSplitCamaradesAndOthers(
      arrNextMonthBirthdays,
      mgtIdx,
      status
    );
  } catch (e) {
    console.log(e);
  }
};

const getAllUnicMonthesLabels = async () => {
  const allMonthes = await Employer.find({}).select('mon -_id');
  const allMonthesNums = allMonthes.map(({ mon }) => mon);
  const unicMonthsesNums = [...new Set(allMonthesNums)].sort((a, b) => a - b);
  const allMonthesWithLabels = unicMonthsesNums.map(monthNum => {
    const date = new Date();
    date.setDate(15);
    date.setMonth(monthNum);
    return { monthNum, label: format(date, 'LLLL', { locale: uk }) };
  });
  return allMonthesWithLabels;
};

const getBirthdaysFromSelectedMonth = async (mon, status, mgtIdx) => {
  const heroesOfOccasion = await Employer.find({ mon })
    .select('name day birthsday')
    .populate('managId', 'mgtIdx -_id')
    .collation({ locale: 'uk' })
    .sort({ name: 'asc' });
  heroesOfOccasion.sort((a, b) => a.day - b.day);
  return helper.apiSplitCamaradesAndOthers(heroesOfOccasion, mgtIdx, status);
};

const getEmplByPartOfName = async str => {
  const normalizeStr = string => {
    string = string.trim().toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1, string.length);
  };
  const heroesOfOccasion = await Employer.find({
    name: new RegExp(normalizeStr(str), 'i')
  })
    .select('name day mon birthsday')
    .collation({ locale: 'uk', strength: 2 })
    .sort({ name: 'asc' });

  return heroesOfOccasion.filter(item => {
    const arrName = item.name.split(' ');
    return [arrName[0], arrName[1]].find(name =>
      name.startsWith(normalizeStr(str))
    );
  });
};

const getEmployerByChatId = async chatId => {
  const employer = await Employer.findOne({ tlg_chatId: chatId })
    .select('name tlg_chatId status mmId managId')
    .populate('mmId managId posId', 'mmIdx mgtIdx posIdx');
  return employer;
};

// const getAllEmployers = async () => {
//   try {
//     const empl = await Employer.find({}).populate(
//       'gradeId depId posId mmId managId'
//     );
//     console.log(empl);
//   } catch (e) {
//     console.log(e);
//   }
// };

const getAllEmployersWithoutChatId = async () => {
  try {
    const employers = await Employer.find({ tlg_chatId: null })
      .select('name')
      .collation({ locale: 'uk' })
      .sort({ name: 'asc' });
    return employers;
  } catch (e) {
    console.log(e);
  }
};

const getAllManagements = async () => {
  try {
    return await Management.find({}).select('mgtIdx short');
  } catch (e) {
    console.log(e);
  }
};

const getAllEmployersWithoutChatIdByManageId = async managId => {
  try {
    return await Employer.find({ managId: managId, tlg_chatId: null })
      .select('name')
      .collation({ locale: 'uk' })
      .sort({ name: 'asc' });
  } catch (e) {
    console.log(e);
  }
};

const addChatIdToEmployer = async (id, chatid) => {
  try {
    const data = await Employer.findOneAndUpdate(
      { _id: id },
      { tlg_chatId: chatid }
    );
    return {
      status: 'OK',
      message: 'Оперцію виконано успішно',
      name: data.name
    };
  } catch (e) {
    return { status: e.name, message: e.message };
  }
};

const getAllChatId = async () => {
  try {
    return await Employer.find({ tlg_chatId: { $ne: null } }).select(
      'tlg_chatId -_id'
    );
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getTodayBirthdays,
  getTomorrowBirthdays,
  getThisMonthBirthdays,
  getAllUnicMonthesLabels,
  getBirthdaysFromSelectedMonth,
  getEmplByPartOfName,
  getNextMonthBirthdays,
  getEmployerByChatId,
  getAllEmployersWithoutChatId,
  addChatIdToEmployer,
  getAllChatId,
  getAllManagements,
  getAllEmployersWithoutChatIdByManageId
  // getAllEmployers
};

// const updateAllById = async () => {
//   try {
//     const arrTodayBirthdays = await Employer.find({}, 'name birthsday');
//     arrTodayBirthdays.forEach(async empl => {
//       await Employer.findByIdAndUpdate(empl._id, {
//         $set: {
//           day: empl.birthsday.getDate(),
//           mon: empl.birthsday.getMonth(),
//           year: empl.birthsday.getFullYear()
//         }
//       });
//       console.log(empl);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
