import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import Insert from "../../DataArea/Insert/Insert";
import PageNotFound from "../PageNotFound/PageNotFound";
import Home from "../../HomeArea/Home/Home";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import Register from "../../AuthArea/Register/Register";
import Logout from "../../AuthArea/Logout/Logout";
import Login from "../../AuthArea/Login/Login";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import FollowVacations from "../../UserArea/FollowVacation/FollowVacation";

 function Routing(): JSX.Element {



    

    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/vacations" element={<VacationList />} />
                <Route path="/add-vacation" element={<AddVacation/>} />
                <Route path="/vacations/details/:vacationId" element={<VacationDetails/>} />  
               <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/edit-vacation/:vacationId" element={<EditVacation />} />
                 <Route path="/" element={ <Home />} />  
                 <Route path="/my-vacation" element={<FollowVacations/>} /> 
                {/* <Route path="/future-vacations" element={<FutureVacations />} />*/}
                <Route path="*" element={<PageNotFound />} /> 
            </Routes>
        </div>
    );
}

export default Routing;