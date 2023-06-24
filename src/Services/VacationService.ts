import axios from "axios";
import appConfig from "../Utils/Config";
import VacationModel from "../Models/VacationModel";
import { VacationActionType, vacationsStore } from "../Redux/VacationState";

class VacationService {

    
    public async getAllVacations(): Promise<VacationModel []> {

   
        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {

             
            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl); 

             
            vacations = response.data;

            
            vacationsStore.dispatch({ type: VacationActionType.FetchVacations, payload: vacations });
        }

        
        return vacations;
    }

    
    public async getOneVacation(id: number): Promise<VacationModel> {

        let vacations = vacationsStore.getState().vacations;

        let vacation = vacations.find(v => v.id === id);

        if (!vacation) {

            
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id);
 
            vacation = response.data;
        }
 
        return vacation;
    }

   
    public async addVacation(vacation: VacationModel): Promise<void> {

        const myFormData = new FormData(); 
        myFormData.append("destination",vacation.destination );
        myFormData.append("dateStart", vacation.dateStart.toString());
        myFormData.append("dateEnd", vacation.dateEnd.toString());
        myFormData.append("description",vacation.description );
        myFormData.append("price", vacation.price.toString());
        myFormData.append("photo", vacation.photo[0]);
        myFormData.append("photoName", vacation.photoName);
    
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData);  

        const addedVacation = response.data;
         //To DATE FORMAT   
        const dateStart = new Date(vacation.dateStart);
        const dateFormatStart= dateStart.toLocaleDateString('en-GB');
        addedVacation.dateStart = dateFormatStart;

        const dateEnd = new Date(vacation.dateEnd);
        const dateFormatEnd = dateEnd.toLocaleDateString('en-GB');
        addedVacation.dateEnd = dateFormatEnd
            
        vacationsStore.dispatch({ type: VacationActionType.AddVacation, payload: addedVacation });
    }

    
    public async updateVacation(vacation: VacationModel): Promise<void> {

        const myFormData = new FormData();
        myFormData.append("destination",vacation.destination );
        myFormData.append("dateStart", vacation.dateStart);
        myFormData.append("dateEnd", vacation.dateEnd);
        myFormData.append("description",vacation.description );
        myFormData.append("price", vacation.price.toString());
        myFormData.append("photo", vacation.photo[0]); 
        myFormData.append("photoName", vacation.photoName);
     
        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, myFormData); 

        const updatedVacation = response.data;
            
         //To DATE FORMAT   
         const dateStart = new Date(vacation.dateStart);
         const dateFormatStart= dateStart.toLocaleDateString('en-GB');
         updatedVacation.dateStart = dateFormatStart;
 
         const dateEnd = new Date(vacation.dateEnd);
         const dateFormatEnd = dateEnd.toLocaleDateString('en-GB');
         updatedVacation.dateEnd = dateFormatEnd
        
        vacationsStore.dispatch({ type: VacationActionType.UpdateVacation, payload: updatedVacation });
    }

   
    public async deleteVacation(id: number): Promise<void> {

        
        await axios.delete<void>(appConfig.vacationsUrl + id);

        
        vacationsStore.dispatch({ type: VacationActionType.DeleteVacation, payload: id });

    }

}

const vacationsService = new VacationService(); //Singelton

export default vacationsService;
