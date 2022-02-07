import * as utilities from "./Helpers"
import { SubmitHandler, useForm } from "react-hook-form"

type FormValues = {
  day: number
  month: number
  year: number
}

function DatePicker() {
  const todayDate = new Date()
  const today = {
    day: todayDate.getDate(),
    month: todayDate.getMonth() + 1,
    year: todayDate.getFullYear(),
  }

  const daysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      day: today.day,
      month: today.month,
      year: today.year,
    },
  })
  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data))
    // alert(errors)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          autoComplete="off"
          inputMode="numeric"
          {...register("day", {
            required: "day is required!",
            min: 1,
            max: daysInMonth(today.month, today.year),
          })}
        />
        {errors.day && <p>{errors.day.message}</p>}

        <input
          type="number"
          autoComplete="off"
          inputMode="numeric"
          {...register("month")}
        />
        <input
          type="number"
          autoComplete="off"
          inputMode="numeric"
          {...register("year")}
        />

        <input type="submit" />
      </form>
    </div>
  )
}

export default DatePicker
