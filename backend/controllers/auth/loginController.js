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
                return next(CustomErrorHandler.wrongCredentials("Invalid Credentials")); 
            }


            // check weather user account is valid
            if(user.isDisabled){ 
                return next(CustomErrorHandler.invalidUser("Your Account has been Disabled")); 
            }

            // check weather user is deleted or not 
            if(user.isDeleted) { 
                return next(CustomErrorHandler.invalidUser('Your Account has been deleted')); 
            }
            
            // comparing the password with hash
            const match = await bcrypt.compare(password, user.password);   


            if(!match){
                return next(CustomErrorHandler.wrongCredentials("Invalid Credentials")); 
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
    }, 


    // logout   
    async logout(req, res) {
        // get token 
        const {refreshToken} = req.cookies; 
        try {
            await Refresh.deleteOne({token: refreshToken}); 

            res.cookie('refreshToken', '', {
                expires: new Date(0), 
                httpOnly: true, 
                secure: false,
            });

            res.cookie('accessToken', '', {
                expires: new Date(0), 
                httpOnly: true, 
                secure: false,
            });

            
            return res.status(200).json({success: true}); 
        }catch(e) { 
            return new next(new Error('something went wrong in database')); 
        }
 
         
    }
}

export default loginController; 