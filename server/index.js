var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db/mongo.js');
var path = require('path');
var app = express();
var React = require('react');
// var Application = require('../client/src/components/App.jsx');
var reactServer = require('react-dom/server');

// var HTMLtemplate = require(path.join(__dirname, '../client/src/template.js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/dist'))); // this line becomes useless as we serve the template 

app.get('/map/:name', function(req, res) {
    res.header("X-Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, '/../client/dist/index.html'))
});


app.get('/API/map/:n', function(req, res) {
    var n = req.params.n
    db.allres(n, (err, data) => {
        console.log(err,data)
        res.header("Access-Control-Allow-Origin", "*");
        if (err) {
            res.sendStatus(505);
        } else {
            res.send(JSON.stringify(data));
        }
    })
})

// });


app.listen(3005, function() {
    console.log('listening on port 3005!');
});

