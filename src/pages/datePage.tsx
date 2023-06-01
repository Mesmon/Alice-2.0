import type { NextPage } from 'next';
import DateInput from '../components/DatePicker/DateInput';
import DateInputText from '../components/DatePicker/DateInputText';
import DatePicker from '../components/DatePicker/DatePicker';

const DatePage: NextPage = () => (
    <div>
      <div className="absolute left-[70vw] top-40 max-w-fit"></div>
      {/* <DateInput /> */}
      <DatePicker initDay={9} initMonth={7} initYear={2022} />
    </div>
);

export default DatePage;
