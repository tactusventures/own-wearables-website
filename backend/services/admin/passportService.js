import passportLocal from 'passport-local'; 
import bcrypt from 'bcrypt'; 
import Admin from '../../models/admin'; 

const LocalStrategy = passportLocal.Strategy; 

function init(passport){  
    passport.use(new LocalStrategy({usernameField: "email"}, async (email, password, done) => { 
        const user =  await Admin.findOne({email: email}); 

        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }
        
        bcrypt.compare(password, user.password).then(match => {
    
            if(match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    })); 


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        Admin.findById(id, (err, user) => {
            done(err, user)
        })
    })
}

export default init; 