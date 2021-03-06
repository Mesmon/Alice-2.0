import { CheckIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { usePopper } from "react-popper";
import { Portal } from "./Portal";
import { useIsOpenDblClick } from "../../hooks/useMaxTwoCounter";
import OutsideEventWrapper from "../OutsideEventWrapper/OutsideEventWrapper";
import useInterval from "../../hooks/useInterval";
import { IMovie } from "../../../@types";

interface IDropdownProps {
  value: string;
  dataId: string | number;
  updateMyData: (dataId: string | number, values: Partial<IMovie>) => void;
  originalSelectedOption?: string;
  options?: Array<string>;
  multiSelect?: boolean;
  allowEmpty?: boolean;
}

const DropdownCell = ({
  value,
  dataId,
  updateMyData,
  options = [],
  multiSelect = false,
  allowEmpty = false,
}: IDropdownProps) => {
  const [selection, setSelection] = useState<Array<string>>([value]);
  const { isOpen, setIsOpen, incCount, isHalfOpen } = useIsOpenDblClick();

  const handleOnOptionClick = (option: string) => {
    if (!selection.some((current) => current === option)) {
      //NOT already selected
      if (!multiSelect) {
        setSelection([option]);
        updateMyData(dataId, { type: option });
      } else if (multiSelect) {
        setSelection([...selection, option]);
        updateMyData(dataId, { type: [...selection, option].toString() });
      }
    } else {
      if (selection.length > 1 || allowEmpty) {
        //remove options if multiselect or allowEmpty are enabled
        let selectionAfterRemoval = selection;
        selectionAfterRemoval = selectionAfterRemoval.filter(
          (current) => current != option
        );
        setSelection([...selectionAfterRemoval]);
        updateMyData(dataId, { type: [...selectionAfterRemoval].toString() });
      }
    }

    setIsOpen(false);
  };

  const isOptionInSelection = (option: string) => {
    if (selection.find((current) => current === option)) {
      return true;
    }
    return false;
  };

  const clickOutsideRef = React.useRef<HTMLDivElement | null>(null);

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const indicatorColors = {
    clicked: "#60a5fa",
    nonClicked: "#1f2937",
  };

  useInterval(
    () => {
      setIsOpen(false);
    },
    // Delay in milliseconds or null to stop it

    isHalfOpen ? 400 : null
  );

  return (
    <>
      {/* renders original cell/button */}
      <div
        className={`
          inline-flex space-x-2 min-w-[140px],
          select-none cursor-pointer p-3,
          items-center justify-center
        `}
        ref={setReferenceElement}
        onClick={() => incCount()}
      >
        <span> {selection}</span>
        <span className="inline-flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12z"
              stroke={
                isHalfOpen || isOpen
                  ? indicatorColors.clicked
                  : indicatorColors.nonClicked
              }
            />
            <path
              d="M15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"
              stroke={
                isOpen ? indicatorColors.clicked : indicatorColors.nonClicked
              }
            />
          </svg>
        </span>
      </div>

      {isOpen && (
        //   render dropdown
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div ref={clickOutsideRef}>
              <OutsideEventWrapper
                parentRef={clickOutsideRef}
                onClickOutsideHandler={closeDropdown}
                onScrollOutsideHandler={closeDropdown}
              >
                <ul className="w-full mt-[20px] shadow-dropdown">
                  {options.map((option, idx) => (
                    <li className={`list-none select-none bg-white`} key={idx}>
                      <button
                        type="button"
                        className={`
                          flex w-full justify-between,
                          text-base text-left,
                          px-[15px] py-[20px],
                          group hover:cursor-pointer hover:font-bold hover:bg-gray-300
                          `}
                        onClick={() => handleOnOptionClick(option)}
                      >
                        <span className="group-hover:bg-red-400 px-2 inline-flex text-s leading-8 font-semibold rounded-full bg-green-100 text-green-800 select-none">
                          {option}
                        </span>
                        {isOptionInSelection(option) ? (
                          <CheckIcon
                            className="w-5 h-5 text-yellow-400"
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    </li>
                  ))}
                </ul>
              </OutsideEventWrapper>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default DropdownCell;
