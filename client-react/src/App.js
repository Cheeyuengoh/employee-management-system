import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import IndexPage from './page/IndexPage';
import EmployeesPage from './page/EmployeesPage';
import EmployeePage from './page/EmployeePage';

function App() {
  return (
    <div className="App">
      <Navbar>
        <Container>
          <Navbar.Brand href="/">EMS</Navbar.Brand>
          <Nav>
            <Nav.Link href="/employees">Employees</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />}></Route>
          <Route path="/employees" element={<EmployeesPage />}></Route>
          <Route path="/employees/:id" element={<EmployeePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
