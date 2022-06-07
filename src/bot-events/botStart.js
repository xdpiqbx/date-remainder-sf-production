const api = require('../db/api');
const KB = require('../keyboards');
const message = require('../messages');
const { logger } = require('../helpers');

const botStart = (bot, store) => {
  bot.onText(/^\/start/, async msg => {
    try {
      const options = {
        parse_mode: 'HTML'
      };

      if (store.getEmployerData('tlg_chatId') !== msg.chat.id) {
        const empl = await api.getEmployerByChatId(msg.chat.id);
        if (!empl) {
          store.setToState(store.resetState());
        } else {
          store.setToState({ employer: empl._doc });
        }
      }

      logger(msg.chat.id, store.state.employer.name, 'botStart', msg.text);

      if (!store.getEmployerData('tlg_chatId')) {
        store.setToState({
          ...store.resetState(),
          candidate: { candidateChatId: msg.chat.id }
        });

        bot.sendMessage(
          msg.chat.id,
          message.messageToNewUser(
            msg.from.first_name,
            msg.from.username,
            msg.chat.id
          ),
          options
        );

        options.reply_markup = {
          keyboard: KB.newUserKb,
          resize_keyboard: true,
          one_time_keyboard: true
        };

        bot.sendMessage(
          938358368,
          message.messageToCreator(
            msg.from.first_name,
            msg.from.username,
            msg.chat.id
          ),
          options
        );
      } else {
        options.reply_markup = {
          keyboard: KB.birthsdayKb,
          resize_keyboard: true
        };
        bot.sendMessage(msg.chat.id, `Оберіть опцію`, options);
      }
    } catch (e) {
      console.log(e);
    }
  });
};
module.exports = botStart;
