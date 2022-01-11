//战士

var roleAttacker = {

    create: function(targetRoomName, targetStand, targetWallId, targetSpawnId) {
        let newName = 'Attacker' + Game.time
        let bodyPart = [WORK, WORK, WORK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        let the_memory = {
            role: 'attacker',
            targetRoomName: targetRoomName,
            targetStand: targetStand,
            targetWallId: targetWallId,
            targetSpawnId: targetSpawnId
        }
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:the_memory}) == 0){
            return true
        }
    },

    run: function(creep) {
        /* 
        memory主要属性：
        targetRoomName:攻击目标房间的名称
        targetStand:进入房间的点位坐标 Array[2]
        targetWallList:攻破墙壁点id的列表
        targetSpawnId:攻击重生点id 
        */
        //攻破墙壁位置
        let targetStand= new RoomPosition(creep.memory.targetStand[0], creep.memory.targetStand[1], 'E54N33')
        //如果不在目标房间，移动之
        if (creep.room.name != creep.memory.targetRoomName){
            creep.moveTo(targetStand)
        }
        //否则，说明已经进入房间，开始攻击逻辑
        else{
            //找目标墙点位
            let targetWall = creep.room.find(FIND_STRUCTURES, {filter: (structure) => creep.memory.targetWallList.indexOf(structure.id) != -1})[0]
            //找到就开始拆墙
            if (targetWall){
                if (creep.dismantle(targetWall) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targetWall)
                }
            }
            //否则说明墙已被拆除，进入房间攻击重生点
            else{
                let targetSpawn = creep.room.find(FIND_HOSTILE_SPAWNS, {filter: (spawn) => spawn.id == creep.memory.targetSpawnId})[0]
                if (targetSpawn){
                    if (creep.attack(targetSpawn) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targetSpawn)
                    }
                }
                //如果找不到重生点，说明任务完成
                else{
                    Memory.attackTarget.is_finished = true
                }
            }
        }
    }
}

module.exports = roleAttacker