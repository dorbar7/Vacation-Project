
import VacationModel from "../Models/VacationModel";
import { createStore } from "redux";


export class VacationState{
    public vacations: VacationModel[] = []
}

export enum VacationActionType{
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    FollowVacation,
    UnfollowVacation
    
}

export interface VacationAction{
    type: VacationActionType,
    payload:any
}

export function VacationReducer(currentState= new VacationState() ,action:VacationAction):VacationState{
     
      const newState = {...currentState}

      switch (action.type) {
        case VacationActionType.FetchVacations:
            newState.vacations = action.payload
            break
        case VacationActionType.AddVacation:
            newState.vacations.push(action.payload)
            break
        case VacationActionType.UpdateVacation:
            const indexForUpdate = newState.vacations.findIndex(v => v.id === action.payload.id)
            if (indexForUpdate >= 0) {
                newState.vacations[indexForUpdate] = action.payload
            }
            break
        case VacationActionType.DeleteVacation:
            const indexForDelete = newState.vacations.findIndex(v => v.id === action.payload.id)
            if (indexForDelete >= 0) {
                newState.vacations.splice(indexForDelete, 1)
            }
            break
               case VacationActionType.FollowVacation:
                const follow = newState.vacations.find(v => v.follow === action.payload)
                follow.follow = 1
                follow.followersCount = + 1
                break
    
            case VacationActionType.UnfollowVacation:
                const unFollow = newState.vacations.find(v => v.follow === action.payload)
                if (unFollow.follow === 1)
                    unFollow.followersCount = -1
                break
            
    }

      return newState
}
export const vacationsStore = createStore(VacationReducer)