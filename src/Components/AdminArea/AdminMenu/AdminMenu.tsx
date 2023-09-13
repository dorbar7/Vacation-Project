import { useEffect, useState } from "react";
import "./AdminMenu.css";
import { RoleModel } from "../../../Models/RoleModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import VerifyAdmin from "../../../Utils/VerifyAdmin";
import authService from "../../../Services/AuthService";



function AdminMenu(): JSX.Element {
   

        const [Admin, setAdmin] = useState<RoleModel>();

        useEffect(() => {

        setAdmin(authStore.getState().user.role=Admin);

     const unsubscribe = authStore.subscribe(() => {
        setAdmin(authStore.getState().user.role);
     });
    
   return () => unsubscribe();

 }, []);

return (
    <div className="AdminMenu">
           
           {authService.isAdmin() === true && <>
            <NavLink to="/add-vacation">Add Vacation</NavLink>
            <span> | </span>
            <NavLink to="/edit-vacation">🖊</NavLink>
        </>}

          
        
    </div>
);
    
} 

export default AdminMenu;
