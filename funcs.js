//main使用到的函数

var autoSpawn = require('control.autospawn')
var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')
var roleFixer = require('role.fixer')
var roleCarrier = require('role.carrier')
var roleWallrepairer = require('role.wallrepairer')
var roleFiller = require('role.filler')
var roleAttacker = require('role.attacker')

var funcs = {
    clear_memory: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log(`正在清理已死亡的creep${name}的内存`)
            }
        }
    },
    
    check_creeps: function(room){
        var lackHarvesters = (_.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester' && creep.room.name == room.roomName)).length < autoSpawn.harvesters_needed)
        var lackCarriers = (_.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.room.name == room.roomName).length < autoSpawn.carriers_needed)
        var lackBuilders = (_.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room.name == room.roomName).length < autoSpawn.builders_needed)
        var lackUpgraders = (_.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room.name == room.roomName).length < autoSpawn.upgraders_needed)
        var lackFixers = (_.filter(Game.creeps, (creep) => creep.memory.role == 'fixer' && creep.room.name == room.roomName).length < autoSpawn.fixers_needed)
        var lackWallrepairers = (_.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepairer' && creep.room.name == room.roomName).length < autoSpawn.wallrepairers_needed)
        var lackFillers = (_.filter(Game.creeps, (creep) => creep.memory.role == 'filler' && creep.room.name == room.roomName).length < autoSpawn.fillers_needed)
        var lackAny = false;
        var obj = {
            lackHarvesters: lackHarvesters,
            lackCarriers: lackCarriers,
            lackFillers: lackFillers,
            lackUpgraders: lackUpgraders,
            lackBuilders: lackBuilders,
            lackFixers: lackFixers,
            lackWallrepairers: lackWallrepairers,
        }
        for (let item in obj){
            lackAny = (lackAny || obj[item])
        }
        obj.lackAny = lackAny
        
        return obj
    },

    run_creeps: function(){
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep)
            }
            else if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep)
            }
            else if(creep.memory.role == 'builder') {
                roleBuilder.run(creep)
            }
            else if(creep.memory.role == 'fixer') {
                roleFixer.run(creep)
            }
            else if(creep.memory.role == 'carrier'){
                roleCarrier.run(creep)
            }
            else if(creep.memory.role == 'wallrepairer'){
                roleWallrepairer.run(creep)
            }
            else if(creep.memory.role == 'attacker'){
                roleAttacker.run(creep)
            }
            else if(creep.memory.role == 'filler'){
                roleFiller.run(creep)
            }
        }
    },
    
    attack: function(){
        let flag = Game.flags['attackhere']
        //正常来说既然能调用这个函数，说明‘attackhere’这个旗帜是存在的，但是以防万一，还是判断一下
        if (!flag){return}
        let attaker = Game.creeps['我是一个没有感情滴杀手']
        //如果没有attacker，尝试生成一个
        if (!attaker){
            Game.spawns['Spawn'].spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], '我是一个没有感情滴杀手', {memory: {role: 'attacker'}})
            console.log('开始制造杀手')
            //无论生成是否成功都直接返回，后面没必要执行了
            return
        }
        //如果有，运行它的run函数
        else{
            roleAttacker.run(attaker)
        }
    }
    
}

module.exports = funcs