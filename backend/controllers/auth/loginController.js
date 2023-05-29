import loginSchema from "../../validation/loginValidation";
import User from '../../models/user'; 
import bcrypt from 'bcryptjs'; 
import CustomErrorHandler from "../../services/customErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_SECRET } from "../../config";
import Refresh from "../../models/refresh";


const loginController  = {
    async login(req, res, next){
        const {email, password} = req.body;
        
        // validate the request
        const {error} = loginSchema.validate(req.body, {abortEarly: false}); 

        // if validationerror return the validation error
        if(error){
            const validationErrors = {};
            error.details.forEach((err) => {
              validationErrors[err.context.key] = err.message;
            });

            return res.status(422).json(validationErrors);
        }

       
        
        // lets check weather user exist there in database or not
        try{
            const user = await User.findOne({email: email}); 
            
            // return error if no user 
            if(!user){
                return next(CustomErrorHandler.wrongCredentials()); 
            }
            

            // comparing the password with hash
            const match = await bcrypt.compare(password, user.password);   


            if(!match){
                return next(CustomErrorHandler.wrongCredentials()); 
            }

            const access_token = JwtService.sign({_id: user._id}); 
            const refresh_token =  JwtService.sign({_id: user._id}, '1y', REFRESH_SECRET); 

               // store refresh token in db
              await Refresh.create({
                userId: user._id, 
                token: refresh_token
            });

            // set tokens in cookie 
            res.cookie("refreshToken", refresh_token, {
                maxAge: 1000 * 60*60*24*30,
                httpOnly: true, 
            }); 

            res.cookie("accessToken", access_token, { 
                maxAge: 1000 * 60 * 60 * 24 * 30,
                httpOnly: true,
            });

            return res.status(200).json(user);

        }catch(e) {
            console.log(e); 
        }
    }
}

export default loginController; 