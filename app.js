const express = require("express");
const bodyParser= require("body-parser");
const request=require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
    var fname =req.body.firstname;
    var lname =req.body.lastname;
    var email =req.body.email;
    var data ={
        members: [
            {
                
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: fname,
                    LNAME: lname,


                            }
            }
                 ]
             };


        var jsonData =JSON.stringify(data);
    var options={
        url:"https://us4.api.mailchimp.com/3.0/lists/4a34909197",
        method : "POST",
        headers:{
            "Authorization":"anshumanchaurasia 9189b4b0277c06ffb05a465f72a7967d-us4"
        },
        body : jsonData
        
    };
    

    request(options, function(error,response,body){
      if(error){
          res.send("Go and try Again")
           console.log("request inside error "+error)
              }
         else{
            console.log("success "+response.statusCode);
             res.sendFile(__dirname + "/sucess.html");
              }
            });

        });

app.listen(process.env.PORT || 3000 ,function()
{
console.log("running successfully")
});





