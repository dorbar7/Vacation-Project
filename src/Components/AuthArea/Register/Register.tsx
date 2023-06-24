import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import "./Register.css";
import { useForm } from "react-hook-form";
import notify from "../../../Services/NotifyService";

//useVerifyLoggedOut("register")

function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            notify.success(` Welcome You Join To Us  !`)
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err.message);
        }
    }

    return (
        <div className="Register Box">

            <form className="myForm" onSubmit={handleSubmit(send)}>
                <h2>Register</h2>
                <label>First Name:</label>
                <input type="text" placeholder="First Name" {...register("userFirstName")} /><br />
                <label>Last Name:</label>
                <input type="text" placeholder="Last Name" {...register("userLastName")} /><br />
                <label>Username:</label>
                <input type="username" placeholder="dor777" {...register("username")} /><br />
                <label>Password:</label>
                <input type="password" placeholder="**********" {...register("password")} /><br />
                <button>Register !</button>

            </form>

        </div>
    );
}

export default Register;

    

