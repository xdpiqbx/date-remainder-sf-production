// const format = require('date-fns/format');
// const { uk } = require('date-fns/locale');

const api = require('./db/api');
const message = require('./messages');

const CronJob = require('cron').CronJob;
const config = require('./config');
require('./db/mongo-instance');

const botStart = require('./bot-events/botStart');
const botOnMessage = require('./bot-events/botOnMessage');
const botCallbackQuery = require('./bot-events/botCallbackQuery');

const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(config.TOKEN, {
  polling: true
});

const Store = require('./Store');

const store = new Store();

botStart(bot, store);

botOnMessage(bot, store);

botCallbackQuery(bot, store);

const cronJob = new CronJob(
  '00 00 09 * * *',
  async () => {
    const tlg_chatIds = await api.getAllChatId();
    const todayBirthdays = await api.getTodayBirthdays();

    const options = {
      parse_mode: 'HTML'
    };

    tlg_chatIds.forEach(({ tlg_chatId }) => {
      bot.sendMessage(
        tlg_chatId,
        message.listBirthdaysForToday(todayBirthdays),
        options
      );
    });
  },
  null,
  true,
  'Europe/Kiev'
);
