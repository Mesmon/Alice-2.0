import React from "react"

export interface IPost {
    id: string
    title: string
    date: string
    contentHtml: string
}

export interface ITableProps {
    // columns: Array<ColumnInstance<any>>
    columns: any
    data: any
    updateMyData: (
        rowIndex: string | number,
        columnID: string,
        value: string
    ) => void
    header?: any
    selectedColors: Array<string>
}

export interface IRestCellProps {
    style?: CSSProperties | undefined
    className?: string | undefined
    role?: string | undefined
}
