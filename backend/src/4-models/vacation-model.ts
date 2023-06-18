import { UploadedFile } from "express-fileupload"
import Joi from "joi"

class VacationsModel {
    public id: number
    public destination: string
    public dateStart: string
    public dateEnd: string
    public description: string
    public price: number
    public photoName: string
    public photo: UploadedFile
  

    public constructor(vacation: VacationsModel) {
        this.id = vacation.id
        this.destination = vacation.destination
        this.dateStart = vacation.dateStart
        this.dateEnd = vacation.dateEnd
        this.description=vacation.description
        this.price = vacation.price
        this.photoName = vacation.photoName
        this.photo = vacation.photo
    }

    public static validationSchema = Joi.object({
        id: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        startDate: Joi.string().required(),
        endDate: Joi.string().required(),
        description: Joi.string().required().min(5).max(100),
        price: Joi.number().required().positive().min(50).max(20000),
        photoName: Joi.string().optional(),
        photo: Joi.object().optional()
    })

    public validate(): string {
        const result = VacationsModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default VacationsModel