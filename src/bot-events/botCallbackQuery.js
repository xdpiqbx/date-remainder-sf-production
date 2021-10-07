const api = require('../db/api');
// const KB = require('../keyboards');
const IKB = require('../inline-keyboards');
const message = require('../messages');

const botCallbackQuery = (bot, store) => {
  bot.on('callback_query', async query => {
    const { action } = JSON.parse(query.data);
    const options = {
      parse_mode: 'HTML'
    };
    switch (action) {
      case IKB.ACTIONS.SELECT_EMPLOYER:
        const { _id } = JSON.parse(query.data);
        try {
          bot.deleteMessage(query.message.chat.id, query.message.message_id);
          const result = await api.addChatIdToEmployer(
            _id,
            store.getCandidateData('candidateChatId')
          );
          if (result.status !== 'OK') {
            bot.sendMessage(
              938358368,
              message.failToAddToDb(result.status, result.message),
              options
            );
          } else {
            bot.sendMessage(
              938358368,
              message.addedToDb(result.name, result.message),
              options
            );
          }
        } catch (e) {
          console.log(e);
        }
        break;
      case IKB.ACTIONS.SELECT_MONTH:
        const { monthNum } = JSON.parse(query.data);
        const birthdaysFromSelectedMonth =
          await api.getBirthdaysFromSelectedMonth(monthNum);
        bot.sendMessage(
          query.message.chat.id,
          message.listBirthdaysFromSelectedMonth(
            monthNum,
            birthdaysFromSelectedMonth
          ),
          options
        );
        break;
    }
  });
};
module.exports = botCallbackQuery;
