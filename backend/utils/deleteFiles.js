import fs from 'fs'; 
import CustomErrorHandler from "../services/customErrorHandler";
import path from 'path'; 

// To delete the uploaded images, if some error occurs, as those images will be useless if no db record created
const deleteFiles = (files = [], next) => {

    let pathToDelete = path.join(__dirname,  '../public/uploads'); 

    for(let file of files){
        fs.unlink(`${pathToDelete}/${file}`, (err) => {
            if (err) {
                return next(
                    CustomErrorHandler.serverError(err.message)
                );
            }
        });
    }
}

export default deleteFiles; 