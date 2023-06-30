import Order from "../../../models/order";



const orderController =  { 
    async getAllOrders(req, res){ 
        let orders; 
        try{ 
            let allOrders = await Order.find({status: "COMPLETED"}); 

            return res.render('order/allOrders', {orders: allOrders});  
        }catch(e){
            return next(e); 
        }
    }, 

    // async changeDeliveryStatus(req, res){ 


       
    //     const {value, orderId} = req.body; 


    //     try{ 
    //         let  order = await Order.updateOne({_id: orderId}, {$set: {deliveryStatus: value}});
    //         return res.status(200).json({success: true, message: "status changed successfully"}); 
    //     }catch(e){ 
    //         return res.status(500).json({success: false, message: "Something went wrong"}); 
    //     }
    // }
}

export default orderController;