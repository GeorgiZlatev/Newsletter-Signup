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


const url = "https://<usX>.api.mailchimp.com/3.0/lists/<listID>";

const options = {
  method: "POST",
  auth: "<username>:<APIkey>"
}

const request = https.request(url, options, function(response) {

  if(response.statusCode === 200){
    // res.send("Successfully subscribed!");
    res.sendFile(__dirname + "/success.html");
  }else{
    // res.send("There wes an error with signing up, please try again!");
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})
  request.write(jsonData);
  request.end();
});


//redirect on failure.html
app.post("/failure", function(req, res){
  res.redirect("/")
})


app.listen(process.env.PORT || 3000, function(){//hurokyPort or Localhost
  console.log("Server started on port 3000");
});
