import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {RoleModel} from "../4-models/role-model";
import UserModel from "../4-models/user-model";


const secretKey = "Dorbar";

function getNewToken(user: UserModel): string {

  
    const container = { user };


    const options = { expiresIn: "3h" };

    
    const token = jwt.sign(container, secretKey, options);

    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => { 

        try {

            const header = request.header("authorization");

            if (!header) {
                resolve(false);
                return;
            }

            const token = header.substring(7);

            if (!token) {
                resolve(false);
                return;
            }
 
            jwt.verify(token, secretKey, err => {
               
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });

        }
        catch (err: any) {
            reject(err);
        }

    });
}

async function verifyAdmin(request: Request): Promise<boolean> {

  
    const isLoggedIn = await verifyToken(request);

   
    if(!isLoggedIn) return false;

    
    const header = request.header("authorization");
    const token = header.substring(7);

   
    const container: any = jwt.decode(token);
    
  
    const user: UserModel = container.user;

   
    return user.role === RoleModel.Admin;
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin
};
