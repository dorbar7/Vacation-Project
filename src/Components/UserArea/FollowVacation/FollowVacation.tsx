import { useEffect, useState } from "react";
import VacationsModel from "../../../Models/VacationModel";
import { authStore } from "../../../Redux/AuthState";
import FollowerModel from "../../../Models/FollowerModel";
import useVerifyLoggedIn from "../../../Utils/UseVerifyLoggedIn";
import notify from "../../../Services/NotifyService";
import { RoleModel } from "../../../Models/RoleModel";
import VacationCard from "../../VacationsArea/VacationCard/VacationCard";
import followerService from "../../../Services/FollowerService";
import authService from "../../../Services/AuthService";
import { vacationsStore } from "../../../Redux/VacationState";
import UserModel from "../../../Models/UserModel";
import { NavLink, useNavigate } from "react-router-dom";
import { followerStore } from "../../../Redux/FollowerState";
import VacationService from "../../../Services/VacationService";



function FollowVacations(): JSX.Element {
    
    useVerifyLoggedIn()
    const navigate = useNavigate()

    const [followVacations, setFollowVacations] = useState<VacationsModel[]>(null)

    useEffect(() => {

        handleFollowOnVacations()

        const unsubscribe = followerStore.subscribe(() => {
            handleFollowOnVacations()
        })

        return () => {
            unsubscribe()
        }
    }, [])

    async function handleFollowOnVacations() {
        try {
            if (authStore.getState().user) {
                if (authStore.getState().user.role === RoleModel.User) {

                    const followedVacations: FollowerModel[] = await followerService.getFollowerByUserId(authStore.getState().user.userId)
                    const vacations: VacationsModel[] = []
                    for (let vacation of followedVacations) {
                        const userFollowedVacation: VacationsModel = await VacationService.getOneVacation(vacation.vacationId)
                        vacations.push(userFollowedVacation)
                    }
                    if (vacations.length === 0) {
                        setFollowVacations(null)
                    }
                    else setFollowVacations(vacations)
                }
                else {
                    navigate("/vacations")
                    notify.error("Admin can't follow vacations")
                }
            }
        }
        catch (err) {
            notify.error(err)
        }
    }

    return (
        <div className="FollowedVacations">
            <h2>Followed Vacations</h2>
            <div className="row">
                {followVacations && followVacations.length !== 0 ? followVacations.map(oneVacation => <col key={oneVacation.id}><VacationCard vacation={oneVacation} /></col>) :
                    <>
                       
                        <NavLink to={"/vacations"}>Browse our vacations</NavLink>
                    </>
                }

            </div>
        </div>
    ) }
export default FollowVacations;



