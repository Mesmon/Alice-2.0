import { useState } from 'react';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  Column,
  FilterFn,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { ITableProps } from '../../@types';
import GlobalTableFilter from './GlobalTableFilter/GlobalTableFilter';

export default function Table({
  columns,
  data,
  updateMyData,
  isHeader = null,
  // selectedColors,
  // customFilter,
  rowOnClick,
  ignoreRowOnClickColumns,
}: ITableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    meta: {
      updateData: updateMyData,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    debugTable: true,
  });

  const addSortIndicator = (column: Column<any, any>) => {
    if (column.getCanSort()) {
      if (column.getIsSorted() as string === 'desc') return 'shadow-bottom';
      if (column.getIsSorted() as string === 'asc') return 'shadow-top';
    }
    return '';
  };

  const renderGlobalFilter = () => {
    if (isHeader) {
      return (
        <GlobalTableFilter
          globalFilter={globalFilter} setGlobalFilter={setGlobalFilter}
        />);
    }
  };

  const renderHeader = () => (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder ? null : (
                <div
                  {...{
                    className:
                      `sticky top-0
                      select-none bg-gray-700
                      pt-[14px] pb-[14px]
                      text-center
                      text-gray-100
                    ${addSortIndicator(header.column)}
                    ${header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : ''},
                  `,
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </div>
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  return (
    <>
      <p>row amount: {table.getRowModel().rows.length}</p>
      {renderGlobalFilter()}

      <div className="no-scrollbar m-auto max-h-[70vh] w-11/12 overflow-auto overflow-y-scroll rounded-t-3xl rounded-b-xl border-b-4 border-gray-400">
        <table className={'w-full'}>
          {renderHeader()}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                // className=" hover:bg-gray-300 hover:text-indigo-700 hover:cursor-pointer
                // odd:bg-gray-50 even:bg-gray-200 odd:rotate-2 even:-rotate-2 //fistun"
                className=" odd:bg-gray-50 even:bg-gray-200
                hover:cursor-pointer hover:bg-gray-300 hover:text-indigo-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="select-none border-2 text-center"
                    onClick={() => {
                      if (rowOnClick) {
                        if (!ignoreRowOnClickColumns?.includes(cell.column.id)) { rowOnClick(row); }
                      }
                    }
                    }
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
