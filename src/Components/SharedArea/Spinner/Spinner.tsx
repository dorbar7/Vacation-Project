import "./Spinner.css";
import spinnerSource from "../../../Assets/Imegas/spinner.gif"
function Spinner(): JSX.Element {
    return (
        <div className="Spinner">
			<img src={spinnerSource} />
        </div>
    );
}

export default Spinner;
