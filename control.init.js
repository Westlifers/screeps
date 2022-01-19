//初始化脚本
Room = require('rooms')

var initializer = {

    addARoom: function(roomName, sourceIds, spawnName){
        /* 
        增加一个初始化的房间
        创建一个房间对象
        在内存中的rooms列表中加入这个房间对象
        */
        room = new Room(roomName, sourceIds, spawnName)
        Memory.rooms.push(room)
    },
    
}

module.exports = initializer