import { useForm } from "react-hook-form";
import "./AddVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { useNavigate } from "react-router-dom";
import vacationsService from "../../../Services/VacationService";
import VerifyAdmin from "../../../Utils/VerifyAdmin";
import { verify } from "crypto";

function  AddVacation(): JSX.Element {
//  VerifyAdmin()
 const { register, handleSubmit, formState } = useForm<VacationModel>();
   const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            alert(" The Vacation has been successfully added!");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
     
        <div className="AddVacation Box">
             
            <form onSubmit={handleSubmit(send)}>

                <h2>Add Vacation</h2>

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValid)} />
                <span className="Error">{formState.errors.destination?.message}</span>

                <label>Date Start: </label>
                <input type="date" {...register("dateStart")} />
                <span className="Error">{formState.errors.dateStart?.message}</span>
                
                <label>Date End: </label>
                <input type="date" {...register("dateEnd")} />
                <span className="Error">{formState.errors.dateEnd?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price", VacationModel.priceValid)} />
                <span className="Error">{formState.errors.price?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("description", VacationModel.descriptionValid)} />
                <span className="Error">{formState.errors.description?.message}</span>
               
                <label>Photo Name: </label>
                <input type="text" {...register("photoName")} />
                <span className="Error">{formState.errors.photoName?.message}</span>

                <label>Photo: </label>
                <input type="file" accept="image/*" {...register("photo")} />

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddVacation;


