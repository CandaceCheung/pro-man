import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { NavbarLayout } from './components/NavbarLayout';
import { Auth } from './pages/Auth';
import { IRootState } from './store';

function App() {

  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn)

  return (
    <div className="App">
      <div className='page-container'>
        {isLoggedIn ? <NavbarLayout/>:<Auth/>}
      </div>
    </div>
  );
}

export default App;
