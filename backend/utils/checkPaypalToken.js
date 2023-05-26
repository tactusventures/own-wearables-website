const checkPaypalToken = (req, res, next)  => {

    let authInfo  = req.session.access_info;     
    if(!authInfo || authInfo === undefined){
        return false; 
    }

    let expires_in = authInfo.expires_in; 

    const expiresAt = new Date().getTime() + (expires_in * 1000); 
    const isExpired = expiresAt < new Date().getTime(); 

    if(isExpired){
        return true; 
    }else{
        return false; 
    }

}

export default checkPaypalToken;