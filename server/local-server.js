var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cors = require('cors')

var corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(cors(corsOptions));
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

app.listen(8081, () => {
  console.log('local list 8081')
})