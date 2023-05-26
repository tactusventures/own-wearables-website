import Joi from 'joi'; 
import CustomErrorHandler from '../../services/customErrorHandler';
import { registerSchema } from '../../validation/registerValidation';
import bcrypt from 'bcryptjs'; 
import User from '../../models/user';
import JwtService from '../../services/JwtService';
import { REFRESH_SECRET } from '../../config';
import Refresh from '../../models/refresh';


const registerController = {
    async register(req, res, next){
        const {firstName, lastName, email, phoneNo, gender, password, confirmPassword, houseNoOrRoomNo, buildingNoOrArea, landmark, cityOrVillage, state, pincode, country} = req.body; 

        const {error} = registerSchema.validate(req.body, {abortEarly: false}); 
            
        if(error){

            const validationErrors = {};
            error.details.forEach((err) => {
              validationErrors[err.context.key] = err.message;
            });
          return res.status(422).json(validationErrors);
        }

        try{
            const exists =await User.exists({email: email}); 
            
            if(exists){
                return res.status(422).json({email: "This Email has already Taken"});
                // return next(CustomErrorHandler.alreadyExists("This email is already registered")); 
            }
        }catch(e){
            return next(e); 
        }


        const hashedPassword = await bcrypt.hash(password, 10); 

        let addressObj = { 
            firstName, lastName, phoneNo, 
            houseNoOrRoomNo, buildingNoOrArea, landmark, cityOrVillage, state, pincode, country
        }; 

        const user = new User({
            firstName, 
            lastName, 
            email, 
            phoneNo,
            gender, 
            password: hashedPassword,
            addresses: addressObj
        }); 

        let access_token; 
        let refresh_token; 

        try{
            const result = await user.save(); 
            
            access_token = JwtService.sign({_id: result._id});
            refresh_token = JwtService.sign({_id: result._id}, '1y', REFRESH_SECRET); 

            
            
            await Refresh.create({
                userId: user._id, 
                token: refresh_token
            });

            res.cookie("refreshToken", refresh_token, {
                maxAge: 60*60*24*30,
                httpOnly: true, 
            }); 

            res.cookie("accessToken", access_token, { 
                maxAge: 60*60*24*30,
                httpOnly: true, 
            }); 

            return res.status(200).json(result); 

        }catch(err){    
            return next(err);
        }
    },
    
    async getUser(req, res, next) {

        const {id} = req.params;    
        
        try {
            let user = await  User.findOne({_id: id}); 
            console.log(user); 
            if(!user) { 
                return next(CustomErrorHandler.invalidId("Invalid user"))
            }

            return res.status(200).json(user); 
        }catch(e) {
            return next(e); 
        }
    },


    async refresh(req, res, next){ 
        // get refresh token from cookie
        const {refreshToken} = req.cookies;

        if(!refreshToken){
            return res.status(401).json({message: "Token not Available"});
        }

        // check if token is valid or not 
        let data; 
        try { 
            data = await JwtService.verify(refreshToken, REFRESH_SECRET); 
            
        }catch(e){ 
            return res.status(401).json({message: "Invalid Token"}); 
        }
        
        // is the refresh token is present in db or not  
        try {
            let token = await Refresh.findOne({token: refreshToken, userId: data._id});

        }catch(e) {
            return next(e); 
        }
        // check weather the user is valid or not 
        let user; 
        try{ 
            user = await User.findOne({_id: data._id}); 

            if(!user){
                return res.status(404).json({message: "No user"}); 
            }

        }catch(e){
            return next(e); 
        }

        // generate new tokens
        let newAccessToken = JwtService.sign({_id: user._id});; 
        let newRefreshToken = JwtService.sign({_id: user._id}, '1y', REFRESH_SECRET);


        // update the refresh token  
        await Refresh.updateOne({_id: user._id}, {token:  newRefreshToken}); 

        // store the token in cookie
        res.cookie("refreshTtoken", newRefreshToken, {
            maxAge: 60*60*24*30,
            httpOnly: true, 
        }); 

        res.cookie("accessToken", newAccessToken, { 
            maxAge: 60*60*24*30,
            httpOnly: true, 
        });


        // response
        return res.status(200).json({user: user, auth: true}); 
    }
}

export default registerController;