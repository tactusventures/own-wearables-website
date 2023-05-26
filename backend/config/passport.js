import {Strategy} from 'passport-google-oauth2'; 
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '.';


function initPassport (passport){
    passport.use(new Strategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET, 
            callbackURL: "http://localhost:3000/api/redirect/google",
            passReqToCallback   : true
        },
        
       function(req, access_token, refreshToken, profile, done){
            console.log(access_token, refreshToken, profile)
            console.log(profile); 
        }
    ));
}   


export default initPassport;