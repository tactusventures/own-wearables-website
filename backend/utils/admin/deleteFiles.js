import fs from 'fs'; 


// To delete the uploaded images, if some error occurs, as those images will be useless if no db record created
const deleteFiles = (files = [], pathToDelete) => {

    // let pathToDelete = path.join(__dirname,  '../public/uploads'); 

    for(let file of files){
        fs.unlink(`${pathToDelete}/${file}`, (err) => {
            if (err) {
               req.flash('error', "Something went wrong"); 
               return res.redirect('back'); 
            }
        });
    }
}

export default deleteFiles; 