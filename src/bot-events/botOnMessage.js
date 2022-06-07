const api = require('../db/api');
const KB = require('../keyboards');
const IKB = require('../inline-keyboards');
const { logger } = require('../helpers');

const message = require('../messages');

const botOnMessage = (bot, store) => {
  bot.on('message', async msg => {
    if (store.getEmployerData('tlg_chatId') !== msg.chat.id) {
      const empl = await api.getEmployerByChatId(msg.chat.id);
      if (!empl) {
        store.setToState(store.resetState());
        console.log(msg.chat.id + ' <<< Якийсь підар влізти хотів! >>>');
        return;
      } else {
        store.setToState({ employer: empl._doc });
      }
    }

    if (!store.state.employer._id) {
      console.log(msg.chat.id + ' *** Якого хуя це спрацювало аж тут ?! ***');
      return;
    }

    if (!msg.text) {
      console.log('==================== MSG ====================');
      log.console.log('msg: ', msg);
      return;
    }

    logger(msg.chat.id, store.state.employer.name, 'botOnMessage', msg.text);

    if (msg.text.charAt(0) === '/') {
      return;
    }

    const { ACTION_KB } = KB;
    const options = {
      parse_mode: 'HTML'
    };

    const mgtIdx = store.getEmployerData('managId')?.mgtIdx ?? null;
    const status = store.getEmployerData('status');

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
        const thisMonthBirthdays = await api.getThisMonthBirthdays(
          status,
          mgtIdx
        );
        bot.sendMessage(
          msg.chat.id,
          message.listBirthdaysForThisMonth(thisMonthBirthdays),
          options
        );
        break;
      case ACTION_KB.NEXT_MONTH:
        const nextMonthBirthdays = await api.getNextMonthBirthdays(
          status,
          mgtIdx
        );
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
        bot.sendMessage(msg.chat.id, message.choseTheMonth(), options);

        break;
      case ACTION_KB.ADD_NEW_USER:
        const allManagements = await api.getAllManagements();
        options.reply_markup = {
          inline_keyboard: IKB.managementsToInlineKeyboard(
            allManagements,
            IKB.ACTIONS.SELECT_MANAGEMENT
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

    if (!Object.values(ACTION_KB).find(val => val === msg.text)) {
      if (msg.text.length < 3) {
        bot.sendMessage(msg.chat.id, message.toShortForSearch(), options);
        return;
      }
      const emplByPartOfName = await api.getEmplByPartOfName(msg.text);
      bot.sendMessage(
        msg.chat.id,
        message.listEmplByPartOfName(emplByPartOfName),
        options
      );
    }
  });
};

module.exports = botOnMessage;
