import Contact from "../../../models/contact";

const messageController =  { 
    async enquiries(req, res) {
       
        const perPage = 10; 
        const page = req.query.id || 1;
 
        let enqs = [];
        let totalPages = 0;
        try {
            let count = await Contact.countDocuments({isDeleted: false}); 
            totalPages = Math.ceil(count/perPage);
           
            enqs = await Contact.find({isDeleted: false}).skip((perPage * page) - perPage).limit(perPage).sort({createdAt: -1});
            return res.render('messages/enquiries', {enqs, totalPages, page, perPage}); 
        }catch(err) {
            return res.render('messages/enquiries', {enqs, totalPages, page, perPage});
        }
    }, 

    async deleteMessage(req, res) {
        try {
            let result =  await Contact.updateOne({_id: req.body.id}, {isDeleted: true});  
            return res.status(200).json({success: true, message: "Updated Succesfully"});
        } catch(e) {
            return res.status(500).json({success: false, message: "something went wrong"}); 
        }
    }
}

export default messageController;