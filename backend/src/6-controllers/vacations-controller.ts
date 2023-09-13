import express, { Request, Response, NextFunction } from "express";
import vacationsLogic from "../5-logic/vacations-logic";
import verifyAdmin from "../3-middleware/verify-admin";
import path from "path";
import VacationsModel from "../4-models/vacation-model";

const router = express.Router()
//http://localhost:3001/api/vacations
router.get("/vacations",  async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await vacationsLogic.getAllVacations()
        response.json(vacations)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/vacations/id
router.get("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        const vacation = await vacationsLogic.getOneVacation(id)
        response.json(vacation)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/vacations/imeges/:id
router.get("/vacations/images/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        const photoName = await vacationsLogic.getVacationImage(id)
        const Path = path.join(__dirname, "..", "1-assets", "images", "vacation-photos", photoName)//
        response.sendFile(Path)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/vacations
router.post("/vacations",verifyAdmin,  async (request: Request, response: Response, next: NextFunction) => {
    try {

        request.body.photo = request.files?.photo
        
        const vacation = await vacationsLogic.addVacation(new VacationsModel(request.body))
        response.status(201).json(vacation)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/vacations/:id
router.put("/vacations/:id([0-9]+)",  verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id
        request.body.photo = request.files?.photo
        const updatedVacation = await vacationsLogic.updateVacation(new VacationsModel(request.body))
        response.json(updatedVacation)
    }
    catch (err: any) {
        next(err)
    }
})
//http://localhost:3001/api/vacations/id
router.delete("/vacations/:id([0-9]+)",  verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id
        await vacationsLogic.deleteVacation(id)
        response.sendStatus(204)
    }
    catch (err: any) {
        next(err)
    }
})

 export default router