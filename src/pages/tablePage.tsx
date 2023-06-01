/* eslint-disable */

import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef, Row, createColumnHelper } from '@tanstack/react-table';
import { DateTime } from 'luxon';
import { NextPage } from 'next';
import { ReactQueryDevtools } from 'react-query/devtools';
import { motion } from 'framer-motion';
import { create } from 'domain';
import Table from '../components/Table/Table';
import ColumnFilter, {
  customFilterFunction,
} from '../components/Table/ColumnFilter/ColumnFilter';
import DropdownCell from '../components/Dropdown/Dropdown';
import { IMovie } from '../@types';
import useMovies from '../hooks/data/useMovies';
import useSaveMovie from '../hooks/data/useSaveMovie';
import AnimatedModal from '../components/Modal/AnimatedModal';
import Link from 'next/link';

const TablePage: NextPage = () => {
  const {
    isLoading, data, isError, error,
  } = useMovies();
  const saveMovie = useSaveMovie();

  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const [children, setChildren] = useState(
    <>
      <h1>ERROR</h1>
    </>,
  );

  useEffect(() => {
    const escapeKeyPress = (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
        close();
      }
    };
    window.addEventListener('keydown', escapeKeyPress);
    return () => {
      window.removeEventListener('keydown', escapeKeyPress);
    };
  }, []);

  const modalClassname = 'm-auto flex h-[30vh] w-[50vw] flex-col items-center rounded-xl bg-orange-500 py-0 px-8';

  const backdropClassname = 'bg-[#000000e1] absolute top-0 left-0 flex h-full w-full items-center justify-center';

  const makeModal = (row: Row<IMovie>) => {
    const newChildren = (
      <>
        <h1>{row.original._id}</h1>
        <p>{row.original.title}</p>
      </>
    );
    setChildren(newChildren);
    modalOpen ? close() : open();
  };

  const [filteredColors, setFilteredColors] = useState<Array<string>>([]);

  const columnHelper = createColumnHelper<IMovie>();

  const columns = [
    columnHelper.accessor('_id', { header: 'ID', cell: info => info.getValue() }),
    columnHelper.accessor('type', {
      header: 'Type', cell: info => {
        return <DropdownCell
          value={info.getValue()}
          options={items}
          dataId={info.row.original._id}
          updateMyData={updateMyData}
        />
      },
    }),
    columnHelper.accessor('title', { header: 'Title', cell: info => info.getValue() }),
    columnHelper.accessor('runtime', { header: 'Runtime', cell: info => info.getValue() }),
    columnHelper.accessor('released', {
      header: 'Release Date', cell: info => {
        return info.getValue()
          ?
          DateTime.fromJSDate(new Date(info.getValue())).toFormat("dd/MM/yyyy")
          :
          "No known Release Date :("
      }
    }),
    columnHelper.accessor('imdb.rating', { header: 'Rating', cell: info => info.getValue() }),
    columnHelper.accessor('imdb.votes', { header: 'Votes', cell: info => info.getValue() }),
  ];

  const updateMyData = (dataId: string | number, values: Partial<IMovie>) => {
    saveMovie.mutate({ id: dataId, values });
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const items = ['bruh', 'moment', 'occurred'];

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  if (isLoading) {
    return <h2>Loading Please wait...</h2>;
  }

  return (
    <div className="w-full bg-slate-200 dark:bg-slate-900">
      {/* <ColumnFilter
        filteredColors={filteredColors}
        setFilteredColors={setFilteredColors}
      /> */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-amber-600 text-slate-300
        "
        onClick={() => (modalOpen ? close() : open())}
      >
        Launch Modal
      </motion.button>
      <AnimatedModal
        modalOpen={modalOpen}
        handleClose={close}
        children={children}
        modalClassname={modalClassname}
        backdropClassname={backdropClassname}
      />
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        isHeader
      // selectedColors={filteredColors}
        rowOnClick={(row: Row<IMovie>) => makeModal(row)}
        ignoreRowOnClickColumns={['type']}  
      />
      <ReactQueryDevtools />
    </div>
  );
};

export default TablePage;
