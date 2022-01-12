//农民

var roleHarvester = {
    
    run: function(creep) {
        //先通过记忆定位资源点
        let target = creep.room.find(FIND_SOURCES, {filter: (structure) => structure.id == creep.memory.source.id})[0];

        //后期非carry爬的行为逻辑
        if (!creep.memory.carry){
            if (creep.harvest(target) == ERR_NOT_IN_RANGE){
                container = creep.room.find(FIND_STRUCTURES, {filter:
                    (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.id == creep.memory.containerId)
                })[0]
                creep.moveTo(container)
            }
        }


        //前期carry爬的行为逻辑
        else{
            //条件切换工作状态
            if(creep.memory.restoring && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.restoring = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.restoring && creep.store.getFreeCapacity() == 0) {
                creep.memory.restoring = true;
                creep.say('restore');
            }
            
            //储存状态
            if(creep.memory.restoring) {
                var to_fill_target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                })
                if (to_fill_target){
                    if (creep.transfer(to_fill_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(to_fill_target)
                    }
                }
            }
            //收集状态
            else {
                if (creep.harvest(target) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
            }
        }
    },
}

module.exports = roleHarvester;