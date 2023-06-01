import { Dispatch, useEffect, useState } from 'react';

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 200,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
  );
};

const GlobalTableFilter = ({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: Dispatch<any>;
}) => <div className="flex justify-center mb-4">
    <DebouncedInput
      type="text"
      value={globalFilter ?? ''}
      onChange={(value) => setGlobalFilter(String(value))}
      className={`px-4 py-3 leading-5 
      focus:text-blue-400 focus:placeholder-blue-400 focus:border-blue-400
        border rounded-md focus:outline-none focus:ring-1`}
      placeholder="Search all columns..." />
  </div>;
// <div className="flex justify-center mb-4">
//   <input
//     className={`px-4 py-3 leading-5
//       focus:text-blue-400 focus:placeholder-blue-400 focus:border-blue-400
//       border rounded-md focus:outline-none focus:ring-1`}
//     value={value || ''}
//     onChange={(e) => {
//       setValue(e.target.value);
//       onChange(e.target.value);
//     }}
//     placeholder="Filter outside table"
//   />
// </div>

// setFilter("height", heightFilter)

export default GlobalTableFilter;
