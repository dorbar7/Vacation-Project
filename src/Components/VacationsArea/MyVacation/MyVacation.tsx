import { useState } from "react";
import UserModel from "../../../Models/UserModel";
import "./MyVacation.css";
import VacationModel from "../../../Models/VacationModel";
import followerService from "../../../Services/FollowerService";
import vacationsService from "../../../Services/VacationService";
import VacationCard from "../VacationCard/VacationCard";
import FollowerModel from "../../../Models/FollowerModel";

function MyVacation(): JSX.Element {
   const [user,setUser]=useState<FollowerModel>()
   const [vacations,setVacations]=useState<VacationModel>()
    function myVacations(userId:number, vacationId:number) {
      const follower= followerService.getFollowerByUserId(userId)
      const vacation= vacationsService.getOneVacation(vacationId)

           
    
   }
    return (
        <div className="MyVacation">
			
        </div>
    );
}

export default MyVacation;
