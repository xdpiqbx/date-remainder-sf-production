const ACTIONS = {
  SELECT_EMPLOYER: 'se',
  SELECT_MANAGEMENT: 'sma',
  SELECT_MONTH: 'sm'
};

const managementsToInlineKeyboard = (managements, action) => {
  const result = managements.map(({ _id, mgtIdx, short }) => {
    return [
      {
        text: `${short}`,
        callback_data: JSON.stringify({
          _id,
          mgtIdx,
          action
        })
      }
    ];
  });
  result.push([
    {
      text: 'Інші',
      callback_data: JSON.stringify({
        _id: null,
        mgtIdx: null,
        action
      })
    }
  ]);
  return result;
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
  managementsToInlineKeyboard,
  employersToInlineKeyboard,
  monthsesToInlineKeyboard
};
