import React, { useState, useEffect } from 'react';
import Table from './components/Table';
import Nav from './components/Nav';

function App() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch('names')
      .then((res) => res.json())
      .then((data) => {
        setNames(data);
      });
  }, []);

  console.log(names);

  return (
    <div className='App bg-indigo-200 flex justify-center flex-column'>
      <div className='relative'>
        <div>
          <Nav namesList={names} />
        </div>
        <div className='flex justify-center pt-5 pb-10'>
          <Table namesList={names} />
        </div>
      </div>
      <footer className='bg-indigo-400 fixed z-50 bottom-0 w-full text-center p-1'>
        <p>Created with ❤️ by Saila Honkanen</p>
      </footer>
    </div>
  );
}

export default App;
