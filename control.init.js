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
        //最初开局，将rooms初始化为[]
        if (!Memory.rooms){Memory.rooms = []}
        Memory.rooms.push(room)
    },
    
    deleteARoom: function(roomName){
        //删除一个房间
        for (room of Memory.rooms){
            if (room.roomName == roomName){
                Memory.rooms.remove(room)
            }
        }
    },

}

module.exports = initializer