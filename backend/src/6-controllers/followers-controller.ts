import express, { Request, Response, NextFunction } from "express"
import UserModel from "../4-models/user-model"
import authLogic from "../5-logic/auth-logic"
import CredentialsModel from "../4-models/credentials-model"
import followersLogic from "../5-logic/followers-logic"
import FollowerModel from "../4-models/followers-model"
import verifyAdmin from "../3-middleware/verify-admin"
import verifyLoggedIn from "../3-middleware/verify-loggedIn"

const router = express.Router()


//http://localhost:3001/api/followers
router.get("/followers", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followers = await followersLogic.getAllFollowers()
        response.json(followers)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/followers/id
router.get("/followers/:userId([0-9]+)",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const followerInfo = await followersLogic.getFollowerByUserId(userId)
        response.json(followerInfo)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/follower/userId/vacationId
router.get("/follower/:userId/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = +request.params.userId
        const vacationId = +request.params.vacationId
        const specificFollower = await followersLogic.userFollowingVacation(userId, vacationId)
        response.json(specificFollower)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/followers-by-vacation/vacationId
router.get("/followers-by-vacation/:vacationId", verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        const specificFollower = await followersLogic.getFollowersOnVacationByVacationId(vacationId)
        response.json(specificFollower)
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