import FollowerModel from "../Models/FollowerModel";
import { createStore } from "redux";

export class FollowerState {
    public followers: FollowerModel [] = []
}

export enum FollowerActionType {
    FetchFollowers,
    AddFollower,
    DeleteFollower,
    FollowVacation  ,
    UnfollowVacation 
}

export interface FollowersAction {
    type: FollowerActionType
    payload?: any
}

export function FollowerReducer(currentState = new FollowerState(), action: FollowersAction): FollowerState {
    const newState = { ...currentState }

    switch (action.type) {
        case FollowerActionType.FetchFollowers:
            newState.followers = action.payload
            break
        case FollowerActionType.AddFollower:
            newState.followers.push(action.payload)
            break
        case FollowerActionType.DeleteFollower:
            const indexToDel = newState.followers.findIndex(f => f.userId === action.payload.userId && f.vacationId === action.payload.vacationId)
            if (indexToDel >= 0) {
                newState.followers.splice(indexToDel, 1)
            }
            break
            // case FollowerActionType.FollowVacation:
            //     const follow = newState.followers.find(f => f.destination === action.payload)
            //     follow. = 1
            //     follow. += 1
            //     break
    
            // case FollowerActionType.UnfollowVacation:
            //     const unFollow = newState.followers.find(f => f.vacationId === action.payload)
            //     if (unFollow.follow === 1)
            //         unFollow.followersCount = 0
            //     break
    }
    return newState
}

export const followerStore = createStore(FollowerReducer)