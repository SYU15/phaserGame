var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(__dirname + '/client'));

var PORT = 8000;
var server = app.listen(PORT);

console.log("Server listening on port ", PORT);
