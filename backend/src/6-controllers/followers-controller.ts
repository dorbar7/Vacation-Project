import express, { Request, Response, NextFunction } from "express"
import followersLogic from "../5-logic/followers-logic"
import FollowerModel from "../4-models/followers-model"
import verifyLoggedIn from "../3-middleware/verify-loggedIn"

const router = express.Router()


//http://localhost:3001/api/followers
router.get("/followers", verifyLoggedIn,async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await followersLogic.getAllFollowers()
        response.json(followers)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/followers/id
router.get("/followers/:userId([0-9]+)",verifyLoggedIn,  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const followerInfo = await followersLogic.followerByUserId(userId)
        response.json(followerInfo)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/follower/userId/vacationId
router.get("/this-follower/:userId/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        const thisFollower = await followersLogic.userFollowingVacation(userId, vacationId)
        response.json(thisFollower)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/followers-on-vacation/vacationId
router.get("/followers-on-vacation/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        const thisFollower = await followersLogic.getFollowersOnVacationByVacationId(vacationId)
        response.json(thisFollower)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/followers
router.post("/followers", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = await followersLogic.addFollower(new FollowerModel(request.body))
        response.json(follower)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/followers/userId/vacationId
router.delete("/followers/:userId/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        await followersLogic.removeFollower(userId, vacationId)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err)
    }
})

export default router