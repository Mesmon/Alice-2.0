import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import axios from "axios";
import Table from "../components/Table";
import ColumnFilter, { customFilterFunction } from "../components/ColumnFilter";
import { Cell } from "react-table";
import { DropdownCell } from "../components/Dropdown";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import DatePickerZ from "../components/DatePicker/DatePicker";

function getAllStarwarsPeople() {
  let people: any[] = [];
  // first page
  return axios("https://swapi.dev/api/people/")
    .then((response) => {
      // collect people from first page
      people = response.data.results;
      return response.data.count;
    })
    .then((count) => {
      // exclude the first request
      const numberOfPagesLeft = Math.ceil((count - 1) / 10);
      let promises = [];
      // start at 2 as you already queried the first page
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
      }
      return Promise.all(promises);
    })
    .then((response) => {
      //get the rest records - pages 2 through n.
      people = response.reduce(
        (acc, data) => [...acc, ...data.data.results],
        people
      );
      return people;
    })
    .catch((error) => console.log("Properly handle your exception here"));
}

export default function TablePage() {
  const [loadingData, setLoadingData] = useState(true);

  const [filteredColors, setFilteredColors] = useState<Array<string>>([]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: function RenderDropDownCell({ cell }: { cell: Cell }) {
          return <DropdownCell originalSelectedOption="bruh" options={items} />;
        },
      },
      {
        Header: "Color",
        accessor: "skin_color",
      },

      {
        Header: "Height",
        accessor: "height",
      },
      {
        Header: "Eye Color",
        accessor: "eye_color",
        filter: customFilterFunction,
      },
      {
        Header: "Created Date",
        accessor: "created",
      },
      {
        Header: "Home World",
        accessor: "homeworld",
      },
    ],
    []
  );

  const [data, setData] = useState([{}]);

  // useEffect(() => {
  //     async function getData() {
  //         const starwarsPeople = await getAllStarwarsPeople()
  //         setData(starwarsPeople ? starwarsPeople : [])
  //         setLoadingData(false)
  //     }
  //     if (loadingData) {
  //         // if the result is not ready so you make the axios call
  //         getData()
  //     }
  // }, [loadingData])

  // const updateMyData = (
  //     rowIndex: string | number,
  //     columnID: string,
  //     value: string
  // ) => {
  //     // We also turn on the flag to not reset the page
  //     setData((old) =>
  //         old.map((row, index) => {
  //             if (index === rowIndex) {
  //                 return {
  //                     ...old[rowIndex],
  //                     [columnID]: value,
  //                 }
  //             }
  //             return row
  //         })
  //     )
  // }

  const [selectedDate, setSelectedDate] = useState(new Date());

  const people = [
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      role: "Admin",
      email: "jane.cooper@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      name: "Jane Cooper",
      title: "Regional Paradigm Technician",
      department: "Optimization",
      role: "Admin",
      email: "jane.cooperz@example.com",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
  ];

  const items = ["bruh", "moment", "occured"];
  const [date, setDate] = useState(new Date(2021, 9, 12));

  const onChange = (event: any) => {
    const value = event?.target?.value;
    console.log(value);

    // setDate()
  };

  return (
    //#region hide bruh
    // <div className='flex flex-col'>
    //     <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
    //         <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
    //             <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
    //                 <table className='min-w-full divide-y divide-gray-200'>
    //                     <thead className='bg-gray-50'>
    //                         <tr>
    //                             <th
    //                                 scope='col'
    //                                 className='select-none px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
    //                                 Name
    //                             </th>
    //                             <th
    //                                 scope='col'
    //                                 className='select-none px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
    //                                 Title
    //                             </th>
    //                             <th
    //                                 scope='col'
    //                                 className='select-none px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
    //                                 Status
    //                             </th>
    //                             <th
    //                                 scope='col'
    //                                 className='select-none px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
    //                                 Role
    //                             </th>
    //                             <th
    //                                 scope='col'
    //                                 className='relative px-6 py-3'>
    //                                 <span className='sr-only'>Edit</span>
    //                             </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody className='bg-white divide-y divide-gray-200'>
    //                         {people.map((person) => (
    //                             <tr key={person.email}>
    //                                 <td className='select-none px-6 py-4 whitespace-nowrap'>
    //                                     <div className='flex items-center'>
    //                                         <div className='flex-shrink-0 h-10 w-10'>
    //                                             <Image
    //                                                 className='rounded-full'
    //                                                 src={person.image}
    //                                                 width={40}
    //                                                 height={40}
    //                                                 alt=''
    //                                             />
    //                                         </div>
    //                                         <div className='ml-4'>
    //                                             <div className='text-sm font-medium text-gray-900'>
    //                                                 {person.name}
    //                                             </div>
    //                                             <div className='text-sm text-gray-500'>
    //                                                 {person.email}
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 </td>
    //                                 <td className='select-none px-6 py-4 whitespace-nowrap'>
    //                                     <div className='text-sm text-gray-900'>
    //                                         {person.title}
    //                                     </div>
    //                                     <div className='text-sm text-gray-500'>
    //                                         {person.department}
    //                                     </div>
    //                                 </td>
    //                                 <td className='px-6 py-4 whitespace-nowrap border-2'>
    //                                     {/* <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
    //                                         Active
    //                                     </span> */}

    //                                     <NewListbox selectedValue='moment'>
    //                                         <Dropdown
    //                                             originalSelectedOption='moment'
    //                                             options={items}
    //                                         />
    //                                     </NewListbox>
    //                                 </td>
    //                                 <td className='select-none px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
    //                                     {person.role}
    //                                 </td>
    //                                 <td className='select-none px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
    //                                     <a
    //                                         href='#'
    //                                         className='text-indigo-600 hover:text-indigo-900'>
    //                                         Edit
    //                                     </a>
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    //#endregion
    <div className="w-full flex justify-between">
      {/* <ColumnFilter
                filteredColors={filteredColors}
                setFilteredColors={setFilteredColors}
            />

            {loadingData ? (
                <p>Loading Please wait...</p>
            ) : (
                <Table
                    columns={columns}
                    data={data}
                    updateMyData={updateMyData}
                    header
                    selectedColors={filteredColors}
                />
            )} */}
      <DatePicker onChange={setDate} value={date} />
      <DatePickerZ />
    </div>
  );
}
function onChange(timestamp: any) {
  console.log(timestamp);
}
