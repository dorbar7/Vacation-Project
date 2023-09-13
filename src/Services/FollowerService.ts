import { CheckBox } from '@mui/icons-material';
import axios from "axios"
import Config from "../Utils/Config"
import { VacationActionType, vacationsStore } from "../Redux/VacationState"
import { FollowerActionType, followerStore } from "../Redux/FollowerState"
import FollowerModel from "../Models/FollowerModel"

class FollowerService {
 


    public async getAllFollowers(): Promise<FollowerModel[]> {

        let followers = followerStore.getState().followers

        if (followers.length === 0) {
            const response = await axios.get<FollowerModel[]>(Config.followersUrl)
            followers = response.data
            followerStore.dispatch({ type: FollowerActionType.FetchFollowers, payload: followers })
        }

        return followers
    }

    public async getFollowerByUserId(userId: number): Promise<FollowerModel[]> {
        const followers = followerStore.getState().followers
        let follower = followers.filter(f => f.userId === userId)

        if (follower.length === 0) {
            const response = await axios.get(Config.followersUrl + userId)
            follower = response.data
        }
        return follower
    }

    public async addFollower(follower: FollowerModel): Promise<boolean> {
        const response = await axios.post(Config.followersUrl, follower)
        const addedFollower = response.data
        followerStore.dispatch({ type: FollowerActionType.AddFollower, payload: addedFollower })
        return true
    }

    public async removeFollower(follower: FollowerModel): Promise<void> {
        await axios.delete(`${Config.followersUrl}${follower.userId}/${follower.vacationId}`)
        followerStore.dispatch({ type: FollowerActionType.DeleteFollower, payload: follower })
    }

    public async userFollowingVacation(userId: number, vacationId: number): Promise<boolean> {

        let followers = followerStore.getState().followers
        let CheckBox = followers.find(f => f.userId === userId && f.vacationId === vacationId)
        let follower = CheckBox ? true : false

        if (!follower) {
            const result = await axios.get(`${Config.thisFollower}${userId}/${vacationId}`)
            follower = result.data
        }

        return follower
    }

    public async getFollowersOnVacationByVacationId(vacationId: number): Promise<FollowerModel[]> {

        let followers = followerStore.getState().followers
        let followersOnVacation = followers.filter(f => f.vacationId === vacationId)

        if (followersOnVacation.length === 0) {
            const response = await axios.get(Config.followerByVacation + vacationId)
            followersOnVacation = response.data
        }

        return followersOnVacation
    }

  public async follow(vacationId: number): Promise<void> {
    let vacations= vacationsStore.getState().vacations
    let vacation = vacations.filter(v=>v.id===vacationId)
     vacation.map(v=>v.followersCount+1)
    
    await axios.post<number>(Config.followersUrl + vacationId)
           
     }

    public  async unfollow(vacationId: number): Promise<void> {
        let vacations= vacationsStore.getState().vacations
        let vacation = vacations.filter(v=>v.id===vacationId)
         vacation.map(v=>v.followersCount-1)
         await axios.post<number>(Config.followersUrl + vacationId)
         vacationsStore.dispatch({ type: VacationActionType.UnfollowVacation, payload: vacationId })
         followerStore.dispatch({ type: FollowerActionType.DeleteFollower, payload: vacationId })
     }}
     
     
 const followerService = new FollowerService()

export default followerService