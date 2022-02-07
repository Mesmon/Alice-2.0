import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import Table from "../components/Table/Table";
import ColumnFilter, {
  customFilterFunction,
} from "../components/Table/ColumnFilter/ColumnFilter";
import { Row } from "react-table";
import DropdownCell from "../components/Dropdown/Dropdown";
import { DateTime } from "luxon";
import { NextPage } from "next";
import { IMovie } from "../../@types";
import { ReactQueryDevtools } from "react-query/devtools";
import useMovies from "../hooks/data/useMovies";
import useSaveMovie from "../hooks/data/useSaveMovie";

const TablePage: NextPage = () => {
  const { isLoading, data, isError, error } = useMovies();
  const saveMovie = useSaveMovie();

  const [filteredColors, setFilteredColors] = useState<Array<string>>([]);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: function RenderDropDownCell({
          value,
          row,
        }: {
          value: string;
          row: Row<IMovie>;
        }) {
          return (
            <DropdownCell
              value={value}
              options={items}
              dataId={row.original._id}
              updateMyData={updateMyData}
            />
          );
        },
      },
      {
        Header: "Title",
        accessor: "title",
      },

      {
        Header: "Runtime",
        accessor: "runtime",
      },
      //   {
      //     Header: "Eye Color",
      //     accessor: "eye_color",
      //     filter: customFilterFunction,
      //   },
      {
        Header: "Release Date",
        accessor: "released",
        Cell: ({ value }: { value: string }) => {
          return value
            ? DateTime.fromISO(value).toFormat("dd/MM/yyyy")
            : "No known Release Date :(";
        },
      },
      {
        Header: "Rating",
        accessor: "imdb.rating",
      },
      {
        Header: "Votes",
        accessor: "imdb.votes",
      },
    ],
    []
  );

  const updateMyData = (dataId: string | number, values: Partial<IMovie>) => {
    saveMovie.mutate({ id: dataId, values: values });
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const items = ["bruh", "moment", "occurred"];
  const [date, setDate] = useState(new Date(2021, 9, 12));

  const onChange = (event: any) => {
    const value = event?.target?.value;
    console.log(value);

    // setDate()
  };

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading Please wait...</h2>;
  }

  return (
    <div className="w-full">
      <ColumnFilter
        filteredColors={filteredColors}
        setFilteredColors={setFilteredColors}
      />
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        header
        selectedColors={filteredColors}
        rowOnClick={(row: Row<IMovie>) => console.log(row.original._id)}
        ignoreRowOnClickColumns={["type"]}
        //   customFilter="eye_color"
      />
      <ReactQueryDevtools />
    </div>
  );
};

export default TablePage;
