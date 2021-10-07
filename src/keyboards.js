const BTNS = {
  TODAY: 'В кого сьогодні',
  TOMORROW: 'В кого завтра',
  THIS_MONTH: 'У цьому місяці',
  NEXT_MONTH: 'У наступному місяці',
  SELECT_MONTH: 'Обрати місяць',
  ADD_NEW_USER: 'Додати',
  REJECT_USER: 'Відмовити'
};

const birthsdayKb = [
  [BTNS.TODAY, BTNS.TOMORROW],
  [BTNS.THIS_MONTH, BTNS.NEXT_MONTH],
  [BTNS.SELECT_MONTH]
];

const newUserKb = [
  [BTNS.ADD_NEW_USER, BTNS.REJECT_USER]
]

module.exports = { birthsdayKb, newUserKb, ACTION_KB: BTNS };
