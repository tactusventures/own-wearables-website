const fs = require('fs');
const PDFDocument = require('pdfkit');
import path from 'path';
import { loginController } from '../../controllers';


function createInvoice(invoice, location) {
    let doc = new PDFDocument({ size: "A4", margin: 50 });
    let imgPath = path.join(__dirname ,  '../../public', 'own-black-logo.png'); 
    const imageBuffer = fs.readFileSync(imgPath);
    doc.opacity(0.1);
    doc.image(imageBuffer, 150, 200, { width: doc.page.width/2, height: doc.page.height/2 });
    doc.save();

    doc.opacity(1);

    generateHeader(doc);
    generateCustomerInformation(doc, invoice);
    generateInvoiceTable(doc, invoice);
    generateWarrantyPolicyPage(doc, invoice);
    generateFooter(doc);
    

    doc.end();  
    doc.pipe(fs.createWriteStream(location));

    let filePath = path.join(__dirname, '../../invoice.pdf');
    return filePath; 
  }
  
  function generateHeader(doc) {

    let imgPath = path.join(__dirname ,  '../../public', 'own-black-logo.png'); 
const imageBuffer = fs.readFileSync(imgPath);
    doc
      .image(imgPath, 50, 45, { width: 30 })
      .fillColor("#444444")
      .fontSize(20)
      .text("Own Wearables", 90, 57)
      .fontSize(10) 
      .text("Own Wearables", 200, 45, { align: "right" })
      .text("Compound No 6, Plot No 28,", 200, 65, { align: "right" })
      .text("Opp prodocs Solutions Pvt. Ltd,", 200, 80, { align: "right" })
      .text("Marol Co-operative, Industrial Estate,", 200, 95, { align: "right" })
      .text("Marol, Andheri E., Mumbai,", 200, 110, { align: "right" })
      .text("Maharashtra 400059, India", 200, 125, { align: "right" })
      .moveDown();
  }


  
  function generateCustomerInformation(doc, invoice) {
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("Invoice", 50, 160);
  
    generateHr(doc, 185);
  
    const customerInformationTop = 200;
  
    doc
      .fontSize(10)
      .text("Invoice Number:", 50, customerInformationTop)
      .font("Helvetica-Bold")
      .text(invoice.invoice_nr, 150, customerInformationTop)
      .font("Helvetica")
      .text("Invoice Date:", 50, customerInformationTop + 15)
      .text(formatDate(new Date()), 150, customerInformationTop + 15)
      .font("Helvetica")

      .text("Order Id:", 50, customerInformationTop + 30)
      .text(invoice.orderId , 150, customerInformationTop + 30)
        
  
      .font("Helvetica-Bold")
      .text(invoice.shipping.name, 300, customerInformationTop)
      .font("Helvetica")
      .text(invoice.shipping.address, 300, customerInformationTop + 15)
      .moveDown();
  
    generateHr(doc, 252);
  }
  
  function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;
  
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "Item",
      "Description",
      "Unit Cost",
      "Quantity",
      "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
  
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.item,
        "-",
        formatCurrency(item.amount / item.quantity),
        item.quantity,
        formatCurrency(item.amount)
      );
  
      generateHr(doc, position + 20);
    }
  
    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "Shipping Cost",
      "",
      formatCurrency(0)
    );
  
    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
      doc,
      paidToDatePosition,
      "",
      "",
      "Paid Amount",
      "",
      formatCurrency(invoice.items[0].amount)
    );
  
    const duePosition = paidToDatePosition + 25;  
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      duePosition,
      "",
      "", 
      "Total Amount",
      "",
      formatCurrency(invoice.items[0].amount)
    );
    doc.font("Helvetica");  
  }
  
  function generateFooter(doc) {
    doc
      .fontSize(10)
      .text(
        "Thank you ! Your trust means everything.",
        50,
        780,
        { align: "center", width: 500 }
      );
  }
  
  function generateTableRow(
    doc,
    y,
    item,
    description,
    unitCost,
    quantity,
    lineTotal
  ) {
    doc
      .fontSize(10)
      .text(item, 50, y)
      .text(description, 150, y)
      .text(unitCost, 280, y, { width: 90, align: "right" })
      .text(quantity, 370, y, { width: 90, align: "right" })
      .text(lineTotal, 0, y, { align: "right" });
  }
  
  function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }
  
  function formatCurrency(cents) {
    return "$" + (cents / 100).toFixed(2);
  }
  
  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    return year + "/" + month + "/" + day;
  }


 
  // function generateWarrantyPolicyPage(doc) {
  //   // doc.addPage();
  
  //   // Set font styles
  //   doc.font("Helvetica-Bold");
  //   doc.fontSize(24);
  
  //   // Add title
  //   doc.text("Warranty Policy", 50 , 520, { align: "center", marginTop: 50});
  
  //   // Set font styles for sections
  //   doc.font("Helvetica-Bold");
  //   doc.fontSize(16);
  //   doc.moveDown();
  
  //   // Add section 1
  //   doc.text("Section 1: Warranty Coverage", 50);
  //   doc.moveDown();
  
  //   // Add content to section 1
  //   doc.font("Helvetica");
  //   doc.fontSize(12);
  //   doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.", 50);
  //   doc.moveDown();
  
  //   // Add bullet points to section 1
  //   const bulletPoints1 = ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"];
  //   bulletPoints1.forEach((point) => {
  //     doc.text("\u2022 " + point, { indent: 20 });
  //     doc.moveDown();
  //   });

  //   doc.moveDown();
  
  //   // Add section 2
  //   doc.font("Helvetica-Bold");
  //   doc.fontSize(16);
  //   doc.text("Section 2: Warranty Claims");
  //   doc.moveDown();
  
  //   // Add content to section 2
  //   doc.font("Helvetica");
  //   doc.fontSize(12);
  //   doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  //   doc.moveDown();
  
  //   // Add bullet points to section 2
  //   const bulletPoints2 = ["Bullet Point 1", "Bullet Point 2", "Bullet Point 3"];
  //   bulletPoints2.forEach((point) => {
  //     doc.text("\u2022 " + point, { indent: 20 });
  //     doc.moveDown();
  //   });
  //   doc.moveDown();
  
  //   // Add section 3
  //   doc.font("Helvetica-Bold");
  //   doc.fontSize(16);
  //   doc.text("Section 3: Warranty Exclusions");
  //   doc.moveDown();
  
  //   // Add content to section 3
  //   doc.font("Helvetica");
  //   doc.fontSize(12);
  //   doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  //   doc.moveDown();
  
  //   // Add table
  //   const table = {
  //     headers: ["Product", "Warranty Period", "Coverage"],
  //     rows: [
  //       ["Product 1", "1 year", "Limited warranty"],
  //       ["Product 2", "2 years", "Full warranty"],
  //       ["Product 3", "3 years", "Limited warranty"],
  //     ],
  //   };

  //   generateTable(doc, table.headers, table.rows, 100, doc.y);
  // }

  


  // function generateTable(doc, headers, rows, x, y) {
  //   const columnWidth = 150;
  //   const tableWidth = columnWidth * headers.length;
  
  //   doc.font("Helvetica-Bold");
  //   doc.fontSize(12);
  
  //   // Generate table headers
  //   headers.forEach((header, index) => {
  //     doc.text(header, x + index * columnWidth, y);
  //   });
  
  //   doc.strokeColor("#000000").lineWidth(1);
  //   doc.moveTo(x, y + 15).lineTo(x + tableWidth, y + 15).stroke();
  
  //   doc.font("Helvetica");
  //   doc.fontSize(11);
  
  //   // Generate table rows
  //   rows.forEach((row, rowIndex) => {
  //     const rowY = y + 15 + (rowIndex + 1) * 20;
  
  //     row.forEach((cell, cellIndex) => {
  //       doc.text(cell, x + cellIndex * columnWidth, rowY);
  //     });
  
  //     doc.strokeColor("#000000").lineWidth(1);
  //     doc.moveTo(x, rowY + 5).lineTo(x + tableWidth, rowY + 5).stroke();
  //   });
  // }



  function generateWarrantyPolicyPage(doc) {

    // Set font styles for titles and subtitles
    doc.font("Helvetica-Bold");
    doc.fontSize(18);
  
    // Add User Guide section
    generateHr(doc,500); 
    doc.text("User Guide", 50, 508, { align: "left", marginTop: 50});
    generateHr(doc,530);
    doc.moveDown();


  
    // Set font styles for content and bullet points
    doc.font("Helvetica");
    doc.fontSize(10);
    

    doc.lineGap(8);
    // Add content to User Guide section
    doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", {align: "justify"});
    doc.moveDown();
  
    // Add bullet points to User Guide section
    const userGuideBulletPoints = [
      "Bullet Point 1",
      "Bullet Point 2",
      "Bullet Point 3",
    ];

    doc.moveDown(); 
    userGuideBulletPoints.forEach((point) => {  
      doc.text("\u2022 " + point, { indent: 10 });
    });

    doc.moveDown();

    doc.addPage(); 
    doc.font("Helvetica");
    doc.fillColor("#444444"); 

    let imgPath = path.join(__dirname ,  '../../public', 'own-black-logo.png'); 
    const imageBuffer = fs.readFileSync(imgPath);
    doc.opacity(0.1);
    doc.image(imageBuffer, 150, 200, { width: doc.page.width/2, height: doc.page.height/2 });
    doc.save();


    doc.opacity(1);
    // Add Warranty Policy section
    doc.font("Helvetica-Bold");
    doc.fontSize(17);
    generateHr(doc,30); 
    doc.text("Warranty Policy", 50, 35, { align: "left" });
    doc.moveDown();
    generateHr(doc,55);

    
    // Add content to Warranty Policy section
    doc.font("Helvetica");
    doc.fontSize(11);
    doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", {align: "justify"});
  
    // Add bullet points to Warranty Policy section
    const warrantyPolicyBulletPoints = [
      "Bullet Point 1",
      "Bullet Point 2",
      "Bullet Point 3",
    ];

    doc.moveDown();

    warrantyPolicyBulletPoints.forEach((point) => {
      doc.text("\u2022 " + point, { indent: 20 });
      // doc.moveDown();
    });
    doc.moveDown();

    doc.fontSize(11);
    doc.text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", {align: "justify"});
  
  
    // Add table
    // const warrantyTable = {
    //   headers: ["Product", "Warranty Period", "Coverage"],
    //   rows: [
    //     ["Product 1", "1 year", "Limited warranty"],
    //     ["Product 2", "2 years", "Full warranty"],
    //     ["Product 3", "3 years", "Limited warranty"],
    //   ],
    // };
  
    // generateTable(doc, warrantyTable.headers, warrantyTable.rows, 100, doc.y);
  }
  
  function generateTable(doc, headers, rows, x, y) {
    const columnWidth = 150;
    const tableWidth = columnWidth * headers.length;
  
    doc.font("Helvetica-Bold");
    doc.fontSize(12);
  
    // Generate table headers
    headers.forEach((header, index) => {
      doc.text(header, x + index * columnWidth, y);
    });
  
    doc.strokeColor("#000000").lineWidth(1);
    doc.moveTo(x, y + 15).lineTo(x + tableWidth, y + 15).stroke();
  
    doc.font("Helvetica");
    doc.fontSize(11);
  
    // Generate table rows
    rows.forEach((row, rowIndex) => {
      const rowY = y + 15 + (rowIndex + 1) * 20;
  
      row.forEach((cell, cellIndex) => {
        doc.text(cell, x + cellIndex * columnWidth, rowY);
      });
  
      doc.strokeColor("#000000").lineWidth(1);
      doc.moveTo(x, rowY + 5).lineTo(x + tableWidth, rowY + 5).stroke();
    });
  }
  

export default createInvoice; 