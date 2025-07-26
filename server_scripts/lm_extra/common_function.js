// priority: 9
let $LMDamageTypes = Java.loadClass('net.minecraft.world.damagesource.DamageTypes')
let $LMResourceKey = Java.loadClass('net.minecraft.resources.ResourceKey');
let $LMRegistries = Java.loadClass('net.minecraft.core.registries.Registries')
let $lMCriticalHitEvent = Java.loadClass('net.minecraftforge.event.entity.player.CriticalHitEvent')

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
    let blockX = Math.floor(entity.x);
    let blockY = Math.floor(entity.y - 1); 
    let blockZ = Math.floor(entity.z);
    let targetBlock = world.getBlock(blockX, blockY, blockZ);

    return targetBlock.getId() === block;
}

function lmGetEffectEfficiency(itemstack, effectname) {
    if (itemstack.item instanceof $ModularItem) {
        return itemstack.item.getEffectEfficiency(itemstack, $ItemEffect.get(effectname))
    }
}