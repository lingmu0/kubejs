//浴火锻兵
TetraAdditionEvents.craft(event => {
    let { player, level, currentSchematic, currentSlot, targetStack, upgradedStack, materials } = event
    if (level.clientSide) return
    let a = upgradedStack.nbt.getInt("staff_of_homa1:staff_of_homa/hone_refine") || 0
    let b = targetStack.nbt.getInt("staff_of_homa1:staff_of_homa/hone_refine") || 0
    if (a == b ||a != 5 || b != 4) return

    let random = Math.random()
    if (random < 0.75) {
        remove_improvement(upgradedStack, 'staff_of_homa/hone_refine', false)
        player.tell('锻造失败')
    }

    player.getServer().runCommandSilent('playsound minecraft:entity.generic.explode player @a ' + player.x + ' ' + player.y + ' ' + player.z)
    let flame_strike_entity = new $LMFlame_Strike_Entity(level, player.x, player.y, player.z, player.YHeadRot, 100, 10, 5, 3, 0, 6, false, player)
    level.addFreshEntity(flame_strike_entity)
})