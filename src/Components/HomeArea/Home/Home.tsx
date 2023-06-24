import "./Home.css";
import photo1 from "../../../Assets/Imegas/underscored-nationalplanvacationday-lead-vacation-beach-travel.jpg"
function Home(): JSX.Element {
    return (
        <div className="Home">
			<h2>HOME PAGE</h2>
            <p>Best Vacation For Everyone</p>
            <hr />
            <img src={photo1} />
        </div>
    );
}

export default Home;
