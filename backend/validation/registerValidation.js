import Joi from "joi";

export const registerSchema = Joi.object({
    firstName: Joi
        .string()
        .trim()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'string.empty': 'First name cannot be empty',
            'string.min': 'First name must be at least {#limit} characters long',
            'string.max': 'First name cannot be longer than {#limit} characters',
            'string.pattern.base': 'First name must only contain letters',
            'any.required': 'First name is required',
        }), 

    lastName: Joi
        .string().trim()
        .min(2).max(70)
        .pattern(/^[a-zA-Z]+$/)
        .required()
        .messages({
            'string.base': 'Last name must be a string',
            'string.empty': 'Last name cannot be empty',
            'string.min': 'Last name must be at least {#limit} characters long',
            'string.max': 'Last name cannot be longer than {#limit} characters',
            'string.pattern.base': 'Last name must only contain letters',
            'any.required': 'Last name is required',
        }), 



    email: Joi.string()
        .email({ tlds: { allow: false } })
        .normalize()
        .required()
        .messages({
            'string.email': 'Please enter a valid email address',
            'string.empty': 'Email address is required',
            'any.required': 'Email address is required'
        }), 

    phoneNo: Joi.string()
        .regex(/^[1-9]\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'Please enter a valid phone number (use international format starting with "+")',
            'string.empty': 'Phone number is required',
            'any.required': 'Phone number is required'
        }), 

    gender: Joi.string()
        .valid('male', 'female', 'other')
        .messages({
            'any.only': 'Gender must be one of "male", "female", or "other"',
            'string.empty': 'Gender is required',
            'any.required': 'Gender is required'
        }), 
    
    password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one number, one special character, and one letter, and be at least 6 characters long',
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        }), 

    confirmPassword: Joi.ref('password'), 

    houseNoOrRoomNo: Joi.number().messages({
            'number.base': 'Room number must be a number',
            'number.empty': 'Room number is required',
            'any.required': 'Room number is required'
        }), 
    

    buildingNoOrArea:   
        Joi.string().trim().messages({
            'string.base': 'Area or building name must be a string',
            'string.empty': 'Area or building name is required',
            'any.required': 'Area or building name is required'
        }), 


    landmark:  Joi.string().trim().messages({
            'string.base': 'Landmark name must be a string',
            'string.empty': 'Landmark name is required',
            'any.required': 'Landmark name is required'
        }), 


    cityOrVillage: Joi.string().trim().messages({
            'string.base': 'City or village name must be a string',
            'string.empty': 'City or village name is required',
            'any.required': 'City or village name is required'
        }),  

    state: Joi.string().trim().messages({
            'string.base': 'State name must be a string',
            'string.empty': 'State name is required',
            'any.required': 'State name is required'
        }), 
        
    pincode: Joi.string().trim().length(6).pattern(/^[0-9]+$/).messages({
            'string.base': 'Pincode must be a string',
            'string.empty': 'Pincode is required',
            'string.length': 'Pincode must be exactly 6 digits',
            'string.pattern.base': 'Pincode must contain only numbers',
            'any.required': 'Pincode is required'
        }), 

    country: Joi.string().trim().messages({
            'string.base': 'Country name must be a string',
            'string.empty': 'Country name is required',
            'any.required': 'Country name is required'
        })   
}); 