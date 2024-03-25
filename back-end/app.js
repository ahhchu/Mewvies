const express = require('express')
const app = express()
const port = 2999
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'editable',
  password : 'kinda password',
  database : 'mewmewmewvies'
});

const crypto = require("crypto");

const algo = 'aes-256-cbc';
const unicode = 'utf-8';

const iv = crypto.randomBytes(16);
const cipher = crypto.randomBytes(32);

app.get('/', (req, res) => {
    let sampleObj = {connection:"test ping successful", requestQuery:req.query};
    res.send(sampleObj);
})

// everything user-related
/* Fields:
 * user_id - int
 * email - String
 * passwd - String (encrypted)
 * fname - String
 * lname - String
 * admin - boolean (tinyint)
 * phone - String
 * address_line_one - String
 * address_line_two - String
 * address_city - String
 * address_state - String
 * address_zip - String
 * user_state - boolean (tinyint)
 */
app.get('/register/', (req, res) => {
	if (
		req.query.hasOwnProperty('fname') && req.query.fname != "" &&
		req.query.hasOwnProperty('lname') && req.query.lname != "" &&
		req.query.hasOwnProperty('email') && req.query.email.includes("@") && req.query.email.includes(".") &&
		req.query.hasOwnProperty('passwd') && req.query.passwd != "" &&
		req.query.hasOwnProperty('phone') && req.query.phone != ""
	) {
		connection.query("INSERT INTO user (fname, lname, email, passwd, phone) VALUES (?, ?, ?, ?, ?)", [req.query.fname, req.query.lname, req.query.email, req.query.passwd, req.query.phone], function (error, results, fields) {
			if (error) throw error;
			console.log('New user registered: ' + JSON.stringify(results));
			res.send(JSON.stringify(results));
		});
		//SELECT * from user where email = ?
		//connection.end();
	} else {
	    	res.send('ERROR: Make sure all queries are fulfilled: fname, lname, email, passwd, phone')
	    }
  })

app.get("/verifylogin/", (req, res) => {
        if (req.query.hasOwnProperty('email') && req.query.hasOwnProperty('passwd')) {
		connection.query('SELECT * FROM user WHERE email = ? AND passwd = ?', [req.query.email, req.query.passwd], function (error, results, fields) {
			if (error) throw error;
			console.log("User logged in: " + JSON.stringify(results));
			res.send(JSON.stringify(results));
		});		
	} else {
                res.send('ERROR: Make sure all queries are fulfilled: email, passwd')
        }
})

app.get("/updateprofile/", (req, res) => {
	if (req.query.test == 'success') {
        res.send('[{"user_id":1,"email":"test@test.com","passwd":"samplepassword","fname":"fname","lname":"lname","admin":0,"phone":"nophone","address_line_one":"","address_line_two":"","address_city":"","address_state":"","address_zip":"","user_state":0}]');
        } else if (req.query.test == 'failure') {
                res.send('1');
	} else if (req.query.hasOwnProperty('email') && req.query.hasOwnProperty('passwd')) {
		connection.query('SELECT * FROM user WHERE email = ? AND passwd = ?', [req.query.email, req.query.passwd], function (error, results, fields) {
                        if (error) throw error;
                        console.log("User logged in: " + JSON.stringify(results));
			//insert each modification
                        res.send(JSON.stringify(results));
                });
        } else {
                res.send("ERROR: Make sure all queries are fulfilled: email, passwd.\nOptional fields: newfname, newlname, newpasswd, newadmin, newphone, newaddressone, newaddresstwo, newcity, newstate, newzip, newuserstate");
        }

})

app.get('/getMewvies/', (req, res) => {
    res.send('list of movies')
  })

app.listen(port, () => {
  console.log(`MewMewBackend listening on port ${port}`)
  initSQL();
})

// External connections (MySQL, email server)

function initSQL() {
connection.connect();

connection.query('SELECT * FROM ??', ['user'], function (error, results, fields) {
  if (error) throw error;

  console.log('Here is a list of all current users: ' + JSON.stringify(results));
});

//connection.end();
} // initSQL

function sendEmail(address, title, message) {
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
  auth: {
    user: 'mewvies@zohomail.com',
    pass: 'GMaApls4050'
  }
});
var emailBody = {
  from: 'mewvies@zohomail.com',
  to: address, //change who the to address per the db
  subject: title,
  text: message
};
transporter.sendMail(emailBody, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
} // sendEmail

// encrypt/decrypt

function encrypt(encryptString) {
    //Encryption
    const encrypt = crypto.createCipheriv(algo, cipher, iv);
    let encrypted = encrypt.update(string, unicode, "hex");
    encrypted += encrypt.final("hex");
    console.log(encrypted);
    test = encrypted;
    console.log(test);
} // encrypt

function decrypt(decryptString){
//Decryption
const decryption = crypto.createDecipheriv(algo, cipher, iv);
let decrypted = decryption.update(decode_string, "hex", unicode);
decrypted += decryption.final(unicode);
console.log(decrypted); // Decrypted Final Product
} // decrypt
