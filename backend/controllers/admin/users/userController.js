import User from "../../../models/user";
import CustomErrorHandler from "../../../services/customErrorHandler";


const userController = { 
   async allUsers(req, res) { 
        let perPage = 10; 
        let page = req.query.page || 1; 
        let users = [];     
        let count =0; 
        try {
            count = await User.countDocuments();
        }catch(e) {
            req.flash("error", "Something went wrong");
            return res.redirect('back');
        }

        let totalPages = Math.ceil(count/perPage);
        

        
        try {
            users = await User.find({isDeleted: false, isDisabled: false}).skip((perPage* page) - perPage).limit(perPage).sort({createdAt: -1}); 

        }catch(e) { 
            req.flash("error", "Something went wrong"); 
            return res.redirect('back'); 
        }
        return res.render('users/allUsers', {users, totalPages, page, perPage});     
    }, 


    async viewUser(req, res) { 
        const {id} = req.params; 
       
        let user; 
        try {
            user = await User.findOne({_id: id}); 
        }catch(e) { 
            user = {}; 
            req.flash('error', "Something went wrong"); 
        }

        return res.render('users/view-user', {user}); 
    },  


    async deleteUser(req, res, next){ 
        const {userId} = req.body; 

        console.log(userId); 
        
        if(!userId){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }


        try{    
            const user = await User.updateOne({_id: userId}, {$set: {isDeleted: true}});

            return res.status(200).json({success: true, message: "user deleted successfully"}); 
        }catch(e){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }
    }, 

    async disableUser(req, res) {
        const {userId} = req.body; 
       
        
        if(!userId){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }

        try{    
            const user = await User.updateOne({_id: userId}, {$set: {isDisabled: true}});

            return res.status(200).json({success: true, message: "user account disabled successfully"}); 
        }catch(e){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }
    }, 

    async allDeletedUsers(req, res){ 
        let perPage = 10; 
        let page = req.query.page || 1; 
        let users = [];     
        let count =0; 
        try {
            count = await User.countDocuments();
        }catch(e) {
            req.flash("error", "Something went wrong");
            return res.redirect('back');
        }

        let totalPages = Math.ceil(count/perPage);
        

        
        try {
            users = await User.find({isDeleted: true}).skip((perPage* page) - perPage).limit(perPage).sort({createdAt: -1}); 

        }catch(e) { 
            req.flash("error", "Something went wrong"); 
            return res.redirect('back'); 
        }
        return res.render('users/deletedUsers', {users, totalPages, page, perPage});   
    }, 

    async allDisabledUsers(req, res){ 
        let perPage = 10; 
        let page = req.query.page || 1; 
        let users = [];     
        let count =0; 
        try {
            count = await User.countDocuments();
        }catch(e) {
            req.flash("error", "Something went wrong");
            return res.redirect('back');
        }

        let totalPages = Math.ceil(count/perPage);
        

        
        try {
            users = await User.find({isDisabled: true}).skip((perPage* page) - perPage).limit(perPage).sort({createdAt: -1}); 

        }catch(e) { 
            req.flash("error", "Something went wrong"); 
            return res.redirect('back'); 
        }
        return res.render('users/disabledUsers', {users, totalPages, page, perPage});   
    }, 

    async restoreUser(req, res){ 
        const {userId} = req.body;        
        
        if(!userId){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }

        try{    
            const user = await User.updateOne({_id: userId}, {$set: {isDeleted: false}});

            return res.status(200).json({success: true, message: "User Restored successfully"}); 
        }catch(e){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }
    }, 

    async unblockUser(req, res){ 
        const {userId} = req.body;        
        
        if(!userId){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }

        try{    
            const user = await User.updateOne({_id: userId}, {$set: {isDisabled: false}});

            return res.status(200).json({success: true, message: "User Restored successfully"}); 
        }catch(e){ 
            return res.status(500).json({success: false, message: "Something went wrong"}); 
        }
    }   
}

export default userController;