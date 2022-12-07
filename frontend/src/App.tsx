import React from 'react';
import './App.scss';
import { LeftNavbar } from './components/LeftNavbar';
import ProjectNavbar from './components/ProjectNavbar';
import { Auth } from './pages/Auth';
import { Home } from './pages/Home';
import { useAppSelector } from './store';

function App() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  return (
    <div className="App">
      <LeftNavbar />
      <ProjectNavbar/>
      <div className='page-container'>
        {isLoggedIn ? <Auth/> : <Home/>}
      </div>
    </div>
  );
}

export default App;
