import { useEffect } from "react"
import { RoleModel } from "../Models/RoleModel"
import { authStore } from "../Redux/AuthState"
import notify from "../Services/NotifyService"
import { useNavigate } from "react-router-dom"

function VerifyUser(){
    
    const navigate = useNavigate()

    useEffect(() => {

        if (authStore.getState().user) {
            if (authStore.getState().user.role === "User") {
                navigate("/vacations")
            }
        }
        {
            notify.error("You Are Not Logged in !")
            navigate("/login")
           
        }

    }, [])
}

export default VerifyUser