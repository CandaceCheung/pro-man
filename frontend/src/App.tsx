import React from 'react';
import './App.scss';
import { LeftNavbar } from './components/LeftNavbar';
import ProjectNavbar from './components/ProjectNavbar';
import { Auth } from './pages/Auth';

function App() {
  return (
    <div className="App">
      <LeftNavbar />
      <ProjectNavbar/>
      <div className='page-container'>
        <Auth/>
      </div>
    </div>
  );
}

export default App;
