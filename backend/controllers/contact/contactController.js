import { GMAIL_APP_PASSWORD, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config";
import Contact from "../../models/contact";
import nodemailer from 'nodemailer';
import Booking from "../../models/booking";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ipeuk12@gmail.com', 
        pass: "adtp jpjj qnyq fyvd"
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
    }, 


    preBookEntry (req, res, next) { 
        const {firstName, lastName, email, phoneNo, country} = req.body; 


        const booking = new Booking({
            firstName, lastName, email, phoneNo, country
        }); 


        // setup email data
        let mailOptions = {
            from: email, // sender address
            to: 'ipeuk12@gmail.com', // recipient email address
            subject: 'New Prebooking Entry For Own Shoe', // email subject
            text: `firstName: ${firstName}\nlastName: ${lastName}\nemail: ${email}` // email body
        };


        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return next(error);
            }else {
                try{
                    let result = await booking.save();      
                    return res.status(200).json(result); 
                }catch(e){
                    console.log(e);
                    return next(e);
                }
            }
        });

    }
}

export default contactController; 