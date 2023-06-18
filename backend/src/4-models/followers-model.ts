import Joi from "joi"

class FollowerModel {
    public followerId: number
    public followerFirstName: string
    public followerLastName: string
    public destination: string
    public userId: number
    public vacationId: number

    public constructor(follower: FollowerModel) {
        this.followerId = follower.followerId
        this.followerFirstName = follower.followerFirstName
        this.followerLastName = follower.followerLastName
        this.destination = follower.destination
        this.userId = follower.userId
        this.vacationId = follower.vacationId
    }

    public static validationSchema = Joi.object({
        followerId: Joi.number().optional(),
        followerFirstName: Joi.string().optional(),
        followerLastName: Joi.string().optional(),
        destination: Joi.string().optional(),
        userId: Joi.number().required().integer().positive(),
        vacationId: Joi.number().required().integer().positive()
    })

    public validate(): string {
        const result = FollowerModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default FollowerModel