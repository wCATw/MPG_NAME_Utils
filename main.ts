import ItemRegistry from './items';
import KitRegistry, { KitItem } from './kits';

const items = ItemRegistry.getInstance();
const kits = KitRegistry.getInstance();

items.regEquipment("base-additional", 0.1, 1);
items.regEquipment("base-armor", 0.1, 1);
items.regWeapon("base", 0.1, 1);

items.regWeapon("FHS05-1", 0.12, 1);
items.regGrenade("T1-POX-0.505.1", 0.02, 1);
items.regGrenade("T3-POX-0.505.1", 0.02, 1);
items.regAmmo("7.62x51 C1", 0.01, 10000);
items.regAmmo("7.62x51 C6-PEET", 0.2, 10000);
items.regAmmo("7.62x51 C6-TFLG", 0.2, 100);
items.regAmmo("7.62×51 C6-AFLG", 0.15, 100);

kits.regKit("KP-B", [
    { type: 'equipment', name: 'base-additional', amount: 1 },
    { type: 'equipment', name: 'base-armor', amount: 1 },
    { type: 'weapon', name: 'base', amount: 1 },
]);

kits.regKit("Test1", [
    { type: 'equipment', name: 'base-additional', amount: 1 },
    { type: 'equipment', name: 'base-armor', amount: 1 },
    { type: 'weapon', name: 'FHS05-1', amount: 1 },
    { type: 'grenade', name: 'T1-POX-0.505.1', amount: 2 },
    { type: 'grenade', name: 'T3-POX-0.505.1', amount: 2 },
    { type: 'ammo', name: '7.62x51 C1', amount: 220 },
]);

// console.log kits.getKitCost("Test1");