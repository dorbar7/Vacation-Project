import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ErrorModel, UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-model";
import { RoleModel } from "../4-models/role-model";
import UserModel from "../4-models/user-model";
import secure from "../2-utils/secure";
import CredentialsModel from "../4-models/credentials-model";

async function register(user: UserModel): Promise<string> {
    const errors = user.validate()
    if (errors) throw new ValidationErrorModel(errors)

    // user.password = secure.hash(user.password)
    const checkUsernameQuery = `
    SELECT 
        userId AS userId,
        userFirstName,
        userLastName,
        username,
        userPassword AS password,
        userRole AS role
    FROM users
    WHERE username = '${user.username}'
    `

    const checkUsername = await dal.execute(checkUsernameQuery)

    if (checkUsername[0]) throw new ValidationErrorModel("Username already in use.")

    user.role = RoleModel.User

    const sql = `
    INSERT INTO users (userFirstName,userLastName,username,userPassword,userRole)
    VALUES ('${user.userFirstName}','${user.userLastName}','${user.username}','${user.password}','${user.role}')
    `
    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ErrorModel("Something didn't work,please try again.", 400)

    user.userId = info.insertId

    const token = secure.getNewToken(user)

    return token
}

async function login(credentials: CredentialsModel): Promise<string> {
    const errors = credentials.validate()
    if (errors) throw new ValidationErrorModel(errors)

    // credentials.password = secure.hash(credentials.password)

    const userCheckQuery = `
    SELECT 
        userId,
        userFirstName ,
        userLastName ,
        username ,
        userPassword AS password,
        userRole AS role
    FROM users
    WHERE username = '${credentials.username}'
    AND userPassword = '${credentials.password}'
    `

    const userCheck = await dal.execute(userCheckQuery)

    const user = userCheck[0]
    if (!user) throw new UnauthorizedErrorModel("Incorrect username or password.")

    const token = secure.getNewToken(user)

    return token
}

export default {
    register,
    login
}