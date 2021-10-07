const api = require('../db/api');
const KB = require('../keyboards');
const IKB = require('../inline-keyboards');

const message = require('../messages');

const botOnMessage = (bot, store) => {
  bot.on('message', async msg => {
    if (msg.text.charAt(0) === '/') {
      return;
    }

    if (store.getEmployerData('tlg_chatId') !== msg.chat.id) {
      const empl = await api.getEmployerByChatId(msg.chat.id);
      if (!empl) {
        store.setToState(store.resetState());
      } else {
        store.setToState({ employer: empl._doc });
      }
    }

    if (!store.getEmployerData('tlg_chatId')) {
      return;
    }

    const { ACTION_KB } = KB;
    const options = {
      parse_mode: 'HTML'
    };
    switch (msg.text) {
      case ACTION_KB.TODAY:
        const todayBirthdays = await api.getTodayBirthdays();
        bot.sendMessage(
          msg.chat.id,
          message.listBirthdaysForToday(todayBirthdays),
          options
        );
        break;
      case ACTION_KB.TOMORROW:
        const tomorrowBirthdays = await api.getTomorrowBirthdays();
        bot.sendMessage(
          msg.chat.id,
          message.listBirthdaysForTomorrow(tomorrowBirthdays),
          options
        );
        break;
      case ACTION_KB.THIS_MONTH:
        const thisMonthBirthdays = await api.getThisMonthBirthdays();
        bot.sendMessage(
          msg.chat.id,
          message.listBirthdaysForThisMonth(thisMonthBirthdays),
          options
        );
        break;
      case ACTION_KB.NEXT_MONTH:
        const nextMonthBirthdays = await api.getNextMonthBirthdays();
        bot.sendMessage(
          msg.chat.id,
          message.listBirthdaysForNextMonth(nextMonthBirthdays),
          options
        );
        break;
      case ACTION_KB.SELECT_MONTH:
        const allUnicMonthesLabels = await api.getAllUnicMonthesLabels();

        options.reply_markup = {
          inline_keyboard: IKB.monthsesToInlineKeyboard(
            allUnicMonthesLabels,
            IKB.ACTIONS.SELECT_MONTH
          )
        };
        //answer_callback_query
        bot.sendMessage(msg.chat.id, message.whomAreWeAdding(), options);

        break;
      case ACTION_KB.ADD_NEW_USER:
        const employersWithoutChatId = await api.getAllEmployersWithoutChatId();
        options.reply_markup = {
          inline_keyboard: IKB.employersToInlineKeyboard(
            employersWithoutChatId,
            IKB.ACTIONS.SELECT_EMPLOYER
          )
        };
        bot.sendMessage(938358368, message.whomAreWeAdding(), options);
        break;
      case ACTION_KB.REJECT_USER:
        if (store.getCandidateData('candidateChatId')) {
          bot.sendMessage(
            store.getCandidateData('candidateChatId'),
            message.candidatReject(),
            { parse_mode: 'HTML', reply_markup: { remove_keyboard: true } }
          );
        }

        store.setToState({
          candidate: { candidateChatId: null }
        });

        options.reply_markup = {
          keyboard: KB.birthsdayKb,
          resize_keyboard: true
        };
        bot.sendMessage(938358368, message.youHaveRejectCandidat(), options);
        break;
    }
  });
};

module.exports = botOnMessage;
