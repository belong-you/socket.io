const koa = require('koa');
const http = require('http');
const path = require("path");
const socketIO = require('socket.io');
const koaStatic = require('./koaStatic.js');
const app = new koa();
const server = http.createServer(app.callback());

app.use(koaStatic(path.resolve(__dirname, 'public')));
const io = socketIO(server);
// scoketIO();

// 建立连接
io.on('connection', socket => {
    // console.log(socket.handshake)  // 客户端传递信息，参数
    // console.log(socket.connected)  // 是否连接
    // console.log(socket.disconnected);  // 是否断开
    console.log('client connected');

    socket.emit('test', 'hhhhhhhhh')

    // 向客户端发送消息
    socket.emit('client', 'messages sent by the server!');


    // 监听自定义事件
    socket.on('serve', chunk => {
        console.log(chunk);
    })

    socket.on('compress', data => {
        console.log(data)
    })

    // 客户端断开连接
    // socket.on('disconnect', () => {
    //     console.log('client disconnect')
    // })
})

server.listen(5008, () => {
    console.log('服务已启动...');
})