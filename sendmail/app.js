const express = require('express');
const nodemailer = require('nodemailer')
const crd = require('./credn')
const app = express();
const port = 3001;

app.use(express.static('public'))
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/index.html');
});


app.get('/send', (req, res) => {
    // fetching data from form

    let email1 = req.query.email1;
    let email2 = req.query.email2;
    let subject = req.query.subject;
    let message = req.query.message;


    const mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: crd.user,
            pass: crd.pass
        }

    });

    mail.sendMail({
        from: 'feelcoderera@gmail.com',
        to: [email1, email2],
        subject: subject,
        html: '<h1 >' + message + '</h1>'

    }, (err) => {
        if (err) throw err;
        res.send('Mail has been sent')

    });
});
app.listen(port, (err) => {
    if (err)
        throw err;

    console.log('Server is running at port %d ', port);
});