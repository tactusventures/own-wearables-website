import Joi, { object } from "joi";
import passport from "passport";

const adminAuthController   = { 
    login(req, res){ 
        return res.render('auth/login', {layout: false}); 
    },
    
    async postLogin(req, res, next){ 

        const schema = Joi.object({
            email: Joi.string().email().required(), 
            password: Joi.string().min(4).required()
        }); 

        const {error} = schema.validate(req.body, {abortEarly: false}); 

        if(error){ 
            
            // Flash all error messages by key (field name)
            error.details.forEach(({ path, message }) => {
                req.flash(path[0], message);
            });
           
            
            return res.redirect('back');
        }

        
        passport.authenticate('local', (err, user, info) => {
            if(err) {
                req.flash('error', info.message )
                return next(err)
            }
            if(!user) {
                req.flash('error', info.message )
                return res.redirect('/auth/login');
            }
            req.logIn(user, (err) => {
                if(err) {
                    req.flash('error', info.message ) 
                    return next(err)
                }

                console.log(req.user); 
                return res.redirect('/'); 
            })
        })(req, res, next)
    },

    logout(req, res){ 
       req.logout((err)  => { 
            console.log(err); 
        }); 
        
        res.setHeader('Cache-Control','private, no-cache, no-store, must-revalidate');
        res.setHeader('Expires', '0');
        res.setHeader('Pragma', 'no-cache');

        return res.redirect('/login');  
    }
}

export default adminAuthController;