const express = require('express');
const path = require('path');
const port = 8000;

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

app.get('/',function(req,res){
    // res.send('<h1>Cool, It is running or is it?</h1>')
    return res.render('home', {
        title: "My Contacts List",
        contact_list: contactList
    });
}); 

app.get('/practice',function(req,res){
    // res.send('<h1>This is profile Page, It shows User Profile</h1>')
    return res.render('practice', {
        title : "Let us play with ejs"
    })
})

// for deleting the contact
app.get('/delete-contact', function(req,res){
    let phone= req.query.phone;
    let contactIndex= contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // });
    contactList.push(req.body);
    return res.redirect('back')
})


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server ', err);
    }
    console.log('Yup! My Express Server is running on Port:',port);
})