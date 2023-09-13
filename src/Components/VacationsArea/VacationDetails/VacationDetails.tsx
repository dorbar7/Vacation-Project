import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Config from "../../../Utils/Config";
import "./VacationDetails.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationService";
import Admin from "../../AdminArea/Admin/Admin";
import { authStore } from "../../../Redux/AuthState";
import authService from "../../../Services/AuthService";
   

function VacationDetails(): JSX.Element {

    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();

    useEffect(() => {
        const vacationId = + params.vacationId
        alert(vacationId)
        vacationsService.getOneVacation(vacationId)
            .then(vacation=> setVacation(vacation))
            .catch(err => alert("Error: " + err.message));
    }, []);

    async function deleteVacation(id: number) {
        try {
            await vacationsService.deleteVacation(id);
            alert("This Vacation has been deleted");
            navigate("/vacations");
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="VacationDetails">

            <h2>Vacation Details</h2>

            {vacation &&
                <>
                    {}
                    <h3>Destinion: {vacation.destination}</h3>
                    <h3>Description: {vacation.description}</h3>
                    <h3>Date Start: {vacation.dateStart}</h3>
                    <h3>Date End: {vacation.dateEnd}</h3>
                    <h3>Price: {vacation.price}</h3>
                    <img src={Config.vacationImagesUrl + vacation.photoName} />
                </>
            }

            <br />
            <br />

            <NavLink to="/vacations">Back</NavLink>
            <span> | </span>{authService.isAdmin() === true && <>
            <NavLink to={"/vacation-edit/" + vacation?.id}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={() => deleteVacation(vacation.id)}>Delete</NavLink>
           </>}
        </div>
    );
}

export default VacationDetails;


