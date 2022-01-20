//定义房间类，包括整个房间的各种参数，内置各种繁殖方法

class Room {
    constructor(roomName, sourceIds, spawnName){
        this.roomName = roomName
        this.spawnName = spawnName

        this.sources = []
        for (let sourceId of sourceIds){
            let obj = {
                id: sourceId,
                bindHarvester: null,
            }
            this.sources.push(obj)
        }

        this.wallLevel = 0
        
        this.harvesters_needed = 2
        this.upgraders_needed = 2
        this.fixers_needed = 2
        this.carriers_needed = 2
        this.fillers_needed = 2
        this.painting = false

        this.spawnHarvester = function(){
            let newName = this.roomName + 'Harvester' + Game.time
            let s = this.stage
            var source = this.sourceAndContainerForNewHarvester
            //判断source是什么类型，如果是列表，要解包
            if (source.length){
                var container = source[1]
                var source = source[0]//注意不要交换顺序
            }
            //以防万一，如果没有返回，放弃繁殖农民
            if (!source){return}
    
            //繁殖时给农民绑定记忆source，储存他的终身目标
            if (s == 1){
                var bodyPart=[WORK, WORK, CARRY, MOVE]
                if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'harvester', carry: true, source: source}}) == 0){
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
                if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'harvester', carry: false, source: source, containerId: container.id}}) == 0){
                    console.log('Creating ' + newName + ' of stage ' + s)
                    var is_success = true
                }
            }
    
            if (is_success){
                //如果成功繁殖，需要更新Memory.sources对于的source绑定的农民
                //先得到这个source的索引
                for (let item in this.room.sources){
                    if (this.room.sources[item].id == source.id){
                        var index = item
                    }
                }
                //再同时修改本实例与内存中该房间对应资源点所绑定的农民
                this.room.sources[index].bindHarvester = Game.creeps[newName]
                Memory.sources[index].bindHarvester = Game.creeps[newName]
            }
        }
    
        this.spawnCarrier = function(){
            let newName = this.roomName + 'Carrier' + Game.time
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
            if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'carrier'}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s);
            }
        }
        
        this.spawnBuilder = function(){
            let newName = this.roomName + 'Builder' + Game.time
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
            if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'builder'}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s);
            }
        }
    
        this.spawnUpgrader = function(){
            let newName = this.roomName + 'Upgrader' + Game.time
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
            if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'upgrader'}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s);
            }
        }
    
        this.spawnFixer = function(){
            let newName = this.roomName + 'Fixer' + Game.time
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
            if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'fixer'}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s);
            }
        }
    
        this.spawnWallrepairer = function(){
            let newName = this.roomName + 'Wallrepairer' + Game.time
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
            if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'wallrepairer'}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s);
            }
        }
    
        this.spawnFiller = function(){
            let newName = this.roomName + 'Filler' + Game.time
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
            if (Game.spawns[this.spawnName].spawnCreep(bodyPart, newName, {memory:{role:'filler'}}) == 0){
                console.log('Creating ' + newName + ' of stage ' + s);
            }
        }
        
        this.trySpawn = function(lacks){
            for (let lackType in lacks){
                if (lacks[lackType]){
                    //第一阶段不要carrier，fixer和wallrepairer
                    if (((lackType == 'lackFixers' || lackType == 'lackWallrepairers' || lackType == 'lackCarriers') && this.get_stage(room) == 1) || lackType == 'lackAny'){continue}
                    //如果没有storage，不要filler
                    if (lackType == 'lackFillers'){
                        let storage = Game.rooms[room.roomName].storage
                        if (!storage){
                            continue
                        }
                    }
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
    get sourceAndContainerForNewHarvester(){
        for (let source of this.sources){
            let previous_harvester = source.bindHarvester
            if (previous_harvester == null || !Game.creeps[previous_harvester.name]){
                //如果判定到旧绑定农民已经牺牲，返回本资源点，注意先判断是否为null，防止开局时访问null的属性而报错
                //如果挖运分离未建立，仅返回本资源点，否则，检测附近容器，并同时返回该容器
                if (this.stage == 1){
                    return source
                }
                else{
                    //先得到该source的游戏对象
                    let game_source = Game.rooms[this.roomName].find(FIND_SOURCES, {filter:
                        (the_source) => the_source.id == source.id
                    })[0]
                    //在资源点附近1格内找容器
                    let container = game_source.pos.findInRange(FIND_STRUCTURES, 1, {filter:
                        (structure) => structure.structureType == STRUCTURE_CONTAINER
                    })[0]
                    return [source, container]
                }
            }
        }
    }
    get builders_needed(){
        let sites = Game.rooms[this.room.roomName].find(FIND_CONSTRUCTION_SITES)
        if (sites.length > 0){
            return 3
        }
        else{
            return 1
        }
    }
    get wallrepairers_needed(){
        if (this.room.painting){
            return 1
        }
        else{
            return 0
        }
    }
    get stage(){
        let room = Game.rooms[this.room.roomName]
        let containers = room.find(FIND_STRUCTURES, {filter: (structure) => structure.structureType == STRUCTURE_CONTAINER})
        let carriers = _.filter(Game.creeps, (creep) => (creep.memory.role == 'carrier' && creep.room == this.room.roomName))
        //阶段一：开局
        if (room.energyCapacityAvailable < 550){var result = 1}
        //阶段二：拥有容器与资源点等量，挖运分离建立
        if (containers.length == this.room.sources.length){var result = 2}
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

        return result
    }
    get wallsHitsTo(){
        var levels = [3000, 300, 150, 60, 30, 15, 6, 3, 2, 1.5, 1.2, 1]
        //优先查询内存中的painting变量是否允许刷墙，若否，返回levels[0]（这意味着认为墙等级为0，所有墙只刷到1/3000）
        if (!this.painting){return levels[0]}
        if (this.wallLevel <= levels.length - 1){
            var go_to_next_level = true
            //注意找墙时要排除边缘的系统隔离墙
            var walls = Game.rooms[this.roomName].find(FIND_STRUCTURES, {filter: (structure) => (structure.structureType == STRUCTURE_WALL && (structure.pos.x > 0 && structure.pos.x < 49 && structure.pos.y > 0 && structure.pos.y < 49))})
            for (let wallIndex in walls){
                let wall = walls[wallIndex]
                if (wall.hitsMax/wall.hits <= levels[Memory.wallLevel]){
                    go_to_next_level = (go_to_next_level && true)
                }
                else{
                    go_to_next_level = (go_to_next_level && false)
                }
            }
            if (go_to_next_level){
                this.wallLevel = this.wallLevel + 1
                console.log('Walls level up in room ' + this.roomName)
            }
        }
        return levels[this.wallLevel]
    }
}

module.exports = Room