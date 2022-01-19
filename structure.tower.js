//塔

var roleWallrepairer = require('role.wallrepairer')
var whitelist = require('whitelist')

var tower = {
    
    run: function(tower){

        /* 
        塔的工作逻辑
        包括寻找敌方玩家以及找寻缺损墙壁进行修复
        优先逻辑为找寻敌军
        */
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            var username = closestHostile.owner.username
            //查询白名单，如果该用户在其中，直接返回不作响应
            if (whitelist.includes(username)){return}
            //否则，发通知并自动攻击
            Game.notify(`发现非法闯入者：${username}`)
            tower.attack(closestHostile)
        }
        //刷墙逻辑，仅在剩余能量400以上才执行
        else{
            if (tower.store[RESOURCE_ENERGY] >= 400){
                var target = tower.pos.findClosestByRange(FIND_STRUCTURES, {filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL && structure.hitsMax/structure.hits >= roleWallrepairer.repaierHitsTo)
                }})
                if (target){
                    tower.repair(target)
                }
            }
        }
    }
}

module.exports = tower
