/* eslint-disable */
import { useEffect, useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import { ITableProps } from "../../../@types";
import GlobalTableFilter from "./GlobalTableFilter/GlobalTableFilter";

export default function Table({
  columns,
  data,
  updateMyData,
  header = null,
  selectedColors,
  customFilter,
  rowOnClick,
  ignoreRowOnClickColumns,
}: ITableProps) {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
    setFilter,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      initialState: {
        sortBy: [
          {
            id: "title",
            desc: false,
          },
        ],
      },
      autoResetSortBy: false,
      autoResetFilters: false,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  );

  useEffect(() => {
    // This will now use our custom filter for selectedColors
    customFilter && setFilter(customFilter, selectedColors);
  }, [selectedColors]);

  const { globalFilter } = state;

  const renderHeader = () => (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column) => (
            <th
              className={`sticky top-0
                bg-gray-700 text-gray-100
                pt-[14px] pb-[14px]
                z-20 text-center
                select-none
                ${
                  column.isSorted
                    ? column.isSortedDesc
                      ? "shadow-bottom"
                      : "shadow-top"
                    : ""
                }
              `}
              {...column.getHeaderProps(column.getSortByToggleProps())}
            >
              {column.render("Header")}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );

  return (
    <>
      <p>row amount: {rows.length}</p>
      {header && (
        <GlobalTableFilter filter={globalFilter} setFilter={setGlobalFilter} />
      )}

      <div className="w-11/12 m-auto max-h-[85vh] overflow-auto overflow-y-scroll rounded-t-3xl rounded-b-xl no-scrollbar border-b-4 border-gray-400">
        <table className={`w-full`} {...getTableProps()}>
          {/* border-separate border-spacing-4 //fistun*/}
          {renderHeader()}
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  // className=" hover:bg-gray-300 hover:text-indigo-700 hover:cursor-pointer odd:bg-gray-50 even:bg-gray-200 odd:rotate-2 even:-rotate-2 //fistun"
                  className=" hover:bg-gray-300 hover:text-indigo-700 hover:cursor-pointer odd:bg-gray-50 even:bg-gray-200"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="text-center p-4 select-none"
                        {...cell.getCellProps()}
                        onClick={
                          rowOnClick &&
                          (() =>
                            ignoreRowOnClickColumns?.includes(cell.column.id) ||
                            rowOnClick(row))
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
