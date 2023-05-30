class CustomErrorHandler extends Error {
    constructor(status, msg){
        super(); 
        this.status = status; 
        this.message = msg; 
    }   

    static alreadyExists(message){
        return new CustomErrorHandler(409, message);    
    }

    static invalidUser(message){
        return new CustomErrorHandler(409, message);
    }

static wrongCredentials(message = "Invalid Credentials"){
        return new CustomErrorHandler(422, message); 
    }

    static serverError(message){
        return new CustomErrorHandler(500, message); 
    }

    static invalidId(message){
        return new CustomErrorHandler(422, message); 
    }   

    static colorAlreadyExists(message){
        return new CustomErrorHandler(409, message); 
    }

    static colorNotAvailable(message){
        return new CustomErrorHandler(409, message); 
    }

    static recordNotFound(message){
        return new CustomErrorHandler(400, message); 
    }
}

export default CustomErrorHandler; 