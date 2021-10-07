const ACTIONS = {
  SELECT_EMPLOYER: 'se',
  SELECT_MONTH: 'sm'
};

const employersToInlineKeyboard = (employers, action) => {
  return employers.map(({ _id, name }) => {
    return [
      {
        text: `${name}`,
        callback_data: JSON.stringify({
          _id,
          action
        })
      }
    ];
  });
};

const monthsesToInlineKeyboard = (monthses, action) => {
  return monthses.map(({ monthNum, label }) => {
    return [
      {
        text: `${label}`,
        callback_data: JSON.stringify({
          monthNum,
          action
        })
      }
    ];
  });
};

module.exports = {
  ACTIONS,
  employersToInlineKeyboard,
  monthsesToInlineKeyboard
};
