import { RoleModel } from "./RoleModel"

class UserModel {
    public userId: number
    public userFirstName: string
    public userLastName: string
    public username: string
    public password: string
    public role: RoleModel
}

export default UserModel