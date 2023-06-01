import luxon from 'luxon';
import React, {
  Reducer, useEffect, useRef, useState,
} from 'react';
import { getLogger } from '../../utils/logging/log-util';

interface IProps {
  initDay?: number;
  initMonth?: number;
  initYear?: number;
  setNumberValue?: React.Dispatch<React.SetStateAction<number>>;
  maxValue?: number;
  minValue?: number;
  name?: string;
  visualLength?: number;
  placeHolder?: string | number;
  date: luxon.DateTime;
  updateDate: React.Dispatch<
  React.ReducerAction<Reducer<string, { type: string; value: number }>>
  >;
}

type selectionOperation = 'add' | 'sub';

const logger = getLogger('DateInputText');

const DateInputText = ({ date, updateDate }: IProps) => {
  const dateText = useRef<HTMLInputElement>(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [selectionIndex, setSelectionIndex] = useState(0);

  const selections = [
    { start: 0, end: 2 },
    { start: 3, end: 5 },
    { start: 6, end: 10 },
  ];

  const manageSelectionIndex = (action: selectionOperation) => {
    switch (action) {
      case 'add':
        if (selectionIndex + 1 > 2) setSelectionIndex(2);
        else setSelectionIndex(selectionIndex + 1);
        break;
      case 'sub':
        if (selectionIndex - 1 < 0) setSelectionIndex(0);
        else setSelectionIndex(selectionIndex - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setSelection(selections[selectionIndex]);
  }, [selectionIndex]);

  useEffect(() => {
    if (!selection) return; // prevent running on start
    const { start, end } = selection;
    dateText.current?.focus();
    dateText.current?.setSelectionRange(start, end);
  }, [selection]);

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    logger.debug(event.code);
    if (event.code === 'ArrowLeft') {
      event.preventDefault();
      manageSelectionIndex('sub');
    }
    if (event.code === 'ArrowRight') {
      event.preventDefault();
      manageSelectionIndex('add');
    }
    if (event.code === 'Tab') event.preventDefault();
  };

  return (
    <div>
      <input
        type="text"
        ref={dateText}
        className="outline-none ring-2 selection:bg-red-300"
        onKeyDown={keyDownHandler}
        value={date.toFormat('dd/MM/yyyy')}
      />
      <input
        type="number"
        onChange={() => updateDate({ type: 'updateDay', value: 3 })}
      ></input>
    </div>
  );
};

export default DateInputText;
