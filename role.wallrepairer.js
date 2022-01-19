//刷墙工

var roleWallrepairer = {

    get repaierHitsTo(){
        //优先查询内存中的painting变量是否允许刷墙，若否，返回levels[0]（这意味着认为墙等级为0，所有墙只刷到1/3000）
        var levels = [3000, 300, 150, 60, 30, 15, 6, 3, 2, 1.5, 1.2, 1]
        if (!Memory.painting){return levels[0]}
        if (Memory.wallLevel <= levels.length - 1){
            var go_to_next_level = true;
            var walls = creep.room.find(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_WALL && structure.pos.y != 0)});
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
                console.log('Walls level up in room ' + creep.room.name);
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

        //刷墙逻辑
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