

const socket = io("ws://localhost:5008/", {
  reconnectionDelayMax: 10000,  // 连接之间最大等待时间
  reconnectionAttempts: 10,  // 放弃连接次数
  auth: {
    token: "123"
  },
  query: {
    "my-key": "my-value"
  }
});

socket.onAny((event, ...args) => {
  console.log(event, args)  // 获取服务端发送的所有事件名，传递信息
})
// socket.offAny('test')


socket.on('client', data => {
  if (socket.connected) {  // 连接
    console.log(data)
  } else if (socket.disconnected) {  // 断开
    socket.open();  // 尝试重新连接
  }
})

const listeners = socket.listenersAny();
// console.log(listeners)  // 得到所有的 onAny 函数

socket.compress(false).emit("compress", { aaa: 123 });  // 不压缩发送


document.getElementById('close').onclick = () => {
  socket.close();  // 手动断开连接
}

socket.on("disconnect", reason => {
  if (reason === 'io client disconnect') {
    console.log('用户主动断开连接')
  } else if (reason === 'io server disconnect') {
    alert('服务器断开连接');
  } else if (reason === 'transport error') {
    console.log('连接错误');
  } else if (reason === 'transport close' || 'ping timeout') {  // 用户因切换网络导致断开 | 服务器没有在pingInterval + pingTimeout范围内发送PING信号
    socket.open();  // 尝试重新连接
  }
});