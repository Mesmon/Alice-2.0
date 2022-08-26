import React from "react";

interface Iprops {
  numberValue: number;
  setNumberValue: React.Dispatch<React.SetStateAction<number>>;
  maxValue: number;
  minValue: number;
  name?: string;
  visualLength?: number;
  placeHolder?: string | number;
}

const NumberInput = ({
  numberValue,
  setNumberValue,
  maxValue,
  minValue,
  name,
  visualLength,
  placeHolder,
}: Iprops) => {
  const width = visualLength ? `w-${visualLength * 2}` : "w-4";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newNumberValue = parseInt(event.target.value) || minValue;
    if (isManualInputOk(newNumberValue)) setNumberValue(newNumberValue);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  const isManualInputOk = (newNumberValue: number) => {
    if (newNumberValue > maxValue || newNumberValue < minValue) return false;
    return true;
  };
  1;
  const formatValueDisplay = () => {
    if (numberValue === 0) {
      if (placeHolder) return "";
      else {
        if (visualLength) return "0".repeat(visualLength);
        else return "0";
      }
    }

    let numberToDisplay = numberValue.toString();
    if (visualLength) {
      let numberString = numberValue.toString();
      numberString =
        "0".repeat(visualLength - numberString.length) + numberString;
      numberToDisplay = numberString;
    }
    return numberToDisplay;
  };

  return (
    <input
      name={name}
      className={`outline-none" appearance-none ${width}`}
      type="number"
      min={minValue}
      max={maxValue}
      size={visualLength}
      value={formatValueDisplay()}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder={placeHolder?.toString()}
    />
  );
};

export default NumberInput;
