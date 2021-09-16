/* eslint-disable */
import { useEffect } from "react"
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table"
import { ITableProps } from "../@types"
import MyListbox from "./ListBox"
import GlobalTableFilter from "./GlobalTableFilter"
import { tailwindCombine } from "../utils"

export default function Table({
    columns,
    data,
    updateMyData,
    header = null,
    selectedColors,
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
                        id: "name",
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
    )

    useEffect(() => {
        // This will now use our custom filter for selectedColors
        setFilter("eye_color", selectedColors)
    }, [selectedColors])

    const { globalFilter } = state

    const renderHeader = () => (
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th
                            className={tailwindCombine(
                                "sticky top-0",
                                "bg-gray-700 text-gray-100",
                                // "border-2 border-gray-900",
                                "pt-[14px] pb-[14px]",
                                "z-20 text-center",
                                "select-none",

                                // Add a sort direction indicator
                                column.isSorted
                                    ? column.isSortedDesc
                                        ? "shadow-bottom"
                                        : "shadow-top"
                                    : ""
                            )}
                            {...column.getHeaderProps(
                                column.getSortByToggleProps()
                            )}>
                            {column.render("Header")}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
    )

    return (
        <>
            {header && (
                <GlobalTableFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilter}
                />
            )}

            <div className='w-11/12 m-auto max-h-[1150px] overflow-auto overflow-y-scroll rounded-t-3xl no-scrollbar'>
                <table className='w-full' {...getTableProps()}>
                    {renderHeader()}

                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr
                                    className=' hover:bg-gray-300 odd:bg-gray-50 even:bg-gray-200 last:border-b-2 last:border-gray-400'
                                    {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                className='text-center p-2'
                                                {...cell.getCellProps({})}>
                                                {cell.render("Cell")}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

//   tr:nth-child(even){background-color: #f2f2f2}

//   th {
//     background-color: rgb(115, 151, 206);
//     color: white;
//   }
