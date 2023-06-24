import { RoleModel } from "../../../Models/RoleModel";
import UserModel from "../../../Models/UserModel";
import "./Admin.css";


interface userProps {
    user:UserModel
}
function Admin(): JSX.Element {
    
    const Admin = RoleModel.Admin
    const User =RoleModel.User
    
    async function ifIsAdmin(user:UserModel):Promise<UserModel>{
         
        if(user.username==="Admin" && user.password==="Admin" && user.role===Admin){
           return user 
        }
        else User

    }
    return (
        <div className="Admin">
			
        </div>
    );
}

export default Admin;
