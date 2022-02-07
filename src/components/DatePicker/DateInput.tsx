import React, { useState } from "react"
import NumberInput from "../NumberInput/NumberInput"

interface IProps {
  initDay?: number
  initMonth?: number
  initYear?: number
}

function DateInput({ initDay, initMonth, initYear }: IProps) {
  const [day, setDay] = useState(initDay || 1)
  const [month, setMonth] = useState(initMonth || 1)
  const [year, setYear] = useState(initYear || 2911)

  return (
    // className={"flex"}>
    <div className="flex justify-center rounded-xl shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200">
      <NumberInput
        name={"dayInput"}
        numberValue={day}
        setNumberValue={setDay}
        maxValue={31}
        minValue={0}
        visualLength={2}
        placeHolder={"DD"}
      />
      <span>/</span>
      <NumberInput
        name={"monthInput"}
        numberValue={month}
        setNumberValue={setMonth}
        maxValue={12}
        minValue={0}
        visualLength={2}
        placeHolder={"MM"}
      />
      <span>/</span>
      <NumberInput
        name={"yearInput"}
        numberValue={year}
        setNumberValue={setYear}
        maxValue={9999}
        minValue={0}
        visualLength={4}
        placeHolder={"YYYY"}
      />
    </div>
  )
}

export default DateInput
