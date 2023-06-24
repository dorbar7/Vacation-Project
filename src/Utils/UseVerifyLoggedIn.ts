import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { authStore } from '../Redux/AuthState';
import notify from '../Services/NotifyService';



function useVerifyLoggedIn(){

    const navigate = useNavigate()

    if(!authStore.getState().token){
        notify.error("You Are Not logged in!")
        navigate("/login")
    }


}

export default useVerifyLoggedIn