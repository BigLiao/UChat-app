var http = require('http');
var app = require('http').createServer()
var io = require('socket.io')(app);
var robot = require('./robot')

app.listen(8081);

var onlineUserSet = {};
onlineUserSet['admin'] = {
  id: 'admin',
  user: {
    id: 'admin',
    name: '人工智能',
    avatar: '#121212'
  }
}

io.on('connection', function (socket) {
  var addedUser = false;
  var socketId = socket.id;

  socket.emit('init userList', encode(geneList()));

  // 新用户加入
  socket.on('login', function(user) {
    var userObj = decode(user);
    if (addedUser) {
      return;
    }
    var id = userObj.id;
    onlineUserSet[socketId] = new onlineUser(id, userObj, socket)
    socket.emit('login success', true)
    console.log('add user: ' + userObj.name)
    socket.broadcast.emit('add user', user)
    addedUser = true;
  })
  socket.on('msg', function (msg) {
    socket.emit('msg', msg)
    var msgObj = decode(msg);
    var toId = msgObj.to;
    if (toId === 'admin') {
      adminReturn(msgObj, socket);
      return;
    }
    for (var i in onlineUserSet) {
      if (onlineUserSet[i].id === toId) {
        onlineUserSet[i].receiveMsg(msg)
        return;
      }
    }
    // if no user
    socket.emit('not fount', msg)
  });

  socket.on('get userList', function () {
    socket.emit('init userList', encode(geneList()));
  })

  // socket.on('msg', function (msg) {
  //   msg = decode(msg);
  //   console.log('msg');
  //   socket.emit('msg', encode(msg))
  // })
  socket.on('update user', function (user) {
    var userObj = decode(user);
    this.onlineUserSet[socketId].user = userObj;
    // socket.emit('userlist change', geneList())
  })
  socket.on('disconnect', function () {
    if (onlineUserSet[socketId]) {
      var user = onlineUserSet[socketId].user;
      delete onlineUserSet[socketId];
      socket.broadcast.emit('user leave', encode(user));
    }
  })
  socket.on('error', function (e) {
    console.log(e)
  })
});

function adminReturn(msgObj, socket) {
  var msg = msgObj.msg;
  robot(msgObj.from, msg).then(data => {
    var returnText = data.text;
    var returnMsg = {
      from: 'admin',
      to: msgObj.from,
      msg: returnText,
      time: (new Date()).getTime()
    }
    socket.emit('msg', encode(returnMsg));
  })

}


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
  return list;
}

function encode (obj) {
  return encodeURI(JSON.stringify(obj));
}

function decode (str) {
  return JSON.parse(decodeURI(str));
}

