import { useEffect, useState } from "react";
import "./VacationList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import { NavLink } from "react-router-dom";
import VacationCard from "../VacationCard/VacationCard";
import useVerifyLoggedIn from "../../../Utils/UseVerifyLoggedIn";

function VacationList(): JSX.Element {
   const [vacations,setVacations] = useState<VacationModel[]>([])
   useVerifyLoggedIn()
   useEffect(()=>{
    vacationsService.getAllVacations()
    .then(vacations=> setVacations(vacations))
    .catch(err => alert(err.message));
}, []);

return (
<div className="vacationsList">
    <h3>The Vacations That We Have</h3>
    {vacations.length === 0 && <Spinner />}
    
    

    {vacations.map(v => <VacationCard key={v.id} vacation={v} />)}

</div>
    );
}

export default VacationList;
