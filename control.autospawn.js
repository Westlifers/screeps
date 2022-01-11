//自动繁殖脚本

//这个函数是判断新出生的农民应该绑定到哪个资源点
function get_source(){
    /* 
    Memory.sources = [
        {
            id: 资源点id
            bindHarvester: 绑定的农民，是对象！
            bindContainer: 绑定的容器，是对象！
        }
    ]
    */
    for (let source of Memory.sources){
        let previous_harvester = source.bindHarvester
        if ((previous_harvester == null)|| (!Game.creeps[previous_harvester.name])){
            //如果判定到旧绑定农民已经牺牲，返回本资源点，注意先判断是否为null，防止开局时访问null的属性而报错
            return source
        }
    }
}

var autoSpawn = {
    
    harvesters_needed: 2,
    get builders_needed(){
        let sites = Game.rooms['E52N34'].find(FIND_CONSTRUCTION_SITES)
        if (sites.length > 0){
            return 3
        }
        else{
            return 1
        }
    },
    upgraders_needed: 3,
    fixers_needed: 2,
    carriers_needed: 3,
    wallrepairers_needed: 1,

    spawnHarvester: function(){
        let newName = 'Harvester' + Game.time
        let s = this.stage;
        //既然已经调用这个函数，说明有harvester死亡或者处于开局阶段，通过get_source函数一定可以取到绑定对象不存在的source
        let source = get_source()
        //以防万一，如果没有返回，放弃繁殖农民
        if (!source){return}

        //繁殖时给农民绑定记忆source，储存他的终身目标
        if (this.stage==1){
            var bodyPart=[WORK, WORK, CARRY, MOVE]
            if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'harvester', carry: true, source: source}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s)
                var is_success = true
            }
        }
        else if (this.stage==2){var bodyPart=[WORK, WORK, MOVE]}
        else if (this.stage==3){var bodyPart=[WORK, WORK, WORK, WORK, WORK, MOVE]}
        else if (this.stage==4 || this.stage==5){var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, MOVE]}
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'harvester', carry: false, target: source}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s)
            var is_success = true
        }

        if (is_success){
            //如果成功繁殖，需要更新Memory.sources对于的source绑定的农民
            //先得到这个source的索引
            let index = -1
            for (let item in Memory.sources){
                if (Memory.sources[item].id == source.id){
                    index = item
                }
            }
            Memory.sources[index].bindHarvester = Game.creeps[newName]
        }
    },

    spawnCarrier: function(){
        let newName = 'Carrier' + Game.time;
        let s = this.stage;
        if (this.stage==1 || this.stage==2){var bodyPart=[WORK, CARRY, MOVE, MOVE];}
        else if (this.stage==3){var bodyPart=[WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];}
        else if (this.stage==4){var bodyPart=[WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];}
        else if (this.stage==5){var bodyPart=[WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];}
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'carrier'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnBuilder: function(){
        let newName = 'Builder' + Game.time;
        let s = this.stage;
        if (this.stage==1 || this.stage==2){var bodyPart=[WORK, WORK, CARRY, MOVE];}
        else if (this.stage==3){var bodyPart=[WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE];}
        else if (this.stage==4){var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ,MOVE ,MOVE];}
        else if (this.stage==5){var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE ,MOVE ,MOVE];}
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'builder'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnUpgrader: function(){
        let newName = 'Upgrader' + Game.time;
        let s = this.stage;
        if (this.stage==1 || this.stage==2){var bodyPart=[WORK, CARRY, CARRY, CARRY, MOVE];}
        else if (this.stage==3){var bodyPart=[WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];}
        else if (this.stage==4){var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];}
        else if (this.stage==5){var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ,MOVE ,MOVE];}
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'upgrader'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnFixer: function(){
        let newName = 'Fixer' + Game.time;
        let s = this.stage;
        if (this.stage==1 || this.stage==2){var bodyPart=[WORK, CARRY, MOVE, MOVE];}
        else if (this.stage==3){var bodyPart=[WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];}
        else if (this.stage==4){var bodyPart=[WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];}
        else if (this.stage==5){var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE ,MOVE ,MOVE];}
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'fixer'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnWallrepairer: function(){
        let newName = 'Wallrepairer' + Game.time;
        let s = this.stage;
        if (this.stage==1 || this.stage==2){var bodyPart = [WORK, CARRY, MOVE];}
        else if (this.stage==3){var bodyPart=[WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];}
        else if (this.stage==4){var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];}
        else if (this.stage==5){var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ,MOVE ,MOVE];}
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'wallrepairer'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    get stage(){
        let room = Game.rooms['E52N34'];
        let containers = room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER})
        let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier')
        if (room.energyCapacityAvailable<550){var result = 1}
        if (containers.length>0){var result = 2}
        if (room.energyCapacityAvailable>=550){var result = 3}
        if (room.energyCapacityAvailable>=800){var result = 4}
        if (room.energyCapacityAvailable>=1200){var result = 5}
        //阶段回滚，防止意外错误导致整个系统宕机
        //宕机保障1：能量太少，处理爬死亡后重生而能量不足的情况，生低配的
        if (room.energyAvailable<=300){var result = 2}
        //宕机保障2：没有carrier，这将导致挖运分离系统的崩溃，立即回到阶段二保证最低配的carrier重生
        if (carriers.length == 0){var result = 2}
        //宕机保障2：爬太少，这说明系统已经崩溃，挖运分离已经不能运行，必须退回阶段一
        if (room.find(FIND_MY_CREEPS).length <= 2 || containers.length == 0){var result = 1}
        return result;
    },
    
    
    trySpawn: function(lacks){
        for (let lackType in lacks){
            if (lacks[lackType]){
                //如果缺少carrier但是在第一阶段（即没有container），跳过
                if ((lackType == 'lackCarriers' && this.stage == 1) || lackType == 'lackAny'){continue}
                //同时第一阶段不要fixer和wallrepairer
                if ((lackType == 'lackFixers' || lackType == 'lackWallrepairers') && this.stage <= 1){continue}
                //否则尝试生成
                let func_name = lackType.slice(4).slice(0,-1);
                func_name = 'this.' + 'spawn' + func_name;
                eval(func_name + '()');
                //一次尝试就返回，防止能量不够跳到下一次重生
                return
            }
        }
    }
}


module.exports = autoSpawn