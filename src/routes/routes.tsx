import {Routes, Route} from "react-router-dom";
import AddNewContact from "../pages/AddNewContact";
import Home from "../pages/Home";

const routes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/addnewcontact" element={<AddNewContact />}></Route>
        <Route path="*" element={<span>Not found</span>}></Route>
    </Routes>
  )
}

export default routes