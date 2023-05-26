import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EngineerDashboard from './pages/EngineerDashboard/EngineerDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="engineer-dashboard" element={<EngineerDashboard />} />
          <Route path="user-dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
