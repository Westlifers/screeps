//搬运工，填充spawn和extension

var roleCarrier = {
    run: function(creep){
        
        if (creep.memory.restoring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.restoring = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.restoring && creep.store.getFreeCapacity() == 0) {
            creep.memory.restoring = true;
            creep.say('🚧 restore');
        }
        
        
        if (creep.memory.restoring){
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                }
            })
            if (target){
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(target)
                }
            }
        }
        else {
            var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.structureType==STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 20)})
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                creep.moveTo(source);
            }
        }
    }
}

module.exports = roleCarrier;