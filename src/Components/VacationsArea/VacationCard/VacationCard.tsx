import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import Config from "../../../Utils/Config"
import EditVacation from "../EditVacation/EditVacation";
import FollowVacation from "../VacationFollower/VacationFollower";
import { RoleModel } from "../../../Models/RoleModel";
import AdminMenu from "../../AdminArea/AdminMenu/AdminMenu";
interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard Box">
            <div>
                <h1>{props.vacation.destination}</h1>
                <br />
                Description: {props.vacation.description}
                <br />
                Time: {props.vacation.dateStart}-{props.vacation.dateEnd}
                <br />
                Price: {props.vacation.price}
                <br />
               
            </div>
            <div>
                <NavLink to={"/vacations/details/" + props.vacation.id}>
                    <img src={Config.vacationImagesUrl+ props.vacation.photoName} />
                </NavLink>
            </div>
            
               <AdminMenu/>
        </div>
    );
}

export default VacationCard;
