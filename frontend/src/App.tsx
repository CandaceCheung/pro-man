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

  const isLoggedIn = useSelector((state: IRootState) => state.auth.isLoggedIn)

  return (
    <div className="App">
      <div className='page-container'>
<<<<<<< HEAD
        {
          isLoggedIn
          ? <Dashboard/>
          : <Auth/>
        }
=======
        {isLoggedIn ? <ProjectNavbar/>:<Auth/>}
>>>>>>> 96af94360096e8476500c6194a6c4ec668ab56d1
      </div>
    </div>
  );
}

export default App;
