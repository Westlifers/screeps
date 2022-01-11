/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('structure.tower');
 * mod.thing == 'a thing'; // true
 */

var roleWallrepairer = require('role.wallrepairer');

var tower = {
    
    run: function(tower){

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            var username = closestHostile.owner.username;
            Game.notify(`User ${username} spotted`);
            tower.attack(closestHostile);
        }
        else{
            if (tower.store[RESOURCE_ENERGY] >= 400){
                var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
    	            return (structure.structureType == STRUCTURE_WALL && structure.hitsMax/structure.hits >= roleWallrepairer.repaierHitsTo)
    	        }});
    	        if (target){
    	            tower.repair(target)
    	        }
            }
        }
    }
};

module.exports = tower