import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import Config from "../../../Utils/Config"
import AuthFollow from "../../AuthArea/AuthFollow/AuthFollow";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationService";
import { useState } from "react";
import FollowerModel from "../../../Models/FollowerModel";
import FollowVacation from "../VacationFollower/VacationFollower";
import followerService from "../../../Services/FollowerService";
import VacationFollower from "../VacationFollower/VacationFollower";
import FollowVacations from "../../UserArea/FollowVacation/FollowVacation";

interface VacationCardProps {
    vacation: VacationModel;
   
            
}



function VacationCard(props: VacationCardProps): JSX.Element {
   
    const [vacation, setVacation] = useState<VacationModel[]>([]);
    let vacationss :Array<number>=[] 

        
    function myVacation(vacations: [] , vacationId:number){
        const follower = followerService.getFollowersOnVacationByVacationId(vacationId)
        const key= JSON.stringify(follower)
        localStorage.setItem(key,vacations.toString())
    }
    
    async function deleteVacation(id: number) {
        try {
            if (!window.confirm("Are you sure?")) return;
            await vacationsService.deleteVacation(id);
            alert("Vacation has been deleted");
    
            const deleteVacations = [...vacation];
            const index = deleteVacations.findIndex(v => v.id === id);
            deleteVacations.splice(index, 1);
            setVacation(deleteVacations);
    
        }
        catch (err: any) {
            alert(err);
        }}
  
 
    return (
        <div className="VacationCard Box" >
            
            <div className="card" >
                <div className="card-body">
                    <h2 className="card-title">{props.vacation.destination}</h2>
                    <p className="card-text">{props.vacation.description}</p>
                </div>
                <div className="card-footer text-muted">
                📅 {props.vacation.dateStart}-{props.vacation.dateEnd}
                 
                </div>
                <div className="vacationPrice">{props.vacation.price.toLocaleString()}.00 $</div>
              
                                  
            </div>
            <div>
                <NavLink to={"/vacations/details/" +props.vacation.id}>
                    <img src={Config.vacationImagesUrl + props.vacation.id} />
                </NavLink>
              {authService.isAdmin() === true &&
                <><div>
                     <NavLink to="/add-vacation">Add Vacation</NavLink>
                     <span> | </span>
                     <NavLink to={"/edit-vacation/" +props.vacation.id}>🖊</NavLink>
                     <span> | </span>
                  <button id="delete" onClick={() => deleteVacation(props.vacation.id)}>Delete</button>
                  </div>
                  
                </>}
                {authService.isAdmin() === false &&<><div>
                    <div className="checkbox">
                    <p className="card-text">{props.vacation.followersCount}</p>
                    <span>Followed Vacation </span>
                    <input type="CheckBox" id="filter"  onChange={()=>followerService.follow(+props.vacation.id) && vacationss.push(+props.vacation.id)} />
                   
                </div>
                
                <div className="checkbox">
                    <span>unFollow Vacation </span>
                    <input type="CheckBox" id="filter" onChange={()=>followerService.unfollow(+props.vacation.id )} />
                </div>
                 
                    
                    
            
                    
                </div>
                </>} 
            </div>
            
              
        </div>
       
    );
}

export default VacationCard;
