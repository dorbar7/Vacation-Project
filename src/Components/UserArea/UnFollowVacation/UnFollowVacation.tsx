import FollowerModel from "../../../Models/FollowerModel";
import VacationModel from "../../../Models/VacationModel";
import { followerStore } from "../../../Redux/FollowerState";
import followerService from "../../../Services/FollowerService";
import vacationsService from "../../../Services/VacationService";
import useVerifyLoggedIn from "../../../Utils/UseVerifyLoggedIn";
import "./UnFollowVacation.css";

function UnFollowVacation(): JSX.Element {
    useVerifyLoggedIn()
    let users=[]
    let vacations =[]
    async function unFollow(userId:number, vacationId:number) {
     const follower= await followerService.getFollowerByUserId(userId)
     const vacation=await vacationsService.getOneVacation(vacationId)
     const indexToDel =  follower.findIndex(f => f.userId === userId && f.vacationId === vacationId)
            if (indexToDel >= 0) {
              
            } 

        
    }
    return (
        <div className="UnFollowVacation">
			
        </div>
    );
}

export default UnFollowVacation;
