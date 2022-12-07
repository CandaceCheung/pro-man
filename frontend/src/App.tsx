import React from 'react';
import './App.scss';
import { LeftNavbar } from './components/LeftNavbar';
import ProjectNavbar from './components/ProjectNavbar';

function App() {
  return (
    <div className="App">
      <LeftNavbar />
      <ProjectNavbar/>
    </div>
  );
}

export default App;
