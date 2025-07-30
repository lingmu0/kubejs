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


/**
 * 斩击
 * @param {Internal.LivingEntity} entity 
 * @param {number} count 
 * @param {number} step 
 * @param {Internal.ParticleOptions_} particleId 
 */
function lmdrawSlashParticleLine(entity, count, step, particleId) {
    const level = entity.level;
    if (count === undefined) count = 30
    if (step === undefined) step = 0.1
    if (particleId === undefined) particleId = "minecraft:end_rod"

    count = Math.max(2, count || 10);
    step = Math.max(0.1, step || 0.5); // 每个粒子的偏移量

    // 获取实体位置
    const ex = entity.x
    const ey = entity.y + entity.getBbHeight() / 2
    const ez = entity.z
    //player.tell("[调试] 融梦极光斩击实体位置: " + ex + ", " + ey + ", " + ez);
    let x = ex, ax = ex
    let y = ey, ay = ey
    let z = ez, az = ez

    // 正向粒子线
    for (let j = 0; j <= count / 2; j++) {
        level.runCommandSilent(`particle ${particleId} ${x} ${y} ${z} 0 0 0 0 1 force`)
        x += step
        y += step
        z += step
    }

    // 反向粒子线
    for (let j = count / 2; j < count; j++) {
        level.runCommandSilent(`particle ${particleId} ${ax} ${ay} ${az} 0 0 0 0 1 force`)
        ax -= step
        ay -= step
        az -= step
    }

    x = ex, ax = ex
    y = ey, ay = ey
    z = ez, az = ez


    // 正向粒子线
    for (let j = 0; j <= count / 2; j++) {
        level.runCommandSilent(`particle ${particleId} ${x} ${y} ${z} 0 0 0 0 1 force`)
        x += step
        y += step
        z -= step
    }

    // 反向粒子线
    for (let j = count / 2; j < count; j++) {
        level.runCommandSilent(`particle ${particleId} ${ax} ${ay} ${az} 0 0 0 0 1 force`)
        ax -= step
        ay -= step
        az += step
    }
}