import { Request, Response, NextFunction } from "express"
import secure from "../2-utils/secure"
import { UnauthorizedErrorModel } from "../4-models/error-model"

async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        const isAdmin = await secure.verifyAdmin(request)
        if (!isAdmin) throw new UnauthorizedErrorModel("You Are Not An Admin")
        next()
    } catch (err: any) {
        next(err)
    }

}

export default verifyAdmin