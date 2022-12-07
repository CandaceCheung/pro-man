import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { LeftNavbar } from './components/LeftNavBar';
import ProjectNavbar from './components/ProjectNavbar';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { useAppSelector } from './store';

function App() {

  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return (
    <div className="App">
      <div className='page-container'>
        {
          isLoggedIn
          ? <Dashboard/>
          : <Auth/>
        }
      </div>
    </div>
  );
}

export default App;
