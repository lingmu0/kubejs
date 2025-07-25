// priority: 9
let $LMDamageTypes = Java.loadClass('net.minecraft.world.damagesource.DamageTypes')
let $LMResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey');
let $LMRegistries = Java.loadClass('net.minecraft.core.registries.Registries')

/**
 * 创建伤害类型
 * @param {String} modId 
 * @param {String} damageTypeName 
 * @returns 
 */
function createDamagetype(modId, damageTypeName) {
    return $LMResourceKey.create($LMRegistries.DAMAGE_TYPE,new ResourceLocation(modId,damageTypeName))
}

/**
 * 检测生物脚下方块
 * @param {Internal.LivingEntity} entity 
 * @param {String} block 
 * @returns {Boolean} 是否为指定方块
 */
function checkDownBlock(entity, block) {
    let world = entity.level;
    let targetBlock = world.getBlock(entity.x, entity.y - 1, entity.z);
    
    return targetBlock.getId() === block;
}