import { useEffect, useState } from "react";
import "./AdminMenu.css";
import { RoleModel } from "../../../Models/RoleModel";
import { authStore } from "../../../Redux/AuthState";
import { NavLink } from "react-router-dom";
import VerifyAdmin from "../../../Utils/VerifyAdmin";



function AdminMenu(): JSX.Element {
   

        const [admin, setAdmin] = useState<RoleModel>();

        useEffect(() => {

        setAdmin(authStore.getState().user.role=admin);

     const unsubscribe = authStore.subscribe(() => {
        setAdmin(authStore.getState().user.role);
     });
    
   return () => unsubscribe();

 }, []);

return (
    <div className="AdminMenu">
           
         {admin&&<>
            <NavLink to="/add-vacation">Add Vacation</NavLink>
            <span> | </span>
            <NavLink to="/edit-vacation">🖊</NavLink>
        </>}

          
        
    </div>
);
    
} 

export default AdminMenu;
