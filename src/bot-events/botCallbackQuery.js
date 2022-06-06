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

    bot.answerCallbackQuery(query.id, { show_alert: false });

    const mgtIdx = store.getEmployerData('managId')?.mgtIdx ?? null;
    const status = store.getEmployerData('status');

    const date = new Date();
    console.log('----------------------------------------------------');
    console.log(date.toLocaleString('ua', { timeZone: 'Europe/Kiev' }));
    console.log(
      store.state.employer.name + ' === botCallbackQuery ===> ' + action
    );

    switch (action) {
      case IKB.ACTIONS.SELECT_MANAGEMENT:
        const { _id: mngId } = JSON.parse(query.data);
        try {
          bot.deleteMessage(query.message.chat.id, query.message.message_id);
          const employersWithoutChatIdByManageId =
            await api.getAllEmployersWithoutChatIdByManageId(mngId);
          options.reply_markup = {
            inline_keyboard: IKB.employersToInlineKeyboard(
              employersWithoutChatIdByManageId,
              IKB.ACTIONS.SELECT_EMPLOYER
            )
          };
          bot.sendMessage(938358368, message.whomAreWeAdding(), options);
        } catch (e) {
          console.log(e);
        }
        break;
      case IKB.ACTIONS.SELECT_EMPLOYER:
        const { _id: emplId } = JSON.parse(query.data);
        try {
          bot.deleteMessage(query.message.chat.id, query.message.message_id);
          const result = await api.addChatIdToEmployer(
            emplId,
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
          await api.getBirthdaysFromSelectedMonth(monthNum, status, mgtIdx);
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
