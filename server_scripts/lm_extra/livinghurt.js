// priority: 8

// 玩家对生物造成伤害事件(livinghurt)
let lmTetraPlayerHurtStrategies = {
    /**
     * 
     * @param {Internal.LivingHurtEvent} event 
     * @param {Internal.Player} player 
     * @param {*} effectValue 
     * @param {*} item 
     * @param {*} originalEffectName 
     */
    "rage_blade": function (event, player, effectValue, item, originalEffectName) {
        let {source}= event
        let sourceType = source.getType()
        if(sourceType !== "player") return
        if (player.hasEffect('minecraft:haste')) {
            let amplifier  = player.getEffect('minecraft:haste').getAmplifier()
            player.potionEffects.add('minecraft:haste', 20 * 5, Math.min(4, amplifier + 1));
        } else {
            player.potionEffects.add('minecraft:haste', 20 * 5, 0);
        }
    },
    /**
     * 
     * @param {Internal.LivingHurtEvent} event 
     * @param {Internal.Player} player 
     * @param {*} effectValue 
     * @param {*} item 
     * @param {*} originalEffectName 
     */
    "maodie_breathe_out": function (event, player, effectValue, item, originalEffectName) {
        let {entity, source}= event
        let sourceType = source.getType()
        if(sourceType === "sonic_boom") return
        let attackSpeed = Math.ceil(player.getAttributeValue('generic.attack_speed'))
        if(sourceType === "player") {
            player.persistentData.putInt(originalEffectName, attackSpeed * 2)
            player.level.playSound(
                null,
                player.x,
                player.y,
                player.z,
                'lm_extra:haqi',
                player.soundSource,
                1,
                1
            )
        }
        let attackSpeedCount = player.persistentData.getInt(originalEffectName) ?? 0
        if(attackSpeedCount--) {
            player.persistentData.putInt(originalEffectName, attackSpeedCount)
            entity.invulnerableTime = 0
            entity.attack(player.damageSources().source($LMDamageTypes.SONIC_BOOM, player), 1)
        }
    },
    /**
     * 
     * @param {Internal.LivingHurtEvent} event 
     * @param {Internal.Player} player 
     * @param {*} effectValue 
     * @param {*} itemstack 
     * @param {*} originalEffectName 
     */
    "sacred_sword": function (event, player, effectValue, itemstack, originalEffectName) {
        let {amount, source} = event;
        let hasPearlescentHand = false;
        let criticalStrikeLevel = 0;
        let critMultiplier = 1; // 默认暴击倍率
        
        // 获取所有效果
        let effects = getAllEffects(itemstack);
        for(let effectName of effects) {
            if(effectName.key === "pearlescent_hand_protection") {
                hasPearlescentHand = true;
            }
            else if(effectName.key === "criticalStrike") {
                criticalStrikeLevel = simpleGetTetraEffectLevel(itemstack, "criticalStrike");
                // 获取暴击倍率（假设通过效率值或固定倍率）
                critMultiplier = itemstack.item.getEffectEfficiency(itemstack, "criticalStrike") || 1.5;
            }
        }
        
        // 仅当暴击率超过100%且满足触发条件时处理
        if(criticalStrikeLevel > 100 && (hasPearlescentHand || source.getType() === "player")) {
            // 计算满100%的部分（例如：250% → 2个完整的100%）
            const fullHundreds = Math.floor((criticalStrikeLevel - 100) / 100);
            // 计算剩余百分比（例如：250% → 50%）
            const remainingPercent = (criticalStrikeLevel - 100) % 100;
            
            // 总暴击倍率 = 基础伤害 × (暴击倍率^必触发次数) × (概率触发 ? 暴击倍率 : 1)
            let finalMultiplier = Math.pow(critMultiplier, fullHundreds);
            
            // 概率触发额外暴击
            if(Math.random() < (remainingPercent / 100)) {
                finalMultiplier *= critMultiplier;
            }
            
            // 应用最终伤害
            event.setAmount(amount * finalMultiplier);
            //event.setIsCritical(true); // 标记为暴击（可选）
        }
        // let {amount, source}= event
        // let existHand = false
        // let critEffectValue = 0
        // let efficiency = 0
        // let effects = getAllEffects(itemstack);
        // for(let effectName of effects){
        //     if(effectName.key == "pearlescent_hand_protection") {
        //         existHand = true
        //     }
        //     else if(effectName.key == "criticalStrike") {
        //         critEffectValue = simpleGetTetraEffectLevel(itemstack, "criticalStrike");
        //         //if(critEffectValue <= 100) return
        //         efficiency = itemstack.item.getEffectEfficiency(itemstack, "criticalStrike")
        //     }
        // };
        // if(existHand) {
        //     event.setAmount(amount * (efficiency + (critEffectValue-100)/50))
        // }
        // else if(source.getType() === "player") {
        //     event.setAmount(amount * (efficiency + (critEffectValue-100)/50))
        // }
    },
    "manbo": function (event, player, effectValue, itemstack, originalEffectName) {
        let {entity, source}= event
        let sourceType = source.getType()
        if(sourceType === "player") {
            player.level.playSound(
                null,
                player.x,
                player.y,
                player.z,
                'lm_extra:manbo',
                player.soundSource,
                1,
                1
            )
        }
    },
    /**
     * 
     * @param {Internal.LivingHurtEvent} event 
     * @param {Internal.Player} player 
     * @param {*} effectValue 
     * @param {*} itemstack 
     * @param {*} originalEffectName 
     */
    "pearlescent_hand_protection": function (event, player, effectValue, itemstack, originalEffectName) {
        let {entity, source, amount}= event
        if(source.getType() === "player") return
        let effects = getAllEffects(itemstack);
        for(let effectName of effects){
            if(effectName.key == "criticalStrike"){
                let critEffectValue = simpleGetTetraEffectLevel(itemstack, "criticalStrike");
                let efficiency = itemstack.item.getEffectEfficiency(itemstack, "criticalStrike")
                if(efficiency < 1) return
                if(player.getRandom().nextDouble() < critEffectValue/100) {
                    event.setAmount(amount * efficiency)
                }
            }
        };
    },
}
Object.assign(tetraPlayerAttackStrategies, lmTetraPlayerHurtStrategies);