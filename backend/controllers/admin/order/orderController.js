import Order from "../../../models/order";



const orderController =  { 
    async getAllOrders(req, res, next){ 
        let orders; 
        let perPage; 
        let page = req.query.page ||  1; 
        let count =0;


        try {
            count = await Order.countDocuments();
        }catch(e) {
            req.flash("error", "Something went wrong");
            return res.redirect('back');
        }

        console.log(count); 
        let totalPages = Math.ceil(count/perPage);


        try{ 
            perPage = 1;
            
            let allOrders = await Order.find().skip((page * perPage) - perPage).limit(perPage).sort({createdAt: -1}); 

            
            return res.render('order/allOrders', {orders: allOrders, totalPages, page});
        }catch(e){
            return next(e); 
        }
    }, 

    
}

export default orderController;