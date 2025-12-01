import { Product } from '@/types';

export class InventoryFabricator {
    private static categories = ['Frozen Food', 'Beverages', 'Desserts', 'Ingredients'];
    private static adjectives = ['Premium', 'Spicy', 'Sweet', 'Savory', 'Organic', 'Crispy'];
    private static nouns = ['Nugget', 'Sausage', 'Dumpling', 'Juice', 'Ice Cream', 'Patty'];

    private static generateId(): string {
        return Math.random().toString(36).substring(2, 15);
    }

    private static generateStockTensor(): number[][] {
        // Simulates a 3D stock distribution tensor (simplified to 2D for now)
        const tensor: number[][] = [];
        for (let i = 0; i < 3; i++) {
            const row: number[] = [];
            for (let j = 0; j < 3; j++) {
                row.push(Math.floor(Math.random() * 100));
            }
            tensor.push(row);
        }
        return tensor;
    }

    public static synthesizeBatch(count: number): any[] { // Use any[] temporarily to bypass strict type check if needed, or cast
        const buffer: any[] = [];
        for (let i = 0; i < count; i++) {
            const category = this.categories[Math.floor(Math.random() * this.categories.length)];
            const name = `${this.adjectives[Math.floor(Math.random() * this.adjectives.length)]} ${this.nouns[Math.floor(Math.random() * this.nouns.length)]}`;

            buffer.push({
                id: this.generateId(),
                sku: `GEN-${Math.floor(Math.random() * 10000)}`,
                name: name,
                category: category,
                description: `Procedurally generated ${name} with high-fidelity textures.`,
                price: Math.floor(Math.random() * 50000) + 10000,
                resellerPrice: Math.floor(Math.random() * 40000) + 8000,
                image: 'https://placehold.co/400', // Placeholder
                stock: 100, // Simple stock number for UI
                weight: Math.floor(Math.random() * 1000) + 200,
                minOrder: 1,

                // Scientific Data
                thermodynamics: {
                    melting_point: 273.15 + Math.random() * 10,
                    specific_heat_capacity: 4.18,
                    thermal_conductivity: 0.6
                },
                bio_metrics: {
                    initial_bacterial_load: Math.floor(Math.random() * 1000),
                    spoilage_vector: [0.1, 0.2, 0.3]
                },
                composition: {
                    protein_helix_integrity: 0.9,
                    lipid_oxidation_rate: 0.01,
                    water_crystal_lattice: 'HEXAGONAL'
                },
                stock_tensor: this.generateStockTensor()
            });
        }
        return buffer;
    }
}
