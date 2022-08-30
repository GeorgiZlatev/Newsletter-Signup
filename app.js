//jshint esversion 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  // res.send("Server is now runnimg.");
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName,lastName,email);
  const data = {
    members:[
      {
      email_address: email,
      status: 'subscribed',
      marge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);

// const url = "https://us12.admin.mailchimp.com/lists";
const url = "https://us12.api.mailchimp.com/3.0/lists/7a829711e0";

const options = {
  method: "POST",
  auth: "goginero:9a1aff4cfa8417967d524e9097de044f-us12"
}

const request = https.request(url, options, function(response) {
  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
  request.write(jsonData);
  request.end();
});

// API key
// 9a1aff4cfa8417967d524e9097de044f-us12

// List ID
// 7a829711e0

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
