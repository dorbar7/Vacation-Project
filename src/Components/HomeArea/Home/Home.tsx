import "./Home.css";
import photo1 from "../../../Assets/Imegas/underscored-nationalplanvacationday-lead-vacation-beach-travel.jpg"
import photo2 from "../../../Assets/Imegas/Italy.jpg"
import photo3 from "../../../Assets/Imegas/Greece.jpg"
import photo4 from "../../../Assets/Imegas/1af5ccbf-475f-40d2-b938-f8675793233d.jpg"

function Home(): JSX.Element {
    return (
        <div className="Home">
			<h2>HOME PAGE</h2>
            <p>Best Vacation For Everyone</p>
            <hr />
            <img src={photo2} />
            <img src={photo3} />
            <img src={photo4} />

        </div>
    );
}

export default Home;
