//刷墙工

var roleWallrepairer = {
    
    run: function(creep){

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repairing = false
            creep.say('🔄 harvest')
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0){
            creep.memory.repairing = true
            creep.say('🚧 repair walls')
        }

        //刷墙逻辑
        if (creep.memory.repairing){
            //获取爬所在房间的墙应该修到多少hits
            for (room of Memory.rooms){
                if (room.roomName == creep.room.name){
                    var repaierHitsTo = room.wallsHitsTo
                }
            }
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
                return (structure.structureType == STRUCTURE_WALL && structure.hitsMax/structure.hits >= repaierHitsTo)
            }})
            if (target) {
                if (creep.repair(target)==ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
            }
        }

        //获取能量逻辑
        else {
            let container = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 20)})
            let storage = creep.room.storage
            
            //优先查找storage，如果存在且有50以上的能量，就在storage里面拿
            if (storage && storage.store[RESOURCE_ENERGY] >= 50){
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage)
                }
            }
            //若无storage，检查有无最近container且能量多于20，如果有，就在这个container里面拿
            else if (container){
                var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 20)})
                if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(source)
                }
            }
            //如果全无，考虑自挖矿，这主要是为挖运分离系统建立之前考虑
            else{
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(source)
                }
            }
        }
    }
}


module.exports = roleWallrepairer