//升级者

var roleUpgrader = {

    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 10)})
            
            if (containers.length > 0){
                var source = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 20)})
	            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
	                creep.moveTo(source);
                }
	        }
            else{
                var source = creep.pos.findClosestByRange(FIND_SOURCES);
                if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(source);
                }
            }
	    }
	}
};

module.exports = roleUpgrader;