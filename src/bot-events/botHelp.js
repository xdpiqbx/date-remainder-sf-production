const api = require('../db/api');
const KB = require('../keyboards');
const message = require('../messages');

const botHelp = (bot, store) => {
  bot.onText(/^\/help/, async msg => {
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

      const date = new Date();
      console.log('----------------------------------------------------');
      console.log(date.toLocaleString('ua', { timeZone: 'Europe/Kiev' }));
      console.log(
        msg.chat.id +
          ' ' +
          store.state.employer.name +
          ' === botOnMessage ===> ' +
          msg.text
      );

      if (!store.getEmployerData('tlg_chatId')) {
        store.setToState({
          ...store.resetState(),
          candidate: { candidateChatId: msg.chat.id }
        });

        bot.sendMessage(
          msg.chat.id,
          'Нічим допомогти не можу. Я Вас не знаю',
          options
        );
      } else {
        bot.sendMessage(msg.chat.id, message.helpMessage(), options);
      }
    } catch (e) {
      console.log(e);
    }
  });
};
module.exports = botHelp;
