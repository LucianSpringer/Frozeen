import { CartItem } from '@/types';

interface Box {
    id: string;
    name: string;
    maxWeight: number; // kg
    dimensions: { l: number; w: number; h: number }; // cm
    volume: number; // cm3
}

interface PackingResult {
    box: Box;
    totalWeight: number;
    totalVolume: number;
    utilization: number; // percentage
}

export class LogisticalVolumetricPacker {
    private boxes: Box[] = [
        { id: 'S', name: 'Small Box', maxWeight: 5, dimensions: { l: 20, w: 20, h: 15 }, volume: 6000 },
        { id: 'M', name: 'Medium Box', maxWeight: 10, dimensions: { l: 30, w: 25, h: 20 }, volume: 15000 },
        { id: 'L', name: 'Large Box', maxWeight: 20, dimensions: { l: 40, w: 30, h: 30 }, volume: 36000 },
        { id: 'XL', name: 'Extra Large Box', maxWeight: 30, dimensions: { l: 50, w: 40, h: 40 }, volume: 80000 },
    ];

    calculatePacking(cartItems: CartItem[]): PackingResult {
        let totalWeight = 0;
        let totalItemVolume = 0;

        cartItems.forEach(item => {
            totalWeight += (item.weight || 0) * item.quantity;
            // Est volume if not present (simplified)
            const estVolume = (item.weight || 0) * 1.2 * 1000; // 1kg ~ 1.2L ~ 1200cm3
            totalItemVolume += estVolume * item.quantity;
        });

        // Find smallest box that fits
        const selectedBox = this.boxes.find(box =>
            box.maxWeight >= totalWeight && box.volume >= totalItemVolume
        ) || this.boxes[this.boxes.length - 1]; // Default to largest if overflow (in reality would split)

        const utilization = (totalItemVolume / selectedBox.volume) * 100;

        return {
            box: selectedBox,
            totalWeight,
            totalVolume: totalItemVolume,
            utilization: Math.min(utilization, 100), // Cap at 100 for display
        };
    }
}
