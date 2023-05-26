import loginSchema from "../../validation/loginValidation";
import User from '../../models/user'; 
import bcrypt from 'bcryptjs'; 
import CustomErrorHandler from "../../services/customErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";

const loginController  = {
    async login(req, res, next){
        const {email, password} = req.body;
        
        const {error} = loginSchema.validate(req.body); 

        if(error){
            return next(error); 
        }


        try{
            const user = await User.findOne({email: email}); 
            if(!user){
                return next(CustomErrorHandler.wrongCredentials()); 
            }
             
            const match = await bcrypt.compare(password, user.password);   
            if(!match){
                return next(CustomErrorHandler.wrongCredentials()); 
            }


            const access_token = JwtService.sign({_id: user._id}); 
            const refresh_token =  JwtService.sign({_id: user._id}, '1y', REFRESH_SECRET); 
            return res.status(200).json({access_token, refresh_token}); 
        }catch(e) {
            return next(e); 
        }
    }
}

export default loginController; 