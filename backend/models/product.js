import { number } from 'joi';
import mongoose from 'mongoose'; 

const productSchema = new mongoose.Schema({

    productName: {
        type: String, 
        required: true
    }, 

    price: {
        type: Number, 
        required: true
    },  

    colors: {
        type: [String], 
        required: true
    }, 

    sizes: {
        type: [String],
        required: true
    }, 
    images: {
        type: Object, 
        of: [String]
    },  
    quantity: {
        type: Object,
         required: true
    },
    description: { type: String, required: true},

    reviews: {
        type: [{
          name: { type: String, required: true },
          text: { type: String, required: true },
          rating: { type: Number, required: true }
        }],
      }, 

      isDeleted: { 
        type: Boolean, 
        default: false
      }
}, { timestamps: true });


export default mongoose.model('Product', productSchema); 