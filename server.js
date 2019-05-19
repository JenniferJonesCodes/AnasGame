/*This is for testing the Phaser game locally. This will be edited implemented with Kentico. 
 * Created by: Analilia Fierro
 * */

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var fs = require("fs");
var path = require("path");

app.get('/buttonclicker', (req, res) => {

    const queryString = req.query.userId;
    const gameTitle = 'buttonclicker';

    app.use(express.static(`${__dirname}/buttonclicker`))

    if (queryString) {
        MongoClient.connect("mongodb://admin:Password1@ds155516.mlab.com:55516/tigergames4kids", function(err, client) {
            if(err) {
                res.send('DB connection error');
            }
           
            const db = client.db('tigergames4kids');
            db.collection('Users').find({'Username': queryString}).toArray(function(err, user) {
                if (user.length > 0) {
                    fs.unlinkSync('./meta.txt');
                    fs.writeFile("meta.txt", `${queryString}, ${gameTitle}`, (err) => {
                        if (err) console.log(err);
                        res.sendFile(`${__dirname}/buttonclicker/index.html`);
                    });
                } else {
                    res.send("Invalid User");
                }
            });
        });
    } else {
        res.send("Invalid User");
    }
})

app.get('/spaceshootermonkey', (req, res) => {

    const queryString = req.query.userId;
    const gameTitle = 'spaceshootermonkey';

    app.use(express.static(`${__dirname}/spaceshootermonkey`))

    if (queryString) {
        MongoClient.connect("mongodb://admin:Password1@ds155516.mlab.com:55516/tigergames4kids", function(err, client) {
            if(err) {
                res.send('DB connection error');
            }
           
            const db = client.db('tigergames4kids');
            db.collection('Users').find({'Username': queryString}).toArray(function(err, user) {
                if (user.length > 0) {
                    fs.unlinkSync('./meta.txt');
                    fs.writeFile("meta.txt", `${queryString}, ${gameTitle}`, (err) => {
                        if (err) console.log(err);
                        res.sendFile(`${__dirname}/spaceshootermonkey/index.html`);
                    });
                } else {
                    res.send("Invalid User");
                }
            });
        });
    } else {
        res.send("Invalid User");
    }
})

app.get('/shootermonkey', (req, res) => {

    const queryString = req.query.userId;
    const gameTitle = 'shootermonkey';

    app.use(express.static(`${__dirname}/shootermonkey`))

    if (queryString) {
        MongoClient.connect("mongodb://admin:Password1@ds155516.mlab.com:55516/tigergames4kids", function(err, client) {
            if(err) {
                res.send('DB connection error');
            }
           
            const db = client.db('tigergames4kids');
            db.collection('Users').find({'Username': queryString}).toArray(function(err, user) {
                if (user.length > 0) {
                    fs.unlinkSync('./meta.txt');
                    fs.writeFile("meta.txt", `${queryString}, ${gameTitle}`, (err) => {
                        if (err) console.log(err);
                        res.sendFile(`${__dirname}/shootermonkey/index.html`);
                    });
                } else {
                    res.send("Invalid User");
                }
            });
        });
    } else {
        res.send("Invalid User");
    }
})

app.post('/score', (req, res) => {

    const score = req.query.score;

    fs.readFile('./meta.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        const username = data.toString().split(',')[0];
        const gameTitle = data.toString().split(',')[1];
        MongoClient.connect("mongodb://admin:Password1@ds155516.mlab.com:55516/tigergames4kids", function(err, client) {
            if(err) {
                res.send('DB connection error');
            }
            
            const db = client.db('tigergames4kids');
            db.collection('Scores').insertOne({'Username': username, "GameTitle": gameTitle, "Score": score}), function(err, user) {
                if (!err) {
                    console.log('Save successful');
                }
            };
        });
    });  
});

var port = process.env.PORT || 1337;

app.listen(port, function () {
    console.log('Listening on port '+ port);
})