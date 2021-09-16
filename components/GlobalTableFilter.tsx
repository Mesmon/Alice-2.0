import { useState } from "react"
import { useAsyncDebounce } from "react-table"
import { tailwindCombine } from "../utils"

const GlobalTableFilter = ({
    filter,
    setFilter,
}: {
    filter: string
    setFilter: any
}) => {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined)
    }, 200)

    return (
        <div className='flex justify-center mb-4'>
            <input
                className={tailwindCombine(
                    "px-4 py-3 leading-5",
                    "focus:text-blue-400 focus:placeholder-blue-400 focus:border-blue-400",
                    "border rounded-md focus:outline-none focus:ring "
                )}
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
                placeholder='Filter outside table'
            />
        </div>
    )
}

// setFilter("height", heightFilter)

export default GlobalTableFilter
