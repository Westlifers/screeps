//战士

var roleAttacker = {

    run: function(creep) {
        let flag = Game.flags['attackhere']
        //如果没有旗帜，但是attacker已经生出来了，待命，这是为了处理任务结束或者更改旗帜缓冲的
        if (!flag){return}
        //先移动到旗帜所在房间
        if (creep.room != flag.room){
            creep.moveTo(flag)
        }
        //然后开始攻击旗帜所在建筑
        else{
            let structure = flag.pos.findInRange(FIND_STRUCTURES, 0)[0]
            if (!structure){
                //这是中间手操移动过程中，旗帜下并不一定有建筑，此时应当移动到旗帜处去
                creep.moveTo(flag)
            }
            else{
                if (creep.attack(structure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structure)
                }
            }
        }
    }
}

module.exports = roleAttacker