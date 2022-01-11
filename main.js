var funcs = require('funcs');
var autoSpawn = require('control.autospawn');
var structureTower = require('structure.tower');


module.exports.loop = function () {

    //清理死亡creep的内存
    funcs.clear_memory();

    //若发现爬不够，尝试创造creep
    var lacks = funcs.check_creeps();
    if (lacks.lackAny){
        autoSpawn.trySpawn(lacks);
    }

    //调用所有creep的运行逻辑
    funcs.run_creeps();
    
    //遍历塔并调用塔的工作程序
    var towers = Game.rooms['E52N34'].find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_TOWER}});
    for (var tower in towers){
        structureTower.run(towers[tower]);
    }
}