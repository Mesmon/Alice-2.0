import { IMovie } from ".";

export default interface ITableProps {
  // columns: Array<ColumnInstance<any>>
  columns: any;
  data: any;
  updateMyData: (dataId: string | number, values: Partial<IMovie>) => void;
  header?: any;
  selectedColors?: Array<string>;
  customFilter?: string;
  rowOnClick?: (args: any) => any;
  ignoreRowOnClickColumns?: Array<string>;
}
