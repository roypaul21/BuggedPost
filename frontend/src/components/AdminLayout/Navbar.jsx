import {Outlet} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

function AdminNavbar() {

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="light" fixed='top' id="navbar-bug">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
                src='./images/bb-icon.png'
                width="100"
                height="45"
                className="d-inline-block align-top"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className='nav-link' to="/home-admin">Home</Link>
            <Link className='nav-link' to="/create-blog">Create Blog</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Outlet />
    </>
  );
}



export default AdminNavbar;
