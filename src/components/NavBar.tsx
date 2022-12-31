import {Link, Outlet} from "react-router-dom";
import {AiOutlineUserAdd} from "react-icons/ai"

const NavBar = () => {
  return (
    <>
    <nav className="navbar">
        <div className="navbar__container">
        <h2 className="navbar__logo">My Contacts</h2>
        <ul className="navbar__links">
          <li>
            <Link to="/contact-form"><AiOutlineUserAdd />Add Contact</Link>
          </li>
        </ul>
        </div>
    </nav>
    <Outlet />
    </>
  )
}

export default NavBar;