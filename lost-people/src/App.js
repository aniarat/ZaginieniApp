import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import Home from './components/Home'
import ReportForm from './components/ReportForm';
import PersonalPage from './components/PersonalPage';
import getCookie from './functions/getCookie';
import getToken from './functions/getToken';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import UserList from './components/UserList';
import MyReports from './components/MyReports';
import Edit from './components/Edit';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('')
  const navigate = useNavigate();


  useEffect(() => {
    if (getCookie() !== null) {
      setIsLoggedIn(true);
      setRole(getToken().role);
    }
    else {
      if (isLoggedIn) {
        setIsLoggedIn(false);
        setRole('');
      }
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {/* <Router> */}
      <Navbar logged={isLoggedIn} role={role} />
      <Routes>
        <Route exact path="/" element={<Home logged={isLoggedIn} role={role} />} />
        <Route exact path="/login" element={<Login logged={isLoggedIn} />} />
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/report-missing-person" element={<ReportForm logged={isLoggedIn} />} />
        <Route exact path="/person/:id" element={<PersonalPage logged={isLoggedIn} role={role} />} />
        <Route exact path="/users-list" element={<UserList role={role} />} />
        <Route exact path="/my-reports" element={<MyReports logged={isLoggedIn} role={role}/>} />
        <Route exact path="/edit-report/:id" element={<Edit role={role}/>} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
