//初始化脚本

var initializer = {

    initGame: function(roomName, sourceIds){
        /* 
        初始化整个房间，暂时不支持多房间
        在内存中加入sources储存本房间所有的资源点，并且可以绑定农民与容器
        */
        Memory.roomName = roomName
        let sources = []
        for (let sourceId of sourceIds){
            let obj = {
                id: sourceId,
                bindHarvester: null,
                bindContainer: null
            }
            sources.push(obj)
        }
        Memory.sources = sources
    },
    
}

module.exports = initializer