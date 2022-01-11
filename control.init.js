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

    initContainer: function(containerIds){
        //初始化容器，将容器绑定到资源点上
        if (containerIds.length == Memory.sources.length){
            //如果传入长度确实与资源点对应，开始初始化
            for (let containerIdIndex in containerIds){
                let containerId = containerIds[containerIdIndex]
                let container = Game.rooms[Memory.roomName].find(FIND_STRUCTURES, {filter:
                    (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.id == containerId)
                })
                Memory.sources[containerIdIndex].bindContainer = container
                //打印初始化信息，让我再次确认一下没有对应错误
                console.log(`将id为${Memory.sources[containerIdIndex].id}的资源点与id为${containerId}的容器绑定`)
            }
            console.log("请仔细确认是否绑定是否错误，若错误，请再次初始化")
        }
    }
}

module.exports = initializer