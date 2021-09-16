import React, { useState, useEffect } from "react"

const statuses = ["relationship", "complicated", "single"]

interface IProps {
    value: string
    // currentRowNum: number
    editableRowNumber: number
}

export default function InTableSelect({
    value,
    editableRowNumber,
}: // currentRowNum,
IProps) {
    const [isEditable, setIsEditable] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(value)

    async function handleSelectChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        await setSelectedStatus(event.target.value)
        //console.log(event.target.value)

        setIsEditable(false)
    }

    // const handleDblClick = () => {
    //     setIsEditable(!isEditable)
    // }
    // useEffect(() => {
    //     currentRowNum === editableRowNumber
    //         ? setIsEditable(true)
    //         : setIsEditable(false)
    // }, [editableRowNumber])

    // return isEditable ? (
    //     <select
    //         className='appearance-none group pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-800'
    //         name='statuses'
    //         id='statuses'
    //         value={selectedStatus}
    //         onChange={(e) => handleSelectChange(e)}
    //         onBlur={() => setIsEditable(false)}>
    //         {statuses.map((status) => (
    //             <option key={status} value={status}>
    //                 {status}
    //             </option>
    //         ))}
    //     </select>
    // ) : (
    //     <div onDoubleClick={() => setIsEditable(!isEditable)}>
    //         {selectedStatus}
    //     </div>
    // )

    return <div>{selectedStatus}</div>
}
