import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import CredentialModel from "../../../Models/CrdentialModel";
import authService from "../../../Services/AuthService";

function Login(): JSX.Element {

    const { register, handleSubmit } = useForm< CredentialModel>();
    const navigate = useNavigate();

    async function send(credentials:  CredentialModel) {
        try {
            await authService.login(credentials);
            alert("Welcome Back!");
            navigate("/home");
        }
        catch(err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Login Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Login</h2>

                <label>Username: </label>
                <input type="text" {...register("username")} />

                <label>Password: </label>
                <input type="password" {...register("password")} />

                <button>Login</button>

            </form>

        </div>
    );
}

export default Login;

