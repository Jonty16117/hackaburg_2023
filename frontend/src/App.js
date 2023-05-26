import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import EngineerDashboard from './pages/EngineerDashboard/EngineerDashboard';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import companyLogo from './assets/vitesco_logo.jpg';

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/user-dashboard">
            <img src={companyLogo} alt="vitesco_logo" style={{ height: '40px' }} className="icon mr-2" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="Vitesco" />
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/user-dashboard" activeClassName="active">User Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/engineer-dashboard" activeClassName="active">Engineer Dashboard</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/engineer-dashboard" element={<EngineerDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
