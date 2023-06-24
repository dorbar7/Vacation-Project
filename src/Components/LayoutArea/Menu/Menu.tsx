import { NavLink } from "react-router-dom";
import "./Menu.css";

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
