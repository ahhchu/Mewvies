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

app.get('/', (req, res) => {
    let sampleObj = {connection:"test ping successful", requestQuery:req.query};
    res.send(sampleObj);
})

// everything user-related
app.get('/register/', (req, res) => {
    if (req.query.test == 'success') {
	    res.send('[{"user_id":1,"email":"test@test.com","passwd":"pw","fname":"fname","lname":"lname","admin":0,"phone":"nophone","address_line_one":"","address_line_two":"","address_city":"","address_state":"","address_zip":"","user_state":0}]');
	} else if (req.query.test == 'failure') {
		res.send('Registration failed, Username already exists.');
	} else {
	    	res.send('registration WIP')
	    }
  })

app.get("/verifylogin/", (req, res) => {
	if (req.query.test == 'success') {
        res.send('0');
	} else if (req.query.test == 'failure') {
                res.send('1');
        } else {
                res.send('verify login WIP')
            }
})

app.get("/updateprofile/", (req, res) => {
	if (req.query.test == 'success') {
        res.send('0');
        } else if (req.query.test == 'failure') {
                res.send('1');
        } else {
                res.send('update profile WIP')
        }

})

app.get('/getMewvies/', (req, res) => {
    res.send('list of movies')
  })

app.listen(port, () => {
  console.log(`MewMewBackend listening on port ${port}`)
  initSQL();
})


function initSQL() {
connection.connect();

connection.query('SELECT * FROM ??', ['user'], function (error, results, fields) {
  if (error) throw error;

  console.log('Here is a list of all current users: ' + JSON.stringify(results));
});

connection.end();
} // initSQL
