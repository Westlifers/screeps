//main使用到的函数

var autoSpawn = require('control.autospawn');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
var roleCarrier = require('role.carrier');
var roleWallrepairer = require('role.wallrepairer');
var roleAttacker = require('role.attacker');

var funcs = {
    clear_memory: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    
    check_creeps: function(){
        var lackHarvesters= (_.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester')).length < autoSpawn.harvesters_needed);
        var lackCarriers= (_.filter(Game.creeps, (creep) => creep.memory.role == 'carrier').length < autoSpawn.carriers_needed);
        var lackBuilders= (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length < autoSpawn.builders_needed);
        var lackUpgraders= (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length < autoSpawn.upgraders_needed);
        var lackFixers= (_.filter(Game.creeps, (creep) => creep.memory.role == 'fixer').length < autoSpawn.fixers_needed);
        var lackWallrepairers= (_.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer').length < autoSpawn.wallrepairers_needed);
        var lackAny= false;
        var obj = {
            lackHarvesters: lackHarvesters,
            lackCarriers: lackCarriers,
            lackUpgraders: lackUpgraders,
            lackBuilders: lackBuilders,
            lackFixers: lackFixers,
            lackWallrepairers: lackWallrepairers,
        }
        for (let item in obj){
            lackAny = (lackAny || obj[item])
        }
        obj.lackAny = lackAny;
        
        return obj
    },

    run_creeps: function(){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            else if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            else if(creep.memory.role == 'fixer') {
                roleFixer.run(creep);
            }
            else if(creep.memory.role == 'carrier'){
                roleCarrier.run(creep);
            }
            else if(creep.memory.role == 'wallrepairer'){
                roleWallrepairer.run(creep);
            }
            else if(creep.memory.role == 'attacker'){
                roleAttacker.run(creep);
            }
        }
    },
    
    attack: function(){
        /* 
        Memory.attackTarget是一个对象
        {
            room:{
                targetRoomName: 房间号
                targetStand: 手动选取一个站位
                targetWallList: 破墙路径，一些墙的id组成的list
                targetSpawnId：此房间的重生点id
            },
            attackers_needed：用多少个attacker进攻
            attackers_num：目前剩余的attacker
            is_finished：默认false，攻击成功就改成true
        }
        */
       //如果attacker不够，尝试按照指定的attackers_num生attacker
        if (Memory.attackTarget.attackers_num < Memory.attackTarget.attackers_needed){
            let attempt = roleAttacker.create(Memory.attackTarget.room.targetRoomName, Memory.attackTarget.room.targetStand, Memory.attackTarget.room.targetWallList, Memory.attackTarget.room.targetSpawnId)
            if (attempt){
                console.log('攻击任务执行中，生成attacker')
            }
        }
    }
    
}

module.exports = funcs