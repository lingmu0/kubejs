// priority: 998
const newLMMaterials = [
    { material: '', ftb_id: '', effect_name: 'rage_blade' ,tags:[]},
    { material: '', ftb_id: '', effect_name: 'maodie_breathe_out' ,tags:[]},
    { material: '', ftb_id: '', effect_name: 'rainbow_gemstone' ,tags:[]},
];
newLMMaterials.forEach(material => {
    global.materials.push(material);
});