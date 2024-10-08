import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import ClientDashboard from './components/ClientDashboard';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginRegister />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/client-dashboard" element={<ClientDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
