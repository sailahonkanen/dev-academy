import React from 'react';

const Nav = (props) => {
  const names = props.namesList;

  let total = 0;
  names.map((person) => {
    total += person.amount;
    return total;
  });

  return (
    <div className='flex flex-col justify-center text-center pt-4'>
      <h1 className='text-5xl font-light text-indigo-600 mb-2'>Name App</h1>
      <p className='text-2xl font-light text-indigo-600'>
        Total amount: {total}
      </p>
    </div>
  );
};

export default Nav;
