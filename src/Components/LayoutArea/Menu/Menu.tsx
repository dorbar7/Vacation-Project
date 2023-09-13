import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import useVerifyLoggedIn from "../../../Utils/UseVerifyLoggedIn";
import notify from "../../../Services/NotifyService";

function Menu(): JSX.Element {
 
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
            <span> | </span>
            <NavLink to="/vacations">Vacations </NavLink>
            <span> | </span>
            <NavLink to="/my-vacations" >My Vacations</NavLink>
            <span> | </span>
           

         
           
        </div>
       
    );
}

export default Menu;
