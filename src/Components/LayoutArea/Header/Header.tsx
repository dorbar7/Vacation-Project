import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
                            <AuthMenu />
                            
						<h2>Go To Vacations ✈ 🏖 </h2>

        </div>
    );
}

export default Header;
