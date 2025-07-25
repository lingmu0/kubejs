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
}
Object.assign(tetraPlayerAttackStrategies, lmTetraPlayerHurtStrategies);