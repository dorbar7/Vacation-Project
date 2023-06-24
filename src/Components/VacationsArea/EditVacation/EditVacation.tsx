import { useForm } from "react-hook-form";
import "./EditVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import vacationsService from "../../../Services/VacationService";

function EditVacation(): JSX.Element {
    
    const {register,handleSubmit,formState,setValue} = useForm<VacationModel>()
    const params = useParams()
    const nevigate=useNavigate()

    useEffect(()=>{
        const id = +params.vacationId
        console.log(id)
        vacationsService.getOneVacation(id)
        .then(vacation => {
            setValue("id",vacation.id)
            setValue("destination",vacation.destination)
            setValue("dateStart",vacation.dateStart)
            setValue("dateEnd",vacation.dateEnd)
            setValue("description",vacation.description)
            setValue("price",vacation.price)})
        .catch(err=> alert(err.message))

    })
    
    async function send(vacation:VacationModel) {
        try{
           alert("Hey")
           await vacationsService.updateVacation(vacation)
           alert("Vacation have been succesfully updated")
           nevigate("/vacations")
        }
        catch(err:any){
            alert(err.message)
        }
    }
    return (
        <div className="EditVacation  Box">
		<form onSubmit={handleSubmit(send)}>

            <h2>Update Vacation</h2>

            <input type="hidden" {...register("id")}/>
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

export default EditVacation;
