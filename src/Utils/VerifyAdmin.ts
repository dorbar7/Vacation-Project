import { authStore } from "../Redux/AuthState"
import notify from "../Services/NotifyService"
import { verify } from "crypto"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { RoleModel } from "../Models/RoleModel"

function VerifyAdmin(){


        const navigate = useNavigate()
    
        useEffect(() => {
    
            if (authStore.getState().user) {
                if (authStore.getState().user.role !== RoleModel.Admin) {
                    navigate("/vacations")
                    notify.error("You Are Not An Admin ")
                }
            }
            {
                notify.error("You Are Not Logged in !")
                navigate("/login")
               
            }
    
        }, [])
    }
    
    export default VerifyAdmin