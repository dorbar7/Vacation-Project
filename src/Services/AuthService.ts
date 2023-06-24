import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/Config";
import CredentialsModel from "../Models/CrdentialModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import { RoleModel } from "../Models/RoleModel";

class AuthService {

    public async register(user: UserModel): Promise<void> {
        const responseData = await axios.post(appConfig.registerUrl, user)
        const token = responseData.data
        authStore.dispatch({ type: AuthActionType.Register, payload: token })
    }

    public async login(credenetials: CredentialsModel): Promise<void> {
        const responseData = await axios.post(appConfig.loginUrl, credenetials)
        const token = responseData.data
        authStore.dispatch({ type: AuthActionType.Login, payload: token })
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout })
    }

    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;
    }

    public isAdmin(): boolean {
        const user = authStore.getState().user;
        if(user.role === RoleModel.Admin){
            return true;
        } else {
            return false;}
}
}
const authService = new AuthService()

export default authService