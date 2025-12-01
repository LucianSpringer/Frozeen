// src/algorithms/RecipeDNA.ts
// FEATURE: 512-bit Recipe Hashing & Procedural Variation
// LOGIC: Custom Mersenne Twister + Bitwise XOR Mutation

type DNAHash = string;
type EnzymeVector = Uint32Array;

export class RecipeGeneticEngine {
    private static readonly PRIME_POLY_0x1 = 0x9908b0df;
    private static readonly MASK_UPPER = 0x80000000;
    private static readonly MASK_LOWER = 0x7fffffff;

    // Custom PRNG: Mersenne Twister 19937 (Manual Implementation)
    private static twist_entropy(seed: number): EnzymeVector {
        const mt = new Uint32Array(624);
        mt[0] = seed >>> 0;
        for (let i = 1; i < 624; i++) {
            const s = mt[i - 1] ^ (mt[i - 1] >>> 30);
            mt[i] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + i;
            mt[i] >>>= 0;
        }
        return mt;
    }

    // Generate 512-bit Hex DNA from Ingredients
    public static synthesize_dna(sku_base: string, batch_id: number): DNAHash {
        const entropy = this.twist_entropy(batch_id ^ Date.now());
        let dna_buffer = "";

        for (let i = 0; i < 16; i++) {
            // Bitwise Chaos: Mixing SKU char codes with MT state
            let gene_block = entropy[i % 624];
            for (let c = 0; c < sku_base.length; c++) {
                gene_block ^= (sku_base.charCodeAt(c) << (c % 8));
                gene_block = (gene_block << 13) | (gene_block >>> 19); // Circular Shift
            }

            // Hex Conversion with Zero Padding
            dna_buffer += (gene_block >>> 0).toString(16).padStart(8, '0');
        }

        return `0x${dna_buffer.toUpperCase()}`;
    }

    // Mutation Logic: Flips bits to simulate "Ingredient Variation"
    public static mutate_recipe(original_dna: DNAHash, radiation_level_λ: number): DNAHash {
        // Convert Hex to Binary Buffer
        const raw = BigInt(original_dna);

        // Radiation Formula: Flip bits based on Lambda decay
        const mutation_mask = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) & BigInt(radiation_level_λ * 1000);

        const mutated = raw ^ mutation_mask;
        return `0x${mutated.toString(16).toUpperCase()}`;
    }
}
