const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact') 
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// // middleware 1
// app.use(function(req, res, next){
//     req.myName= "MJ";
//     //  console.log('middleware 1 is called');
//      next();
// });

// // middleware 2
// app.use(function(req, res, next){
//     // console.log('middleware 2 is called');
//     console.log('My Name form MV-2', req.myName)
//     next();
// });


var contactList = [
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name: "Mukul",
        phone: "9876543210"
    }
]

// app.get('/',function(req,res){
//     // res.send('<h1>Cool, It is running or is it?</h1>')

//     Contact.find({}, function(err, contacts){
//         if(err){
//             console.log("Error in fetching contacts from db");
//             return;
//         }
//         return res.render('home', {
//             title: "My Contacts List",
//             contact_list: contacts
//         });

//     })

   
// }); 

app.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        return res.render('home', {
            title: "My Contacts List",
            contact_list: contacts
        });
    } catch (err) {
        console.log("Error in fetching contacts from db:", err);
        return res.status(500).send("Internal Server Error");
    }
});
 

app.get('/practice',function(req,res){
    // res.send('<h1>This is profile Page, It shows User Profile</h1>')
    return res.render('practice', {
        title : "Let us play with ejs"
    })
})

// for deleting the contact
// app.get('/delete-contact', function(req,res){
//     //get the id from query in the url
//     let id= req.query.id;
//     // find the contact in the database using id and delete it
//     Contact.findByIdAndDelete(id ,function(err){
//         if(err){
//             console.log('Error in deleting an object from database');
//         }
//         return res.redirect('back');
//     });
   
// });

app.get('/delete-contact', async (req, res) => {
    // Get the id from query in the url
    let id = req.query.id;

    try {
        // Find the contact in the database using id and delete it
        await Contact.findByIdAndDelete(id);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting an object from database:', err);
        return res.status(500).send('Internal Server Error');
    }
});


// app.post('/create-contact', function(req,res){
//     // contactList.push({
//     //     name: req.body.name,
//     //     phone:req.body.phone
//     // });
//     // contactList.push(req.body);
//     Contact.create({
//         name : req.body.name,
//         phone: req.body.phone
//     });
//     return res.redirect('back');
//     // , function(err,newContact){
//     //     if(err){
//     //         console.log('Error in creating contact')
//     //         return;
//     //     }
//     //     console.log('*************', newContact);
//     //     return res.redirect('back');
//     // })
// })

app.post('/create-contact', async (req, res) => {
    try {
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone
        });
        console.log('*************', newContact);
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating contact:', err);
        return res.redirect('back');
    }
});



app.listen(port, function(err){
    if(err){
        console.log('Error in running the server ', err);
    }
    console.log('Yup! My Express Server is running on Port:',port);
})