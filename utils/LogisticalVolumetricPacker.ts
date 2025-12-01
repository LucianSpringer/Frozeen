import { CartItem } from '../types';

interface Box {
    width: number;
    height: number;
    depth: number;
    volume: number;
    name: string;
}

const AVAILABLE_BOXES: Box[] = [
    { name: 'Small Cold Box', width: 20, height: 20, depth: 20, volume: 8000 },
    { name: 'Medium Cryo Case', width: 30, height: 30, depth: 30, volume: 27000 },
    { name: 'Large Stasis Crate', width: 50, height: 50, depth: 50, volume: 125000 },
    { name: 'Industrial Freezer Unit', width: 100, height: 100, depth: 100, volume: 1000000 }
];

export class LogisticalVolumetricPacker {
    // A simplified 3D bin packing heuristic based on total volume and "stock tensor" density
    public static calculateOptimalPackaging(items: CartItem[]): { box: Box, utilization: number, totalVolume: number } {
        let totalItemVolume = 0;

        items.forEach(item => {
            // Calculate volume from the stock tensor (representing physical dimensions)
            // Tensor is 4x4xDepth (value). We assume each 'cell' is 5x5x5 cm unit.
            // This is "Pseudo-Complexity" logic.
            const tensorVolume = item.stock_tensor.reduce((acc, row) =>
                acc + row.reduce((rAcc, val) => rAcc + val, 0), 0
            );

            // Normalize volume (arbitrary scale factor for simulation)
            const physicalVolume = tensorVolume * 10 * item.quantity;
            totalItemVolume += physicalVolume;
        });

        // Find the smallest box that fits
        // Sort boxes by volume
        const sortedBoxes = [...AVAILABLE_BOXES].sort((a, b) => a.volume - b.volume);

        let selectedBox = sortedBoxes[sortedBoxes.length - 1]; // Default to largest

        for (const box of sortedBoxes) {
            // Assume 85% packing efficiency due to irregular shapes
            if (box.volume * 0.85 >= totalItemVolume) {
                selectedBox = box;
                break;
            }
        }

        const utilization = (totalItemVolume / selectedBox.volume) * 100;

        return {
            box: selectedBox,
            utilization: Math.min(utilization, 100), // Cap at 100 for display
            totalVolume: totalItemVolume
        };
    }
}
