// import { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import Config from "../../../Utils/Config";
// import "./VacationDetails.css";
// import VacationModel from "../../../Models/VacationModel";
// import vacationsService from "../../../Services/VacationService";

// function VacationDetails(): JSX.Element {

//     const params = useParams();
//     const [vacation, setVacation] = useState<VacationModel>();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const id = +params.vacationId
//         alert(id)
//         vacationsService.getOneVacation(id)
//             .then(vacation=> setVacation(vacation))
//             .catch(err => alert("Error: " + err.message));
//     }, []);

//     async function deleteVacation(id: number) {
//         try {
//             await vacationsService.deleteVacation(id);
//             alert("This Vacation has been deleted");
//             navigate("/vacations");
//         }
//         catch(err: any) {
//             alert(err.message);
//         }
//     }

//     return (
//         <div className="VacationDetails">

//             <h2>Vacation Details</h2>

//             {vacation &&
//                 <>
//                     {}
//                     <h3>Destinion: {vacation.destination}</h3>
//                     <h3>Description: {vacation.description}</h3>
//                     <h3>Date Start: {vacation.dateStart}</h3>
//                     <h3>Date End: {vacation.dateEnd}</h3>
//                     <h3>Price: {vacation.price}</h3>
//                     <img src={Config.vacationImagesUrl + vacation.photoName} />
//                 </>
//             }

//             <br />
//             <br />

//             <NavLink to="/vacations">Back</NavLink>
//             <span> | </span>
//             <NavLink to={"/vacation-edit/" + vacation?.id}>Edit</NavLink>
//             <span> | </span>
//             <NavLink to="#" onClick={() => deleteVacation(vacation.id)}>Delete</NavLink>

//         </div>
//     );
// }

// export default VacationDetails;


import { CheckBox } from "@mui/icons-material";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import authService from "../../../Services/AuthService";
import VacationCard from "../VacationCard/VacationCard";;
import "./VacationDetails.css";
import VacationService from "../../../Services/VacationService";
import FollowerModel from "../../../Models/FollowerModel";

function VacationDetails(): JSX.Element {
    const [follower, setFollower] = useState<FollowerModel[]>([]);
    const [vacation, setVacation] = useState<VacationModel[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(3);

    // useEffect(() => {
    //     {
    //         authService.isAdmin() ?
    //             VacationService.getAllVacations()
    //                 .then(vacation => setVacation(vacation))
    //                 .catch(err => alert(err.message)) 
    
    //     }},[]);

    const totalPages = Math.ceil(follower.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    function filterByFollowed() {
        let filter = (follower.filter(f => f.vacationId >= 1))
        setFollower(filter)
    }

    function filterByFutureVacation() {
        const now = new Date();
        let filter = vacation.filter((v) => {
            let vacationDate = new Date(v.dateStart);
            return (vacationDate >= now);
        })
        setVacation(filter);
    }

    function filterByActiveVacation() {
        const now = new Date();
        let filter = vacation.filter((v) => {
            let dateStart = new Date(v.dateStart);
            let dateEnd = new Date(v.dateEnd);

            return (dateStart <= now &&
                dateEnd >= now);
        })
        setVacation(filter);
    }

    return (
        <div className="VacationDetails">
            <h1>Vacations</h1>

            {authService.isAdmin() === false && <>
                <div className="checkbox">
                    <span>Vacation in progress</span>
                    <input type="CheckBox" id="filter" onChange={filterByActiveVacation} />
                </div>
                <div className="checkbox">
                    <span>Followed Vacation </span>
                    <input type="CheckBox" id="filter" onChange={filterByFollowed} />
                </div>
                <div className="checkbox">
                    <span>Vacation that not started</span>
                    <input type="CheckBox" id="filter" onChange={filterByFutureVacation} />
                </div>
            </>}

            {/* {authService.isAdmin() ? (
                vacation.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map(v => <VacationCard key={v.id} vacation={v} />)
            ) : (
                vacation.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map(v => <VacationUser key={v.vacationId} vacation={v} />))}
            <br /> */}

            <button id="previous" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} / {totalPages}</span>
            <button id="next" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div >
    );
}

export default VacationDetails;