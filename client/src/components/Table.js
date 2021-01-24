import React, { useState, useMemo } from 'react';

const useSortableData = (names, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedNames = useMemo(() => {
    let sortableNames = [...names];

    if (sortConfig !== null) {
      sortableNames.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableNames;
  }, [names, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return { names: sortedNames, requestSort, sortConfig };
};

const Table = (props) => {
  const { names, requestSort, sortConfig } = useSortableData(props.namesList);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className='shadow-lg bg-white rounded-lg truncate'>
      <thead>
        <tr>
          <th className='bg-indigo-400 text-white text-left hover:bg-purple-700'>
            <button
              type='button'
              onClick={() => requestSort('name')}
              className={
                (`${getClassNamesFor('name')}`,
                'hover:bg-purple-700 focus:outline-none px-8 py-4 w-full')
              }
            >
              Name
            </button>
          </th>
          <th className='bg-indigo-400 text-white text-left hover:bg-purple-700'>
            <button
              type='button'
              onClick={() => requestSort('amount')}
              className={
                (`${getClassNamesFor('amount')}`,
                'hover:bg-purple-700 focus:outline-none px-8 py-4')
              }
            >
              Amount
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {names.length === 0 ? (
          <tr>
            <td>Names are fetching...</td>
          </tr>
        ) : (
          names.map((person, index) => (
            <tr key={index} className='border-t'>
              <td className='px-8 py-4'>{person.name}</td>
              <td className='px-8 py-4'>{person.amount}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
