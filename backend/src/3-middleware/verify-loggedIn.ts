import { Request, Response, NextFunction } from "express"
import secure from "../2-utils/secure"
import { UnauthorizedErrorModel } from "../4-models/error-model"

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {
    try {
        const isValid = await secure.verifyToken(request)
        if (!isValid) throw new UnauthorizedErrorModel("Invalid Token")
        next()
    } catch (err: any) {
        next(err)
    }

}

export default verifyLoggedIn