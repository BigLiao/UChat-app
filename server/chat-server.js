var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(8000);

var onlineUserSet = {};
var onlineUserList = [{ "id": "adming", "name": "我", "avatar": "" }];
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

  // socket.emit('userlist change', geneList());

  // 新用户加入
  socket.on('add user', function(user) {
    if (addedUser) {
      return;
    }
    var id = user.id;
    onlineUserSet[socketId] = new onlineUser(id, user, socket)
    // geneList()
    socket.emit('login', true)
    console.log('add user: ' + user)
    socket.emit('userlist change', encode(onlineUserList))
    console.log('userlist change: ' + encode(onlineUserList))
    addedUser = true;
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
    msg = decode(msg);
    console.log('msg');
    console.log(JSON.stringify(msg))
    socket.emit('msg', encode(msg))
  })
  socket.on('update user', function (user) {
    user = decode(user);
    this.onlineUserSet[socketId].user = user;
    // socket.emit('userlist change', geneList())
  })
  socket.on('disconnect', function () {
    if (onlineUserSet[socketId]) {
      delete onlineUserSet[socketId];
      console.log('user leave');
      // console.log(JSON.stringify(geneList()))
      socket.broadcast.emit('user leave', encode(onlineUserList))
    }
  })
  socket.on('error', function (e) {
    console.log(e)
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
  onlineUserList = list;
}

function encode(obj) {
  return escape(JSON.stringify(obj));
}

function decode(str) {
  return JSON.parse(unescape(str));
}

