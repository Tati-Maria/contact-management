import {Link} from "react-router-dom";
import { Nav, Container } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Nav>
        <Container>
            <Link to="/">Contact List</Link>
            <Link to="/addnewcontact">Add Contact</Link>
        </Container>
    </Nav>
  )
}

export default NavBar;