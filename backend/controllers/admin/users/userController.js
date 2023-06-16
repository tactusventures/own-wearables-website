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
            users = await User.find().skip((perPage* page) - perPage).limit(perPage).sort({createdAt: -1}); 

            
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

        return res.render('users/view-user', user); 
    }, 


    async getAllAddresses(req, res) { 
        const {_id} = req.user; 


        try{ 

            const user = await User.findOne({_id: _id}); 
            return res.status(200).json(user.addresses); 

        }catch(e){
            return next(CustomErrorHandler.invalidUser("Invalid User")); 
        }
        
    }
}

export default userController;