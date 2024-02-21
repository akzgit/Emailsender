const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//create the middleware for parsing the requested bodies
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//define to the server that the static files are stored inside the public folder
app.use(express.static('public'));

//routes definitions for the home page
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/send-email.html');

})

//configure nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'akashtyo@gmail.com',
        pass:'wyzo fjtd cvnf ivsx', //old pass:gign gdhx kopu mkxm
    }
});

//create the route for the form
app.post('/send-email',(req,res)=>{
    const {to,subject,text}=req.body;

    const mailOptions ={
       to,
       subject,
       text,   
    };
    transporter.sendMail(mailOptions,(error,infor)=>{
        if(error){
            console.error(error);
            res.status(500).send("error in sending mail");
        }
        else{
            console.log('email sent:'+ infor.response)
            res.send("email sent successfully");
        }
    });
});

//start the server 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});