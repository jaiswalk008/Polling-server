import jwt from 'jsonwebtoken';
import { Response,NextFunction } from "express";
import UserService from '../Services/UserService';

const authenticateMiddleware = async (req:any,res:Response,next:NextFunction) =>{
    try{
        const token = req.header('Authorization');
        
        const result:any = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        
        const existingUser = await UserService.getUser({id:result.userId});
        
        if(existingUser){
            req.user = existingUser;
            next();
        }
        else{
            return res.status(404).json({message:"User not found!"});
        }
        
    }
    catch(err){console.log(err)};
}
export default authenticateMiddleware;