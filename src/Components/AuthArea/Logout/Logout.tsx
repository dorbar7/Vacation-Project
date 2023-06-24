import { useNavigate } from "react-router-dom";
import "./Logout.css";
import { useEffect } from "react";
import authService from "../../../Services/AuthService";
import notify from "../../../Services/NotifyService";


function Logout(): JSX.Element {

    const navTo = useNavigate()

    useEffect(() => {
        authService.logout()
        notify.error("Good By ")
        navTo("/login")
    }, [])

    return null
}

export default Logout;
