import { DateTime } from 'luxon';
import { useReducer } from 'react';
import DateInputText from './DateInputText';

interface IProps {
  initDay?: TDateInput;
  initMonth?: TDateInput;
  initYear?: TDateInput;
}
type TDateInput = number | undefined;

const initializeDate = ({ initDay, initMonth, initYear }: IProps) => {
  const today = DateTime.now();
  const day = initDay ?? today.day;
  const month = initMonth ?? today.month;
  const year = initYear ?? today.year;

  return DateTime.fromObject({ day, month, year });
};

const reducer = (state: DateTime, action: { value: number; type: string }) => {
  switch (action.type) {
    case 'updateDay':
      return DateTime.fromObject({
        ...state.toObject(),
        day: action.value,
      });
    case 'updateMonth':
      return DateTime.fromObject({
        ...state.toObject(),
        month: action.value,
      });
    case 'updateYear':
      return DateTime.fromObject({
        ...state.toObject(),
        year: action.value,
      });

    case 'today':
      return initializeDate({
        initDay: undefined,
        initMonth: undefined,
        initYear: undefined,
      });
    default:
      throw new Error();
  }
};
const DatePicker = ({ initDay, initMonth, initYear }: IProps) => {
  const [date, updateDate] = useReducer(
    reducer,
    {
      initDay,
      initMonth,
      initYear,
    },
    initializeDate,
  );

  return <DateInputText date={date} updateDate={updateDate} />;
};

export default DatePicker;
