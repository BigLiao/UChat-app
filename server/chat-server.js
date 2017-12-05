var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(8000);

var onlineUserSet = {};
onlineUserSet['admin'] = {
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

  socket.emit('userlist change', encode(geneList()));

  // 新用户加入
  socket.on('add user', function(user) {
    var userObj = decode(user);
    if (addedUser) {
      return;
    }
    var id = userObj.id;
    onlineUserSet[socketId] = new onlineUser(id, userObj, socket)
    socket.emit('login', true)
    console.log('add user: ' + userObj.name)
    socket.broadcast.emit('userlist change', encode(geneList()))
    console.log('userlist change: ' + encode(geneList()))
    addedUser = true;
  })
  socket.on('msg', function (msg) {
    var msgObj = decode(msg);
    var toId = msgObj.toUser.id;
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
    socket.emit('msg', msg)
    // if no user
    socket.emit('not fount', msg)
  });
  // socket.on('msg', function (msg) {
  //   msg = decode(msg);
  //   console.log('msg');
  //   socket.emit('msg', encode(msg))
  // })
  socket.on('update user', function (user) {
    var userObj = decode(user);
    console.log(user);
    this.onlineUserSet[socketId].user = userObj;
    // socket.emit('userlist change', geneList())
  })
  socket.on('disconnect', function () {
    if (onlineUserSet[socketId]) {
      delete onlineUserSet[socketId];
      console.log('user leave');
      // console.log(JSON.stringify(geneList()))
      socket.broadcast.emit('user leave', encode(geneList()));
    }
  })
  socket.on('error', function (e) {
    console.log(e)
  })
});

function adminReturn(msgObj, socket) {
  var returnMsg = {
    from: 'admin',
    to: msgObj.from,
    msg: 'You send: ' + msgObj.msg,
    time: (new Date()).getTime()
  }
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
