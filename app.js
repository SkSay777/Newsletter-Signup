const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const https = require('https');
const { response } = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/',function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post('/',function(req,res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var Email = req.body.Email;

    var data={
        members:[
           {
            email_address: Email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
           } 
        ]
    };
    var jsonData = JSON.stringify(data)

    const url='https://us13.api.mailchimp.com/3.0/lists/ba092fba8b'

    const options ={
        method: "POST",
        auth:"SK:2f4b1da3a944826f0ff61b63c03499aa-us13"
    }

    const request= https.request(url, options, function(response){

        if(response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html"); 
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server 3000 running");
})

// API Key
// c195fdf82001dad36989f4e13b6acf07-us13
// 403b2c40d1a122a2678de8f957dacb1c-us13
//2f4b1da3a944826f0ff61b63c03499aa-us13

//Audience ID
// ba092fba8b