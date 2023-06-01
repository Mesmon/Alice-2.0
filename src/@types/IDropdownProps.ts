import { IMovie } from ".";

export default interface IDropdownProps {
  value: string;
  dataId: string | number;
  updateMyData: (dataId: string | number, values: Partial<IMovie>) => void;
  originalSelectedOption?: string;
  options?: Array<string>;
  multiSelect?: boolean;
  allowEmpty?: boolean;
}
