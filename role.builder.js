//打工人

var roleBuilder = {

    run: function(creep) {

	    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if (creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            //若果没有工地，还要兼职修塔
            else{
                var towers = Game.rooms[Memory.roomName].find(FIND_STRUCTURES, 
                    {filter: (structure) => 
                        {return (structure.structureType==STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY)>0)}
                    });
                if (towers.length){
                    if (creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(towers[0]);
                    }
                }
            }
	    }
        //如果获取能量，查看有无容器，如果有则从容器取，否则自给自足
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
}

module.exports = roleBuilder