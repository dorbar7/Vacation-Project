import Joi from "joi";
import { RoleModel } from "./role-model";

class UserModel {
    public userId: number
    public userFirstName: string
    public userLastName: string
    public username: string
    public password: string
    public role: RoleModel

    public constructor(user: UserModel) {
        this.userId = user.userId
        this.userFirstName = user.userFirstName
        this.userLastName = user.userLastName
        this.username = user.username
        this.password= user.password
        this.role = user.role
    }

    public static validationSchema = Joi.object({
        userId: Joi.number().optional().positive().integer(),
        userFirstName: Joi.string().required().min(2).max(20),
        userLastName: Joi.string().required().min(2).max(20),
        username: Joi.string().required().min(4).max(30),
        password: Joi.string().required().min(5).max(40),
        role: Joi.forbidden()
    })

    public validate(): string {
        const result = UserModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default UserModel