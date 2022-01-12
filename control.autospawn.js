//自动繁殖脚本

//这个函数是判断新出生的农民应该绑定到哪个资源点
function get_source(){
    /* 
    Memory.sources = [
        {
            id: 资源点id
            bindHarvester: 绑定的农民，是对象！
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

//这个函数是判断新出生的高阶农民应该走到到哪个容器上
function get_container(sourceId){
    let source = Game.rooms[Memory.roomName].find(FIND_SOURCES, {filter:
        (source) => source.id == sourceId
    })[0]
    //在资源点附近1格内找容器
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {filter:
        (structure) => structure.structureType == STRUCTURE_CONTAINER
    })[0]
    //找到就返回
    if (container){
        return container
    }
    else{
        return false
    }
}

var autoSpawn = {
    
    harvesters_needed: 2,
    get builders_needed(){
        let sites = Game.rooms[Memory.roomName].find(FIND_CONSTRUCTION_SITES)
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
        let source = get_source()
        let container = get_container(source.id)
        //以防万一，如果没有返回，放弃繁殖农民
        if (!source){return}

        //繁殖时给农民绑定记忆source，储存他的终身目标
        if (s == 1){
            var bodyPart=[WORK, WORK, CARRY, MOVE]
            if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'harvester', carry: true, source: source}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s)
                var is_success = true
            }
        }
        else{
            switch(s){
                case 2:
                    var bodyPart=[WORK, WORK, MOVE]
                    break
                case 3:
                    var bodyPart=[WORK, WORK, WORK, WORK, WORK, MOVE]
                    break
                case 4:
                case 5:
                    var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, MOVE]
                    break
            }
            //后面的阶段都要试图绑定容器
            if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'harvester', carry: false, source: source, container: container}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s)
                var is_success = true
            }
        }

        if (is_success){
            //如果成功繁殖，需要更新Memory.sources对于的source绑定的农民
            //先得到这个source的索引
            for (let item in Memory.sources){
                if (Memory.sources[item].id == source.id){
                    var index = item
                }
            }
            //再修改内存中资源点所绑定的农民
            Memory.sources[index].bindHarvester = Game.creeps[newName]
        }
    },

    spawnCarrier: function(){
        let newName = 'Carrier' + Game.time
        let s = this.stage
        switch(s){
            case 1:
            case 2:
                var bodyPart=[WORK, CARRY, MOVE, MOVE]
                break
            case 3:
                var bodyPart=[WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
                break
            case 4:
                var bodyPart=[WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                break
            case 5:
                var bodyPart=[WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
                break
        }
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'carrier'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnBuilder: function(){
        let newName = 'Builder' + Game.time
        let s = this.stage
        switch(s){
            case 1:
            case 2:
                var bodyPart=[WORK, WORK, CARRY, MOVE]
                break
            case 3:
                var bodyPart=[WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
                break
            case 4:
                var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ,MOVE ,MOVE]
                break
            case 5:
                var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE ,MOVE ,MOVE]
                break
        }
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'builder'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnUpgrader: function(){
        let newName = 'Upgrader' + Game.time
        let s = this.stage
        switch(s){
            case 1:
            case 2:
                var bodyPart=[WORK, CARRY, CARRY, CARRY, MOVE]
                break
            case 3:
                var bodyPart=[WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
                break
            case 4:
                var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
                break
            case 5:
                var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ,MOVE ,MOVE]
                break
        }
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'upgrader'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnFixer: function(){
        let newName = 'Fixer' + Game.time
        let s = this.stage
        switch(s){
            case 1:
            case 2:
                var bodyPart=[WORK, CARRY, MOVE, MOVE]
                break
            case 3:
                var bodyPart=[WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE]
                break
            case 4:
                var bodyPart=[WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE]
                break
            case 5:
                var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE ,MOVE ,MOVE]
                break
        }
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'fixer'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    spawnWallrepairer: function(){
        let newName = 'Wallrepairer' + Game.time
        let s = this.stage
        switch(s){
            case 1:
            case 2:
                var bodyPart = [WORK, CARRY, MOVE]
                break
            case 3:
                var bodyPart=[WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                break
            case 4:
                var bodyPart=[WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
                break
            case 5:
                var bodyPart=[WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE ,MOVE ,MOVE]
                break
        }
        if (Game.spawns['Spawn'].spawnCreep(bodyPart, newName, {memory:{role:'wallrepairer'}}) == 0){
            console.log('Creating ' + newName + ' of stage ' + s);
        }
    },

    get stage(){

        let room = Game.rooms[Memory.roomName];
        let containers = room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER})
        let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier')
        //阶段一：开局
        if (room.energyCapacityAvailable < 550){var result = 1}
        //阶段二：拥有容器与资源点等量，挖运分离建立
        if (containers.length == Memory.sources.length){var result = 2}
        //阶段三：至少拥有五个extension
        if (room.energyCapacityAvailable >= 550){var result = 3}
        //阶段四：至少拥有十个extension
        if (room.energyCapacityAvailable >= 800){var result = 4}
        //阶段五：至少拥有二十个extension
        if (room.energyCapacityAvailable >= 1200){var result = 5}
        
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
                //第一阶段不要carrier，fixer和wallrepairer
                if (((lackType == 'lackFixers' || lackType == 'lackWallrepairers' || lackType == 'lackCarriers') && this.stage == 1) || lackType == 'lackAny'){continue}
                //尝试生成
                let func_name = lackType.slice(4).slice(0,-1);
                func_name = 'this.' + 'spawn' + func_name;
                eval(func_name + '()');
                //一次尝试就返回，防止能量不够跳到下一次重生，即：优先级
                return
            }
        }
    }
}


module.exports = autoSpawn