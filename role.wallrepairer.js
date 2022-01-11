//刷墙工

var roleWallrepairer = {
    get repaierHitsTo(){
        var levels = [3000, 300, 150, 60, 30, 15, 6, 3, 2, 1.5, 1.2, 1];
        if (Memory.wallLevel <= 11){
            var go_to_next_level = true;
            var walls = Game.rooms['E52N34'].find(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_WALL && structure.pos.y != 0)});
            for (let wallIndex in walls){
                let wall = walls[wallIndex];
                if (wall.hitsMax/wall.hits <= levels[Memory.wallLevel]){
                    go_to_next_level = (go_to_next_level && true);
                }
                else{
                    go_to_next_level = (go_to_next_level && false);
                }
            }
            if (go_to_next_level){
                Memory.wallLevel = Memory.wallLevel + 1;
                console.log('Walls level up');
            }
        }
        return levels[Memory.wallLevel]
    },
    
    run: function(creep){

	    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0){
	        creep.memory.repairing = true;
	        creep.say('🚧 repair walls');
	    }

	    if (creep.memory.repairing){
	        var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
	            return (structure.structureType == STRUCTURE_WALL && structure.hitsMax/structure.hits >= this.repaierHitsTo)
	        }});
            if (target) {
                if (creep.repair(target)==ERR_NOT_IN_RANGE){
                    creep.moveTo(target);
                }
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
}


module.exports = roleWallrepairer