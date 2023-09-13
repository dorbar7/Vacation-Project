import "./VacationFollower.css";

import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationService"
import notify from "../../../Services/NotifyService";
import "./FollowVacation.css";
import axios from "axios";
import appConfig from "../../../Utils/Config";
import FollowerModel from "../../../Models/FollowerModel";

import { verify } from "crypto";



interface FollowVacationProps {
   follower : FollowerModel
}

function FollowVacation(props: FollowVacationProps): JSX.Element {
   
    const [isFollowing, setIsFollowing] = useState(false);
       

    async function follow():Promise<void> {
        try {
            const request = {
                userId: props.follower.userId,
                vacationId: props.follower.vacationId
            };
            await axios.post(appConfig.followersUrl, request);
            setIsFollowing(true);
            notify.success("You followed " + props.follower.destination)
        } catch (e) {
            notify.error(e);
        }
    }

    async function unFollow() {
        try {
            const request = {
                userId: props.follower.userId,
                vacationId: props.follower.vacationId
            };
            await axios.post(appConfig.followersUrl + "unFollow", request);
            setIsFollowing(false);
            notify.success("You Unfollowed " + props.follower.destination )
        } catch (e) {
            notify.error(e);
        }
    }

    useEffect(() => {
        async function isUserFollowing() {
            try {
                const request = {
                    userId: props.follower.userId,
                    vacationId: props.follower.vacationId
                };
                const response = await axios.post(appConfig.followersUrl + "isUserFollowing", request);
                if (response.data.length > 0) setIsFollowing(true);
            } catch (e) {
                notify.error(e);
            }
        }
        isUserFollowing();
    }, [props]);

    return (
        <div className="FollowVacation">
            { isFollowing ? <button className="btn btn-danger" onClick={unFollow}>Unfollow</button> : <button className="btn btn-primary" onClick={follow}>Follow</button>}
        </div>
    );
}

export default FollowVacation;
