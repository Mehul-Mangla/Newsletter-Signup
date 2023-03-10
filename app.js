
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/cc3ee362ba";

    const options = {
        method: "POST",
        auth: "Mehul:e17ca7dccea858a8641b6894c7bba024-us21"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");;
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));

        })
    })

    // request.write(jsonData);
    request.end();

});


app.post("/failure", function (req, res) {
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
})

// API key : 7fcd591f56d7b3c8a7784fc1d5ccc8dc-us21
// List id : cc3ee362ba
