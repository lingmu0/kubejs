StartupEvents.registry('item', event => {
    event.create("lm_extra:white_silk","basic")
    event.create("lm_extra:black_silk","basic")
    event.create("lm_extra:rage_blade","basic")
    event.create("lm_extra:maodie_breathe_out","basic")
    event.create("lm_extra:rainbow_gemstone","basic")
    event.create("lm_extra:color_ingot","basic")
    event.create("lm_extra:nature_heart","basic")
    event.create("lm_extra:glory","basic")
    event.create("lm_extra:gambling","basic")
    event.create("lm_extra:manbo","basic")
    event.create("lm_extra:wildly_arrogant","basic")
    event.create("lm_extra:dominate","basic")
    event.create("lm_extra:pearlescent_hand_protection","basic")
    event.create("lm_extra:sacred_sword","basic")
})

StartupEvents.registry('sound_event', event => {
    event.create("lm_extra:haqi")
    event.create("lm_extra:manbo")
})


StartupEvents.registry('mob_effect', event => {
    event.create("lm_extra:luck").beneficial().color(Color.GREEN)
        .modifyAttribute("minecraft:generic.luck","lm_extra_minecraft_luck",0.1, "multiply_total")
        .modifyAttribute("pasterdream:luck","lm_extra_pasterdream_luck",0.1, "multiply_total")
})