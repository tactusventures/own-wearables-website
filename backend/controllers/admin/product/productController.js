import Product from "../../../models/product";
import getRandomNumber from "../../../utils/generateRandom";
import multer from "multer";
import path from 'path'; 
import fs from 'fs'; 
import deleteFiles from "../../../utils/admin/deleteFiles";
import { DOMAIN_NAME } from "../../../config";
import Joi from "joi"; 


const storage  = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, 'public/uploads') 

    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        // 3746674586-836534453.png
        cb(null, uniqueName);
    }
}); 

const handleMultiPartData =  multer({storage,   limits: {fileSize: 1000000 * 5}}).array('images');  



const productController = {

    async allProducts(req, res){ 
        let perPage =10; 
        let page = req.query.page || 1; 
        let count =0;
        try {
            count = await Product.countDocuments({isDeleted: false}); 
        }catch(e) { 
            req.falsh('error', "Something went wrong"); 
            return res.redirect('back');
        }

        let totalPages = Math.ceil(count/perPage);


        try {
            let products = await Product.find({isDeleted: false}).skip((perPage*page) - perPage).limit(perPage).sort({createdAt: -1});
             products.forEach((product) => {

                let addedOn  = product.createdAt; 
                let timeStamp = new Date(addedOn); 
                
                let date = `${timeStamp.getDate()}-${timeStamp.getMonth()}-${timeStamp.getFullYear()}`; 

                product.created_at = date; 
            });

            return res.render('product/all-products', {products, perPage, page, totalPages}); 
        }catch(e) { 
            return res.render('product/all-products', {products: [], perPage, totalPages, page}); 
        }
    }, 

    async viewProduct(req, res) { 
        const id = req.params.id; 
        let product = {}; 
        let colorArray= []; 
        let randomNum; 


        try { 
            colorArray = ["light", "primary", "info","success", "dark"]; 
            product = await Product.findOne({email: id}); 
            return res.render('product/view-product', {product, colorArray, getRandomNumber});   
        }catch(e){
            return res.render('product/view-product', {product, colorArray,getRandomNumber }); 
        }
    },

    async addProduct(req, res){ 
       return res.render('product/add-product');
    }, 

    // save new product --- post request for add Product
    async saveProduct(req,res, next) {    
 
        // validation   
        handleMultiPartData(req, res, async (err) => {
           const filePaths =  req.files.map(file =>   "uploads/" + file.filename); 
           let pathToDelete = path.join(__dirname,  '../../../public'); 

     

            let { productName, price, color, sizes, images, quantity,  description } = req.body; 

            if(err) { 
                req.flash('error', "something went wrong");     
                let pathToDelete = path.join(__dirname,  '../../../public'); 

                for(let file of filePaths){
                    fs.unlink(`${pathToDelete}/${file}`, (err) => {
                        if (err) {
                            req.flash('error', "something went Wrong");
                            return res.redirect('back'); 
                        }
                    });
                }
                return res.redirect('back'); 
            }

              
            // let {productName, price, color, sizes, quantity, description} = req.body; 
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


            
            const product = new Product({
                productName, 
                price, 
                colors: [color.toLowerCase()], 
                sizes, 
                quantity: quantityObj, 
                description, 
                images: colorImages
            }); 


            try { 
                let result =  await product.save(); 
                req.flash("success", "Product Added Successfully"); 
                console.log("comming here"); 
                return res.redirect('back'); 
            }catch(e) { 
                console.log(e); 
                req.flash('error', "Something went wrong"); 
                return res.redirect('back'); 
            }
       }); 
    }, 


    async deleteProduct(req, res) {

        const {id} = req.body; 

        try {
            await Product.updateOne({id: id}, {$set: {isDeleted: true}}); 
            return res.status(200).json({all: "ok"}); 
        }catch(e) {         
            return res.status(500).json({all: "ok"}); 
        }

    }, 

    async addColorToProduct(req, res) {
        handleMultiPartData(req, res, async (err) => {
            
            const {id, color} = req.body;
            console.log(id, color);  
            const filePaths =  req.files.map(file =>   "uploads/" + file.filename); 
            const pathToDelete = path.join(__dirname,  '../../../public'); 


            if(err) { 
                req.flash('error', "something went wrong");     
                deleteFiles(filePaths, pathToDelete); 
                console.log(err); 
                return res.redirect('back'); 
            }


            // find product in database to add color 
            try {   
                let product = await Product.findOne({id: id});  
                
                // checking weather color already exists or not
                if(product.colors.map(c => c.toLowerCase()).includes(color.toLowerCase()) ) { 
                    req.flash('error', "Color is already Present");     
                    deleteFiles(filePaths, pathToDelete); 
                    return res.redirect('back'); 
                }

                // if color is not already there, add this color to product
                let colorsArr = product.colors; 
                colorsArr.push(color); 

                let images = product.images; 
                images[color] = filePaths; 
            

                try { 
                    let result = await Product.updateOne({id: id}, {$set: {colors: colorsArr, images: images}}); 
                    req.flash('success', "Color Added SuccessFully"); 
                    return res.redirect('back'); 
                }catch(e) { 
                    deleteFiles(filePaths, pathToDelete); 
                    req.flash('error', "something went Wrong"); 
                    return res.redirect('back'); 
                }
            }catch(e) { 
                deleteFiles(filePaths, pathToDelete); 
                req.flash('error', "something weng wrong"); 
                return res.redirect('back'); 
            }
        }); 
    },

    async editProduct(req, res) { 
        const id = req.params.id; 
        console.log(id); 
        let product = {}; 
        try {
             product = await Product.findOne({id: id}); 
            return res.render('product/edit-product', {product})
        }catch(e) { 
            return res.render('product/edit-product', {product}); 
        }
    }, 

    async updateProduct(req, res) { 
        const {id, productName, price, colors, sizes, description}  = req.body; 
        
        let product ;
        try{  
          product = await Product.findOne({_id: id});  
        }catch(e){ 
            res.flash('error', 'something went worng');  
            return res.redirect('back'); 
        }

        let prevColors = product.colors;
        let prevImages = product.images; 
        let newImages = {}; 
        let cnt =0; 
        for(let imgClr of Object.keys(prevImages)) {
            newImages[colors[cnt]] = prevImages[imgClr]; 
            cnt++;
        }

        try { 
           await Product.updateOne({_id: id}, {$set: {productName, price, colors, sizes, description, images: newImages}});  
        }catch(e){
            res.flash('error', "Something went Wrong"); 
            return res.redirect('back'); 
        }

        req.flash('success', "Updated Successfully.."); 
        return res.redirect('/products/all-products'); 

    }, 

    async deleteProductImage(req, res) { 
        const {id, color, image} = req.body; 
        let images; 
        try { 
            let data = await Product.findOne({_id: id}); 
            console.log(data); 
             images = data.images;
        }catch(e) {
            return res.status(500).json({success: false, message: "something went wrong"}); 
        }

        let colorImages = images[color];
        
        if(colorImages.length == 1) {   
            req.flash("error", "You should atleast have one Image for Color"); 
            return res.status(500).json({success: false, message: "You should atleast have one Image for Color"});
        }

        colorImages = colorImages.filter((img) => ( img !== image)); 
        images[color] = colorImages; 


        try {
            await Product.updateOne({_id: id}, {$set: {images: images}}); 
                let pathToDelete = path.join(__dirname,  '../../../public'); 
                deleteFiles([image], pathToDelete); 
            return res.status(200).json({success: true});        
        }catch(e) { 
            return res.status(500).json({success: false}); 
        }
    },

    async addImageToProduct(req, res){ 
        handleMultiPartData(req, res, async (err) => {
            const filePaths =  req.files.map(file =>   "uploads/" + file.filename); 
            const pathToDelete = path.join(__dirname,  '../../../public');


            if(err) { 
                req.flash('error', "something went wrong");  
                deleteFiles(filePaths, pathToDelete); 
                return res.redirect('back'); 
            }

            let product; 
            let images; 
            try {
                product  = await Product.findOne({_id: req.body.id}); 
                images = product.images; 
                console.log(product); 
            }catch(e) {
                deleteFiles(filePaths, pathToDelete); 

                req.flash('error', "Something went wrong"); 
                return res.redirect('back'); 
            }

            let colorImages = images[req.body.color]; 

            for(let file of filePaths) { 
                colorImages = [...colorImages, file]; 
            }
            
            images[req.body.color] = colorImages; 
            try {
                await Product.updateOne({_id: req.body.id}, {$set: {images: images}}); 
            }catch(e){
                deleteFiles(filePaths, pathToDelete); 
                req.flash('error', "something went wrong"); 
                return res.redirect('back');
            }
            req.flash('success', "Images added Successfully"); 
            return res.redirect('back');
        });     
    }
}


export default productController;