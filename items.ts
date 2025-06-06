import Decimal from 'decimal.js';
import logger from './logger';

class ItemRegistry {
    private static instance: ItemRegistry;

    private items: Record<string, Map<string, Decimal>> = {
        equipment: new Map(),
        ammo: new Map(),
        weapon: new Map(),
        grenade: new Map(),
    };
    private itemsHashSet: Set<string> = new Set();

    private constructor() {}

    public static getInstance(): ItemRegistry {
        if (!ItemRegistry.instance) {
            ItemRegistry.instance = new ItemRegistry();
        }
        return ItemRegistry.instance;
    }

    private regItem(type: keyof ItemRegistry['items'], name: string, cost: number, amount: number, override: boolean = false): void {
        const key = `${type}_${name}`;
        if (this.itemsHashSet.has(key)) {
            if (override) {
                logger.warn(`Предмет ${type} ${name} перезаписан.`);
            } else {
                logger.error(`Предмет ${type} ${name} уже зарегистрирован.`);
                return;
            }
        } else {
            logger.debug(`Предмет ${type} ${name} зарегистрирован.`);
        }

        this.itemsHashSet.add(key);
        const unitCost = new Decimal(cost).div(amount);
        this.items[type].set(name, unitCost);
    }

    public regEquipment(name: string, cost: number, amount: number, override: boolean = false): void {
        this.regItem('equipment', name, cost, amount, override);
    }

    public regAmmo(name: string, cost: number, amount: number, override: boolean = false): void {
        this.regItem('ammo', name, cost, amount, override);
    }

    public regWeapon(name: string, cost: number, amount: number, override: boolean = false): void {
        this.regItem('weapon', name, cost, amount, override);
    }

    public regGrenade(name: string, cost: number, amount: number, override: boolean = false): void {
        this.regItem('grenade', name, cost, amount, override);
    }

    public getItemsCost(type: keyof ItemRegistry['items'], name: string, amount: number): number {
        const unitCost = this.items[type].get(name);
        if (!unitCost) {
            logger.error(`Предмет ${type} ${name} не найден.`);
            return 0;
        }

        return unitCost.mul(amount).toNumber();
    }

    public checkItemExists(type: keyof ItemRegistry['items'], name: string): boolean {
        return this.itemsHashSet.has(`${type}_${name}`);
    }
}

export default ItemRegistry;
