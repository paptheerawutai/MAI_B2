import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AU_chat from './msg/AU_chat';
// import Navbar from './MAI/navbar';
import StatusDashboard from './MAI/StatusDashboard';
// import App1 from './MAI/App1';
import DAS from './MAI/DAS';
import Navbar from './MAI/Navbar';
import './App.css'
import DashboardAlarm from './MAI/DashboardAlarm';



function App() {
    return (
        <Router>
          <Navbar/>
          <AU_chat/>
            <Routes>
                <Route path="/home" element={<DAS/>} />
                <Route path='/listalarm' element={<StatusDashboard/>}/>
                <Route path="/dashboard" element={<DashboardAlarm/>} />
                {/* <Route path="/chat" element={<AU_chat/>} /> */}
            </Routes>
        </Router>
    );
}

export default App;
