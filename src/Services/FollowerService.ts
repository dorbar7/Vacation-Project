import axios from "axios"
import Config from "../Utils/Config"
import { VacationActionType, vacationsStore } from "../Redux/VacationState"
import { FollowerActionType, followerStore } from "../Redux/FollowerState"

class FollowerService {
 
 
  async follow(vacationId: number): Promise<void> {
        await axios.post<number>(Config.followersUrl + vacationId)
     }

     async unfollow(vacationId: number): Promise<void> {
         await axios.post<number>(Config.followersUrl + vacationId)
         followerStore.dispatch({ type: FollowerActionType.DeleteFollower, payload: vacationId })
         followerStore.dispatch({ type: FollowerActionType.DeleteFollower, payload: vacationId })
     }}