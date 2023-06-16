import Joi from 'joi'; 
import CustomErrorHandler from '../../services/customErrorHandler';
import { registerSchema } from '../../validation/registerValidation';
import bcrypt from 'bcryptjs'; 
import User from '../../models/user';
import JwtService from '../../services/JwtService';
import { REFRESH_SECRET } from '../../config';
import Refresh from '../../models/refresh';
import addressSchema from '../../validation/addressValidation';


const registerController = {
    async register(req, res, next){
        
        const {firstName, lastName, email, phoneNo, gender, password, confirmPassword, houseNoOrRoomNo, buildingNoOrArea, landmark, cityOrVillage, state, pincode, country} = req.body; 


        // validate Request
        const {error} = registerSchema.validate(req.body, {abortEarly: false});
        
        // if error while validating, catche it and respond to it
        if(error){
            const validationErrors = {};
            error.details.forEach((err) => {
              validationErrors[err.context.key] = err.message;
            });

            return res.status(422).json(validationErrors);
        }


        // check weather user already exists or not
        try{

            const user = await User.findOne({$or: [{email}, {phoneNo}]}); 
            // return error if email already exists
            if(user && user.email === email) { 
                return res.status(422).json({email: "This Email has already Taken"}); 
            }
            // catch error if phone Number already exists
            if(user && user.phoneNo === phoneNo) { 
                return res.status(422).json({phoneNo: "Phone No has already been taken"}); 
            }
        }catch(e){
            return next(e); 
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        console.log(houseNoOrRoomNo, buildingNoOrArea, landmark, cityOrVillage); 

        // create address object
        let addressObj = { 
            firstName, lastName, phoneNo, 
            houseNoOrRoomNo, buildingNoOrArea, landmark, cityOrVillage, state, pincode, country
        }; 

        // create new user
        const user = new User({
            firstName, 
            lastName, 
            email, 
            phoneNo,
            gender, 
            password: hashedPassword,
            addresses: []
        });



        // store user in db and return auth tokens
        let access_token; 
        let refresh_token; 

        try{
            const result = await user.save(); 
            
            access_token = JwtService.sign({_id: result._id});
            refresh_token = JwtService.sign({_id: result._id}, '1y', REFRESH_SECRET); 


            // store refresh token in db
            await Refresh.create({
                userId: user._id, 
                token: refresh_token
            });


            // set tokens in cookie 
            res.cookie("refreshToken", refresh_token, {
                maxAge: 1000 * 60*60*24*30,
                httpOnly: true, 
                secure: false
            }); 

            res.cookie("accessToken", access_token, { 
                maxAge: 1000 * 60*60*24*30,
                httpOnly: true,
                secure: false
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
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        }); 

        res.cookie("accessToken", newAccessToken, { 
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true,
        });

        // response
        return res.status(200).json({user: user, auth: true}); 
    },

    async addAddress(req, res,next) { 
        
        const {error} = addressSchema.validate(req.body, {abortEarly: false}); 
        
        // validating the request
        if(error) { 
            const validationErrors = {};
            
            error.details.forEach((err) => {
              validationErrors[err.context.key] = err.message;
            }); 

            return res.status(422).json(validationErrors);
        }


        // check weather user exists or not first
        const {_id} = req.user;
        let user; 
        try {
            user = await User.findOne({_id: _id}); 
            
            if(!user){ 
                return next(CustomErrorHandler.userNotFound("Invaid User"))
            }

        }catch(e) {
            return next(e); 
        }

        /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  
        *  if user exists check is there any address already added
        *  if added add one more to it
        *  if not added store it as a first address in db's user collection
        *  
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  */
    
        let addresses = user.addresses; 

        addresses.push(req.body); 
        const {firstName, lastName, houseOrRoomNo, buildingOrArea, landMark, cityOrVillage, state, pincode, country, phoneNo, markAs} = req.body; 

        try{ 
           let result = await User.updateOne({_id: _id}, {addresses: addresses}); 
            
            return res.status(200).json({result}); 
        }catch(e) { 
            return next(e); 
        }
    }, 
    

    // get addresses 
    async getAddresses(req, res, next){ 
        const {_id} = req.user; 
       
        try{ 
            const user = await User.findOne({_id: _id}); 

            if(!user){ 
                return next(CustomErrorHandler.userNotFound("User doesn't exists")); 
            }



            let addresses = user.addresses; 
            

            return res.status(200).json({addresses: addresses}); 

        }catch(e){   
            return next(e); 
        }
    }
}

export default registerController;