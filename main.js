var funcs = require('funcs')
var structureTower = require('structure.tower')

module.exports.loop = function () {

    //清理死亡creep的内存
    funcs.clear_memory()

    //防止开局报错锁死
    if (!Memory.rooms){return}
    //逐房间执行逻辑
    for (let room of Memory.rooms){
        //检查此房间是否需要繁殖
        var lacks = funcs.check_creeps(room)
        if (lacks.lackAny){
            autoSpawn.trySpawn(lacks)
        }
        
        //遍历此房间的塔并调用塔的工作程序
        var towers = Game.rooms[room.roomName].find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_TOWER}});
        for (var tower of towers){
            structureTower.run(tower)
        }
    }

    //调用所有creep的运行逻辑
    funcs.run_creeps()

    //检查是否有攻击任务（旗帜）
    /* for (flag in Game.flags){
        if (flag == 'attackhere'){
            funcs.attack()
        }
    } *///攻击模块需要修改，决定是哪个房间发起进攻

}