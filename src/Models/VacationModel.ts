class VacationModel{
    public id: number
    public destination: string
    public dateStart: string
    public dateEnd: string
    public description: string
    public price: number
    public photoName: string
    public photo:  FileList


    public static destinationValid ={
        required:{value: true, message: "Missing destination"}, 
        minLength:{value: 4 , message:"too short"},
        maxLength: {value: 50, message: "too long"}   }
    
        
    public static descriptionValid ={
        required:{value: true, message: "Missing descriptionvalid"}, 
        minLength:{value: 5, message:"too short"},
        maxLength: {value: 400, message: "too long"}   }
        
    public static priceValid ={
        required:{value: true, message: "Missing price"}, 
        minLength:{value: 50 , message:"too short"},
        maxLength: {value: 20000, message: "too long"}   }


}
export default VacationModel