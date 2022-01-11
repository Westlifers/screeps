//维修工，修复常规设备，包括战墙

var roleFixer = {

    run: function(creep) {

	    if(creep.memory.fixing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.fixing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.fixing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.fixing = true;
	        creep.say('🚧 fix');
	    }

	    if(creep.memory.fixing) {
	        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure)=>{
	            return (((structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) && structure.hits<structure.hitsMax) || (structure.structureType == STRUCTURE_RAMPART && structure.hitsMax/structure.hits >= 10))
	        }});
            if (target) {
                if (creep.repair(target)==ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
            }
	    }
	    else {
            var containers = creep.room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER})
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

module.exports = roleFixer;