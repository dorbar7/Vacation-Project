import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import FollowerModel from "../4-models/followers-model"
import { ErrorModel, ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model"

async function getAllFollowers(): Promise<FollowerModel[]> {
    const sql = `
    SELECT
        followers.followersId,
        users.userFirstName AS 'firstName',
        users.userLastName AS 'lastName',
        vacation.destination , 
        followers.userId ,
        followers.vacationId
    FROM followers
        JOIN users ON followers.userId = users.userId 
        JOIN vacation ON followers.vacationId = vacation.vacationId;
    `

    const followers = await dal.execute(sql)

    return followers
}

async function getFollowerByUserId(userId: number): Promise<FollowerModel> {
    const sql = `
    SELECT
        users.userFirstName AS 'firstName',
        users.userLastName AS 'lastName',
        vacation.destination AS 'destination', 
        users.userId ,
        vacation.vacationId 
    FROM followers
        JOIN users ON followers.userId = users.userId
        JOIN vacation ON followers.vacationId = vacation.vacationId
    WHERE followers.userId = ${userId}
    `

    const followerInfo = await dal.execute(sql)

    return followerInfo
}

async function userFollowingVacation(userId: number, vacationId: number): Promise<boolean> {
    const sql = `
    SELECT * FROM followers 
    WHERE userIDd = ${userId}
    AND vacationId = ${vacationId}
    `

    const thisFollower = await dal.execute(sql)
    if (thisFollower.length === 0) return false

    return true
}

async function getFollowersOnVacationByVacationId(vacationId: number): Promise<FollowerModel[]> {
    const sql = `
    SELECT         
        users.userFirstName AS 'firstName',
        users.userLastName AS 'lastName',
        vacation.destination AS 'destination', 
        users.userId ,
        vacation.vacationId 
    FROM followers
        JOIN users ON followers.userId = users.userId
        JOIN vacation ON followers.vacationId = vacation.vacationId
    WHERE followers.vacationId = ${vacationId}
    `

    const followersArray = await dal.execute(sql)

    return followersArray
}

async function addFollower(follower: FollowerModel) {
    const errors = follower.validate()
    if (errors) throw new ValidationErrorModel(errors)

    const checkIfExist = `
    SELECT * FROM followers
    WHERE userId = ${follower.userId} AND vacationId = ${follower.vacationId}
    `

    const response = await dal.execute(checkIfExist)

    if (response[0]) throw new ValidationErrorModel("Already exist")

    const sql = `
    INSERT INTO followers(userId, vacationId) VALUES (${follower.userId},${follower.vacationId})
    `

    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ErrorModel("Something went wrong", 400)

    const followerInfoSql = `
    SELECT
        users.userFirstName AS 'firstName',
        users.userLastName AS 'lastName',
        vacation.destination AS 'destination', 
        users.userId ,
        vacation.vacationId 
    FROM followers
        JOIN users ON followers.userId = users.userId
        JOIN vacation ON followers.vacationId = vacation.vacationId
    WHERE followers.userId = ${follower.userId}
    AND vacation.vacationId = ${follower.vacationId}
    `

    const followerInfoContainer = await dal.execute(followerInfoSql)

    const followerInfo = followerInfoContainer[0]

    return followerInfo
}

async function removeFollower(userId: number, vacationId: number): Promise<void> {
    const sql = `
    DELETE FROM followers
    WHERE userId = ${userId}
    AND vacationId = ${vacationId}
    `

    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(userId)
}

export default {
    getAllFollowers,
    getFollowerByUserId,
    userFollowingVacation,
    addFollower,
    getFollowersOnVacationByVacationId,
    removeFollower,
   
}