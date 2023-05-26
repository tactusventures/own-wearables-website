import multer from "multer";
import path from 'path'; 
import Product from "../../models/product";
import CustomErrorHandler from "../../services/customErrorHandler";
import productSchema from "../../validation/productValidation";
import colorSchema from "../../validation/colorSchema";
import deleteFiles from "../../utils/deleteFiles";
import { DOMAIN_NAME } from "../../config";


const storage = multer.diskStorage({
    // settting up destination for the image upload
    destination: (req, file, cb) => {
        const type = req.body.type;
        
        const fieldname =   file.fieldname;     
        let uploadPath = ""; 

        switch(fieldname){
            case "red":     
                uploadPath = "public/uploads/red"; 
                break;  

            case "green": 
                uploadPath = "public/uploads/green"
                break; 

            default: 
                uploadPath = "public/uploads/"
                break; 
        }

        cb(null, uploadPath); 
         
    }, 

    // generating unique file name for the uploaded image, as same images can cause conflicts
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    }
}); 

// multer config
const handleMultiPartData =  multer({storage,   limits: {fileSize: 1000000 * 5}}).array('images');  


const productController   = {
    async storeProduct(req, res, next){
       
        handleMultiPartData(req, res, async function(err) {
           
            // check if any error while uploading files
            if(err){
                deleteFiles(filePaths, next); 
                return next(CustomErrorHandler.serverError(err.message));
            }

            req.body["images"] = req.files; 
            let {error}  = productSchema.validate(req.body); 
            const filePaths =  req.files.map(file =>   "uploads/" + file.filename); 
        
            // validating the request 

            if(error){
                deleteFiles(filePaths,next); 
                return next(error); 
            }
             
            let {productName, price, color, sizes, quantity, description} = req.body; 
            color = color.toLowerCase(); 

            const colorImages = {
                [color]: filePaths
            };

            let quantityObj = {
                colorQty: {
                    [color]: quantity, 
                }, 
                totalQty: quantity
            }


            const products = new Product({
                productName, 
                price, 
                colors: [color.toLowerCase()], 
                sizes, 
                quantity: quantityObj, 
                description, 
                images: colorImages
            }); 

            try{
                // saving product to db
                let result = await products.save();                 
                return res.status(200).json(result); 
            }catch(e){
                deleteFiles(filePaths, next);  
                return next(e); 
            }        
        });
    },

    // Function to add the more colors with quantity and images
   async addColor(req, res, next){

        handleMultiPartData(req, res, async function(err) {
        
            let {color, qty, id} = req.body;
            color = color.toLowerCase(); 
            req.body["images"] = req.files;
            let {error}  = colorSchema.validate(req.body); 
            
            const filePaths =  req.files.map(file =>    file.filename); 

            if(error){
                deleteFiles(filePaths, next); 
                return next(error); 
            }


             
            try{
                let exists = await Product.exists({_id: id});

                if(!exists){
                    deleteFiles(filePaths, next);  
                    return next(CustomErrorHandler.invalidId("Invalid Product")); 
                }
                
            }catch(e){
                deleteFiles(filePaths, next);  
                return next(e); 
            }


            try{

                const product  = await Product.findById({_id: id}); 

                let colors = product.colors; 
                // check weather color already exists
                if(colors.includes(color)){
                    // deleteFiles(filePaths, next);  
                    return next(CustomErrorHandler.colorAlreadyExists("Color you adding is already exist")); 
                }

                let previousImages = product.images;
                previousImages[color] = filePaths;

                let totalQty = product.quantity; 
                totalQty.colorQty[color] =  parseInt(qty); 
                totalQty.totalQty = parseInt(totalQty.totalQty) + parseInt(qty); 
            
                // Saving the extra added colors, color's images and quantity in to the database
                let result = await Product.findOneAndUpdate({_id: id}, {colors: [...product.colors, color.toLowerCase()], images : previousImages, quantity: totalQty});
                return res.status(200).json(result);
            }catch(e){
                deleteFiles(filePaths, next);  
                return next(e); 
            }
                
        });
    },

    async allProducts(req, res, next){
        try{
            let products = await Product.find(); 
            
            return res.status(200).json(products); 

        }catch(e){
            return next(e); 
        }
    }, 

    async getSingleProduct(req, res, next) {
        try {
            const {id} = req.params; 
            const product = await Product.findOne({_id: id});



            for (let color in product.images) {
                let images = product.images[color];
                for (let i = 0; i < images.length; i++) {
                    images[i] = DOMAIN_NAME + "/" + images[i];
                }
            }

            return res.status(200).json(product);  
        }catch(e) { 
            return next(e); 
        }
    }
   
}


export default productController; 