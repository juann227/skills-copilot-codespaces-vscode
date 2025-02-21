// Create web server
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);

// Create socket server
var io = require('socket.io').listen(server);

// Create comments array
var comments = [];

// Listen port 3000
server.listen(3000);

// Set public folder
app.use(express.static(__dirname + '/public'));

// Set view engine
app.set('view engine', 'jade');

// Set view folder
app.set('views', __dirname + '/views');

// Set route
app.get('/', function(req, res) {
  res.render('index', {comments: comments});
});

// Listen connection
io.sockets.on('connection', function(socket) {
  // Listen send comment event
  socket.on('send comment', function(data) {
    // Add comment
    comments.push(data.comment);
    // Emit update comments event
    io.sockets.emit('update comments', {comments: comments});
  });
});

console.log('Server running at http://localhost:3000/');