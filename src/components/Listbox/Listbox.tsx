import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

const options = [
  "Wade Cooper",
  "Arlene Mccoy",
  "Devon Webb",
  "Tom Cook",
  "Tanya Fox",
  "Hellen Schmidt",
]

export default function ListBox({
  selectedValue,
  updateMyData,
  cellInfo,
}: {
  selectedValue: string
  updateMyData: (rowIndex: number, columnID: string, value: string) => void
  cellInfo: { rowIndex: number; columnID: string }
}) {
  const [selected, setSelected] = useState(selectedValue)
  const [isEditable, setIsEditable] = useState(false)
  const { rowIndex, columnID } = cellInfo

  const selectRef = useRef<HTMLButtonElement>(null)

  //#region scroll

  const [dropdownOpen, _setDropdownOpen] = useState(false)

  const dropdownOpenRef = useRef(dropdownOpen)

  const setDropdownOpen = (value: boolean) => {
    dropdownOpenRef.current = value
    _setDropdownOpen(value)
  }

  useLayoutEffect(() => {
    const handleWheel = () => {
      // console.log(dropdownOpen)
      if (dropdownOpen) exitEditing()
    }

    isEditable &&
      window.addEventListener("mousewheel", handleWheel, {
        passive: true,
      })

    return () => window.removeEventListener("mousewheel", handleWheel)
  }, [dropdownOpen, isEditable])
  //#endregion

  useEffect(() => {
    if (isEditable) {
      selectRef?.current?.focus()
    }
  }, [isEditable])

  const handleBlur = (e: any) => {
    // if the blur was because of outside focus
    // currentTarget is the parent element, relatedTarget is the clicked element
    if (!e.currentTarget.parentNode.contains(e.relatedTarget)) {
      exitEditing()
    }
  }

  const exitEditing = () => {
    setDropdownOpen(false)
    setIsEditable(false)
  }

  const setAndUpdateSelected = (newSelectedValue: string) => {
    setSelected(newSelectedValue)
    updateMyData(rowIndex, columnID, newSelectedValue)
  }

  return isEditable ? (
    // <td className='p-2'>
    <div className="w-full relative">
      <Listbox value={selected} onChange={setAndUpdateSelected}>
        <div className="">
          <Listbox.Button
            ref={selectRef}
            onBlur={handleBlur}
            className="w-full py-2 pl-3 pr-8 text-left bg-white rounded-lg shadow-md cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          >
            <span className="block truncate text-center">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            afterEnter={() => setDropdownOpen(true)}
            afterLeave={exitEditing}
          >
            <Listbox.Options
              unmount
              className="absolute z-10 w-full py-1 mt-1 overflow-visible bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `${
                      active ? "text-yellow-900 bg-yellow-100" : "text-gray-900"
                    }
                  cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } block truncate`}
                      >
                        {option}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? "text-yellow-600" : "text-yellow-600"
                          }
                        absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  ) : (
    // </td>
    <div
      className="cursor-pointer text-center p-2"
      onDoubleClick={() => setIsEditable(true)}
    >
      {selected}
    </div>
  )
}
