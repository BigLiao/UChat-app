var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(8000);

var onlineUserSet = {};
onlineUserSet['adming123'] = {
  id: 'adming',
  user: {
    id: 'adming',
    name: '管理员',
    avatar: ''
  }
}

io.on('connection', function (socket) {
  var addedUser = false;
  var socketId = socket.id;
  socket.on('add user', function(user) {
    if (addedUser) {
      return;
    }
    var id = user.id;
    onlineUserSet[socketId] = new onlineUser(id, user, socket)
    socket.broadcast.emit('user join', geneList())
    socket.emit('user join', geneList())
    addedUser = true;
    console.log('add user')
    console.log(JSON.stringify(user))
  })
  // socket.on('msg', function (msg) {
  //   var toId = msg.toUser.id;
  //   for (var i in onlineUserSet) {
  //     if (onlineUserSet[i].id === toId) {
  //       onlineUserSet[i].socket.receiveMsg(msg)
  //       return;
  //     }
  //   }
  //   // if no user
  //   socket.emit('not fount', msg)
  // });
  socket.on('msg', function (msg) {
    console.log('msg')
    console.log(JSON.stringify(msg))
    socket.emit('msg', msg)
  })
  socket.on('disconnect', function () {
    if (onlineUserSet[socketId]) {
      delete onlineUserSet[socketId];
      socket.broadcast.emit('user leave', geneList())
    }
  })
});


function onlineUser (id, user, socket) {
  this.id = id;
  this.user = user;
  this.socket = socket;
}
onlineUser.prototype.receiveMsg = function (msg) {
  this.socket.emit('msg', msg)
}

function geneList () {
  var list = []
  for (var i in onlineUserSet) {
    list.push(onlineUserSet[i].user)
  }
  return list
}
