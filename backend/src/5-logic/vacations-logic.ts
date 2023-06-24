import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-model";
import VacationsModel from "../4-models/vacation-model";
import fs from "fs"
import { v4 as uuid, v4 } from "uuid";


async function getAllVacations(): Promise<VacationsModel[]> {
    const sql = `
    SELECT 
        vacationId,destination ,DATE_FORMAT(dateStart,'%d/%m/%Y') AS dateStart,DATE_FORMAT(dateEnd,'%d/%m/%Y') AS dateEnd,
        description,price ,Photo 
    FROM vacation
        ORDER BY vacation.dateStart ASC;
    `
    const vacations = await dal.execute(sql)
    return vacations
}

async function getOneVacation(id: number): Promise<VacationsModel> {
   const sql = `
    SELECT
       vacationId AS id,
       destination AS destination,
        DATE_FORMAT(dateStart,'%d/%m/%Y') AS dateStart,
        DATE_FORMAT(dateEnd,'%d/%m/%Y') AS dateEnd,
        photo AS photoName,
        description ,price
    FROM vacation
    WHERE vacationId = ${id}
    `
    const vacations = await dal.execute(sql)


   const vacation = vacations[0]
   if (!vacation) throw new ResourceNotFoundErrorModel(id)
    return vacation
}

 async function addVacation(vacation: VacationsModel): Promise<VacationsModel> {
   const errors = vacation.validate()
    if (errors) throw new ValidationErrorModel(errors)
    

    const now = new Date()
    if (new Date(vacation.dateStart) < now) throw new ValidationErrorModel("Only Future Date")
    if (vacation.dateStart > vacation.dateEnd) throw new ValidationErrorModel("Start date can't be bigger then end date")
    if (!vacation.photo) throw new ValidationErrorModel("Vacation Must A Photo")
   const extension = vacation.photo.name.substring(vacation.photo.name.lastIndexOf("."))
    vacation.photoName = v4() + extension
    await vacation.photo.mv("./src/1-assets/images/vaction Photos/" + vacation.photoName)
    delete vacation.photo

    const sql = `
    INSERT INTO vacation VALUES(
        DEFAULT,
        '${vacation.destination}',
        '${vacation.dateStart}',
        '${vacation.dateEnd}',
        '${vacation.description}',
        '${vacation.price}',
        '${vacation.photoName}')`
    const info: OkPacket = await dal.execute(sql)

    vacation.id = info.insertId

    return vacation
}

async function updateVacation(vacation: VacationsModel): Promise<VacationsModel> {
    const errors = vacation.validate()
    if (errors) throw new ValidationErrorModel(errors)


    if (vacation.dateStart > vacation.dateEnd) throw new ValidationErrorModel("Start date can't be bigger then end date")


    if (vacation.photo) {
        if (fs.existsSync("./src/1-assets/images/vaction Photos/" + vacation.photoName)) {
            fs.unlinkSync("./src/1-assets/images/vaction Photos/" + vacation.photoName)
        }
        const extension = vacation.photo.name.substring(vacation.photo.name.lastIndexOf("."))
        vacation.photoName = uuid() + extension
        await vacation.photo.mv("./src/1-Assets/images/vaction Photos/" + vacation.photoName)
        delete vacation.photo
    }

    const sql = `
    UPDATE vacation SET
        destination = ${vacation.destination},
        description = ${vacation.description},
        dateStart = ${vacation.dateStart},
        dateEnd = ${vacation.dateEnd},
        price = ${vacation.price},
        photo = ${vacation.photo}
    WHERE vacationId = ${vacation.id};
    `

    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.id)

    return vacation
}

async function deleteVacation(id: number): Promise<void> {

    const vacation = await getOneVacation(id)

    const sql = `
    DELETE FROM vacation 
    WHERE vacationId = ${id}
    `

    const info: OkPacket = await dal.execute(sql)

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(id)
    fs.unlinkSync("./src/1-assets/images/vaction Photos/" + vacation.photoName)
}

async function getVacationImage(id: number): Promise<string> {

   const sql = `
    SELECT photo AS photoName FROM vacation
    WHERE vacationId = ${id}
    `

    const info = await dal.execute(sql)

    if (info.length === 0) throw new ResourceNotFoundErrorModel(id)

    const imageName = info[0].vacationPhotoName

    return imageName
}

export default {
   getAllVacations,
    getOneVacation,
   addVacation,
    updateVacation,
    deleteVacation,
    getVacationImage
}