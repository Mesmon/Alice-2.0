import { ColumnDef } from '@tanstack/react-table';
import IMovie from './IMovie';

export default interface ITableProps {
  // columns: Array<ColumnInstance<any>>
  columns: ColumnDef<any, any>[];
  data: any;
  updateMyData?: (dataId: string | number, values: Partial<IMovie>) => void;
  isHeader?: any;
  selectedColors?: Array<string>;
  customFilter?: string;
  rowOnClick?: (args: any) => any;
  ignoreRowOnClickColumns?: Array<string>;
}
