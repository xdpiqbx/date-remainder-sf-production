// const format = require('date-fns/format');
// const { uk } = require('date-fns/locale');

const api = require('./db/api');
const message = require('./messages');

const CronJob = require('cron').CronJob;
const config = require('./config');
require('./db/mongo-instance');

const botStart = require('./bot-events/botStart');
const botHelp = require('./bot-events/botHelp');
const botOnMessage = require('./bot-events/botOnMessage');
const botCallbackQuery = require('./bot-events/botCallbackQuery');
const { delay, getCronTimerString } = require('./helpers');

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(config.TOKEN, {
  polling: true
});

bot.on('polling_error', msg => console.log(msg));

const Store = require('./Store');

const store = new Store();

botStart(bot, store);

botHelp(bot, store);

botOnMessage(bot, store);

botCallbackQuery(bot, store);

const cronTimer = {
  weekDay: '*',
  month: '*',
  date: '*',
  time: '09:00:00'
};

const cronJob = new CronJob(
  getCronTimerString(cronTimer),
  async () => {
    const tlg_chatIds = await api.getAllChatId();
    const todayBirthdays = await api.getTodayBirthdays();
    const options = {
      parse_mode: 'HTML'
    };
    for (let chatId of tlg_chatIds) {
      bot.sendMessage(
        chatId.tlg_chatId,
        '<b>Нагадування</b> 🌟\n' +
          message.listBirthdaysForToday(todayBirthdays),
        options
      );
      await delay(500);
    }
  },
  null,
  true,
  'Europe/Kiev'
);
