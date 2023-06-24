import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { AuthState, authStore } from "../../../Redux/AuthState";
import "./AuthMenu.css";
import { render } from "react-dom";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);

        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        
        return () => unsubscribe();

    }, []);
  
    return (
        <div className="AuthMenu">

            {!user && <>
                <span>Hello Guest | </span>
                <NavLink to="/login">Login</NavLink>
                <span> | </span>
                <NavLink to="/register">Register</NavLink>
            </>}

            {user && <>
                <span>Hello {user.userFirstName} {user.userLastName} | </span>
                <NavLink to="/logout">Logout</NavLink>
            </>}

              
            
        </div>
    );
}

export default AuthMenu;
