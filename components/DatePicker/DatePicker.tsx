import * as utilities from "./Helpers"
import { SubmitHandler, useForm } from "react-hook-form"

type FormValues = {
  day: number
  month: number
  year: number
}

function DatePicker() {
  const today = new Date()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      day: today.getDay(),
      month: today.getMonth(),
      year: today.getFullYear(),
    },
  })
  const onSubmit = (data: FormValues) => alert(data)
  alert(errors)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="number"
          autoComplete="off"
          inputMode="numeric"
          {...register("day")}
        />
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
