import React from 'react';
import './App.scss';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { useAppSelector } from './store';

function App() {

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  return (
    <div className="App">
        {
          isLoggedIn
          ? <Dashboard/>
          : <Auth/>
        }
    </div>
  );
}

export default App;
