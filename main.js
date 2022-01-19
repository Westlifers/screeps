var funcs = require('funcs')
var autoSpawn = require('control.autospawn')
var structureTower = require('structure.tower')
var rooms = require('rooms')


module.exports.loop = function () {

    //清理死亡creep的内存
    funcs.clear_memory();

    //逐房间执行逻辑
    for (let room of rooms){
        //若发现爬不够，尝试创造creep
        var lacks = funcs.check_creeps(room)
        if (lacks.lackAny){
            autoSpawn.trySpawn(lacks, room)
        }

        //调用所有creep的运行逻辑
        funcs.run_creeps()
        
        //遍历塔并调用塔的工作程序
        var towers = Game.rooms[Memory.roomName].find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_TOWER}});
        for (var tower of towers){
            structureTower.run(tower)
        }

        //检查是否有攻击任务（旗帜）
        for (flag in Game.flags){
            if (flag == 'attackhere'){
                funcs.attack()
            }
        }
    }

}