import JwtService from "../services/JwtService";



const auth = async (req, res, next) => { 
    console.log("cookies", req.cookies);

    try {

        const {accessToken} = req.cookies; 
                 
        if(!accessToken){ 
            throw new Error(); 
        }

        const userData = await  JwtService.verify(accessToken);

        if (!userData) {
            throw new Error();
        }
        
        req.user = userData;
        next();

    }catch(err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}


export default auth;