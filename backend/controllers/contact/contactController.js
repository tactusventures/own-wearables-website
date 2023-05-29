import { GMAIL_APP_PASSWORD, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config";
import Contact from "../../models/contact";
import nodemailer from 'nodemailer'; 


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tactusventures@gmail.com', 
        pass: GMAIL_APP_PASSWORD
    }
});


const contactController = { 
    async sendMessage(req, res) { 
        const {name, email, message} =  req.body; 


        const contact = new Contact({
            name, email, message
        })

        // setup email data
        let mailOptions = {
            from: email, // sender address
            to: 'ipeuk12@gmail.com', // recipient email address
            subject: 'New Enquiry For Own Shoe', // email subject
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // email body
        };


        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return next(error); 
            }else {
                try{
                    let result = await contact.save(); 
                    return res.status(200).json(result); 
                }catch(e){
                    return next(e); 
                }
            }
        });


       
    }   
}

export default contactController; 