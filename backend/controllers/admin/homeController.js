import createInvoice from '../../services/admin/pdfService';

const fs = require('fs');


const homeController  = { 
    home(req,res) { 
        return res.render('index'); 
    }, 
}

export default homeController;