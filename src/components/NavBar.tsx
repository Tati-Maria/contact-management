import {Link, Outlet} from "react-router-dom";
import { Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
    <>
    <Nav>
        <Container>
          <h2>My Contacts</h2>
            <Link to="/contact-list">Contact List</Link>
            <Link to="/contact-form">Add Contact</Link>
        </Container>
    </Nav>
    <Outlet />
    </>
  )
}

export default NavBar;