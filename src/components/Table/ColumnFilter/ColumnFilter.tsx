import React, { useEffect, useState } from 'react';
import DateInput from '../../DatePicker/DateInput';

export const customFilterFunction = (
  rows: any[],
  id: any,
  filterValue: any[],
) => {
  if (!Array.isArray(filterValue) || !filterValue.length) {
    return rows;
  }
  return rows.filter((row: { original: { eye_color: any } }) => filterValue.includes(row.original.eye_color));
};

const ColumnFilter = ({
  filteredColors,
  setFilteredColors,
}: {
  filteredColors: any;
  setFilteredColors: any;
}) => {
  const today = new Date();
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;


    if (filteredColors.includes(value)) {
      setFilteredColors((oldFiltedColors: any[]) => oldFiltedColors.filter((color: any) => color !== value));
    } else {
      setFilteredColors(() => [...filteredColors, value]);
    }
  };

  return (
    <div>
      <div className="flex space-x-2 my-4 justify-center ">
        <div>
          <input
            type="checkbox"
            value="blue"
            className="hidden"
            id="chkBoxblue"
            onChange={HandleChange}
          />
          <label
            htmlFor="chkBoxblue"
            className="select-none transition duration-100 cursor-pointer bg-blue-500 hover:bg-blue-700 label-checked-hover:bg-blue-700 label-checked:bg-blue-600 label-checked:ring-blue-600 label-checked:ring-4 label-checked:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full"
          >
            blue
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            value="red"
            className="hidden"
            id="chkBoxred"
            onChange={HandleChange}
          />
          <label
            htmlFor="chkBoxred"
            className="select-none cursor-pointer bg-red-500 hover:bg-red-700 label-checked-hover:bg-red-700 label-checked:bg-red-600 label-checked:ring-red-600 label-checked:ring-4 label-checked:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full"
          >
            red
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            value="yellow"
            className="hidden"
            id="chkBoxYellow"
            onChange={HandleChange}
          />
          <label
            htmlFor="chkBoxYellow"
            className="select-none cursor-pointer bg-yellow-500 hover:bg-yellow-700 label-checked-hover:bg-yellow-700 label-checked:bg-yellow-600 label-checked:ring-yellow-600 label-checked:ring-4 label-checked:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full"
          >
            yellow
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            value="brown"
            className="hidden"
            id="chkBoxBrown"
            onChange={HandleChange}
          />
          <label
            htmlFor="chkBoxBrown"
            className="select-none label-checked cursor-pointer bg-brown-500 hover:bg-brown-700 label-checked-hover:bg-brown-700 label-checked:bg-brown-600 label-checked:ring-brown-600 label-checked:ring-4 label-checked:ring-opacity-50 text-white font-bold py-2 px-4 rounded-full"
          >
            brown
          </label>
        </div>
      </div>
      <div className="flex flex-row-reverse ">
        <div className="flex pr-10">
          <DateInput
            initDay={27}
            initMonth={today.getMonth() + 1}
            initYear={today.getFullYear()}
          />
        </div>
        <div className="flex pr-6">
          <DateInput
            initDay={today.getDate()}
            initMonth={today.getMonth() + 1}
            initYear={today.getFullYear()}
          />
        </div>
      </div>
    </div>
  );
};

export default ColumnFilter;
