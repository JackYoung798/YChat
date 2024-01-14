const app = require('express')() //引入express框架
const server = require('http').Server(app) //引入http模块
const io = require('socket.io')(server) //引入socket.io模块
const bodyParser = require('body-parser'); // 引入body-parser模块
const cors = require('cors'); // 引入cors模块
const routes = require('./routes'); //导入自定义路由文件，创建模块化路由
const { userInfo } = require('os');

app.use(bodyParser.json({limit:'100mb'})); // 解析json数据格式
app.use(bodyParser.urlencoded({limit:'100mb', extended: true})); // 解析form表单提交的数据
app.use(cors()); // 注入cors模块解决跨域

app.use('/', routes);

//监听8000端口
server.listen(8000, () => {
  console.log("server start...");
});

var onlines = [

]

io.on('connection',socket => {

  socket.on('login', userData => {
    socket.name = userData.username
    const user = {
      username: userData.username,
      userid: userData.userid,
      avatar: userData.avatar,
      socketId: socket.id,
    }
    onlines.push(user)
    console.log(onlines.length);
    io.emit('online',onlines)
  })

  socket.on('sendMsg',(data) => {
    socket.to(data.socketId).emit('receiveMsg',data)
  })

  socket.on('disconnect', () => {
    onlines = onlines.filter(item => item.username != socket.name)
    socket.broadcast.emit('online', onlines);
    console.log("用户退出",onlines.length);
  })
})
