import { ReactNode, useState } from "react"

export default function NewListbox({
    selectedValue,
    updateMyData,
    cellInfo,
    children,
}: {
    selectedValue: string
    updateMyData?: (rowIndex: number, columnID: string, value: string) => void
    cellInfo?: { rowIndex: number; columnID: string }
    children?: ReactNode
}) {
    const [selected, setSelected] = useState(selectedValue)
    const [isEditable, setIsEditable] = useState(false)
    // const { rowIndex, columnID } = cellInfo

    //#region comment

    // const selectRef = useRef<HTMLButtonElement>(null)

    //#region scroll

    // const [dropdownOpen, _setDropdownOpen] = useState(false)

    // const dropdownOpenRef = useRef(dropdownOpen)

    // const setDropdownOpen = (value: boolean) => {
    //     dropdownOpenRef.current = value
    //     _setDropdownOpen(value)
    // }

    // useEffect(() => {
    //     const handleWheel = () => {
    //         console.log(dropdownOpen)
    //         if (dropdownOpen) exitEditing()
    //     }

    //     isEditable &&
    //         window.addEventListener("mousewheel", handleWheel, {
    //             passive: true,
    //         })

    //     return () => window.removeEventListener("mousewheel", handleWheel)
    // }, [dropdownOpen, isEditable])
    //#endregion

    // useEffect(() => {
    //     if (isEditable) {
    //         selectRef?.current?.focus()
    //     }
    // }, [isEditable])

    // const handleBlur = (e: any) => {
    //     // if the blur was because of outside focus
    //     // currentTarget is the parent element, relatedTarget is the clicked element
    //     if (!e.currentTarget.parentNode.contains(e.relatedTarget)) {
    //         console.log(e.relatedTarget.parentNode)
    //         exitEditing()
    //     }
    // }

    //#endregion
    const exitEditing = () => {
        setIsEditable(false)
    }

    const setAndUpdateSelected = (newSelectedValue: string) => {
        setSelected(newSelectedValue)
        // updateMyData(rowIndex, columnID, newSelectedValue)
    }

    return isEditable ? (
        // <Dropdown originalSelectedOption='moment' options={items} />

        <>{children}</>
    ) : (
        <div
            className='cursor-pointer text-center p-2'
            onDoubleClick={() => setIsEditable(true)}>
            {selected}
        </div>
    )
}
