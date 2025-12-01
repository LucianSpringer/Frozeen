import { v4 as uuidv4 } from 'uuid';
import { Product, MolecularComposition, Kelvin, BacteriaCount, CATEGORIES } from '../types';

const ADJECTIVES = ['Cryo-Stasis', 'Flash-Frozen', 'Nitrogen-Sealed', 'Zero-Point', 'Quantum-Chilled', 'Hyper-Cooled', 'Absolute-Zero', 'Plasma-Infused'];
const NOUNS = ['Nugget', 'Bovine Slab', 'Poultry Matrix', 'Marine Protein', 'Starch Cylinder', 'Lipid Sphere', 'Amino Block', 'Carbon Lattice'];

// Deterministic Random Number Generator (Linear Congruential Generator)
class EntropySeeder {
    private seed: number;

    constructor(seed: number) {
        this.seed = seed;
    }

    public next(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }

    public nextRange(min: number, max: number): number {
        return min + this.next() * (max - min);
    }
}

const seeder = new EntropySeeder(Date.now());

export class InventoryFabricator {
    private static generateVector(dimensions: number): number[] {
        return Array.from({ length: dimensions }, () => seeder.next());
    }

    private static generateStockTensor(): number[][] {
        // Simulates a 4x4 storage grid for this item
        return Array.from({ length: 4 }, () =>
            Array.from({ length: 4 }, () => Math.floor(seeder.nextRange(0, 50)))
        );
    }

    public static synthesizeBatch(size: number): Product[] {
        const buffer: Product[] = [];

        for (let i = 0; i < size; i++) {
            const adj = ADJECTIVES[Math.floor(seeder.nextRange(0, ADJECTIVES.length))];
            const noun = NOUNS[Math.floor(seeder.nextRange(0, NOUNS.length))];
            const marketingName = `${adj} ${noun} v${Math.floor(seeder.nextRange(1, 5))}.0`;
            const price = Math.floor(seeder.nextRange(15000, 85000));
            const category = CATEGORIES[Math.floor(seeder.nextRange(1, CATEGORIES.length))]; // Skip "Semua"

            buffer.push({
                id: uuidv4(),
                sku: `CRYO-${Math.floor(seeder.nextRange(1000, 9999))}-X`,
                name: marketingName, // Mapped to name for UI compatibility
                category: category,
                description: `Procedurally generated ${marketingName} with enhanced molecular stability.`,
                price: price,
                resellerPrice: Math.floor(price * 0.8),
                image: `https://picsum.photos/seed/${Math.floor(seeder.nextRange(0, 1000))}/400/400`, // Random image
                stock: Math.floor(seeder.nextRange(10, 500)), // Derived from tensor in a real scenario, but simplified here for UI
                weight: Math.floor(seeder.nextRange(200, 1000)),
                minOrder: 1,
                thermodynamics: {
                    melting_point: (273.15 + seeder.nextRange(-20, -5)) as Kelvin,
                    specific_heat_capacity: seeder.nextRange(1.5, 4.2),
                    thermal_conductivity: seeder.nextRange(0.1, 0.5)
                },
                bio_metrics: {
                    initial_bacterial_load: Math.floor(seeder.nextRange(0, 100)) as BacteriaCount,
                    spoilage_vector: this.generateVector(128) // 128-dim vector for "AI Search"
                },
                composition: {
                    protein_helix_integrity: seeder.next(),
                    lipid_oxidation_rate: seeder.next() * 0.01,
                    water_crystal_lattice: seeder.next() > 0.5 ? 'HEXAGONAL' : 'CUBIC'
                },
                stock_tensor: this.generateStockTensor()
            });
        }
        return buffer;
    }
}
