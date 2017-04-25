var config = require('config');

module.exports = {
    sendMail
}

function sendMail(req, res) {
    var email = require("emailjs/email");
    var server = email.server.connect({
        user: "a",
        password: "AmnKWYN1987",
        host: "email-smtp.us-east-1.amazonaws.com",
        port: 25,
        tls: true
    });
    
    var message = {
        from: "Manit <a@lagobe.com>",
        to: "amashinji@gmail.com",
        subject: "testing emailjs",
        text: "this work!",
        attachment: [
            {
                data: "<h1>this work!</h1>",
                alternative: true
            }
        ]
    };
    
    server.send(message, function (err, message) {
        console.log(err || message);
    
        res.status(200).send("sended");
    });

    //res.status(200).json(server);

    //res.status(200).send("server1 connected");
}