//填充者，转运能量到storage

var roleFiller = {

    run: function(creep){

        //状态切换
        if (creep.memory.restoring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.restoring = false;
            creep.say('🔄 harvest')
        }
        if (!creep.memory.restoring && creep.store.getFreeCapacity() == 0) {
            creep.memory.restoring = true;
            creep.say('🚧 restore')
        }

        //储存能量逻辑，到storage
        if (creep.memory.restoring){
            let storage = creep.room.storage
            if (storage){
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(storage)
                }
            }
        }
        //收集能量逻辑
        else{
            var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.structureType==STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 20)})
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(source)
            }
        }

    }
}

module.exports = roleFiller
