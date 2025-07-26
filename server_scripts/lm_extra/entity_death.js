NativeEvents.onEvent($LivingDeathEvent, (/**@type{Internal.LivingDeathEvent}*/event) => {
    let {entity, source} = event
    let player = source.player
    if(entity.isLiving() && entity.isMonster() && player){
        // 检查玩家物品栏是否有钻石
        let has = player.inventory.items.some(item => {
            return item.id === 'lm_extra:glory'
        })

        let has1 = player.getOffHandItem().id === 'lm_extra:glory'
        let has2 = player.getMainHandItem().id === 'lm_extra:glory'
        
        if(has||has1||has2){
            let count = player.persistentData.getInt('glory') ?? 0
            player.persistentData.putInt('glory',count+1)
        }
    }
})