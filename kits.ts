import ItemRegistry from './items';
import Decimal from 'decimal.js';
import logger from './logger';

type KitItem = {
    type: keyof ItemRegistry['items'];
    name: string;
    amount: number;
};

class KitRegistry {
    private static instance: KitRegistry;

    private kits: Record<string, KitItem[]> = {};
    private itemRegistry: ItemRegistry;

    private constructor() {
        this.itemRegistry = ItemRegistry.getInstance();
    }

    public static getInstance(): KitRegistry {
        if (!KitRegistry.instance) {
            KitRegistry.instance = new KitRegistry();
        }
        return KitRegistry.instance;
    }

    public regKit(kitName: string, items: KitItem[]): void {
        if (this.kits[kitName]) {
            logger.error(`Комплект ${kitName} уже зарегистрирован.`);
            return;
        }

        for (const item of items) {
            if (!this.itemRegistry.checkItemExists(item.type, item.name)) {
                logger.error(`Предмет ${item.type} ${item.name} не зарегистрирован в реестре предметов.`);
                return;
            }
        }

        this.kits[kitName] = items;
        const kitCost = this.getKitCost(kitName);
        logger.debug(`Комплект ${kitName} зарегистрирован. Его стоимость: ${kitCost}.`);
    }

    public getKitCost(kitName: string): number {
        const kit = this.kits[kitName];
        if (!kit) {
            logger.error(`Комплект ${kitName} не найден.`);
            return 0;
        }

        let totalCost = new Decimal(0);
        for (const item of kit) {
            const itemCost = new Decimal(this.itemRegistry.getItemsCost(item.type, item.name, item.amount));
            totalCost = totalCost.plus(itemCost);
        }

        return totalCost.toNumber();
    }
}

export type { KitItem };
export default KitRegistry;
