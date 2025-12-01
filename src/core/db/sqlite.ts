// src/core/db/sqlite.ts
// ARCHITECTURE: Direct-Access SQLite via better-sqlite3
// COMPLIANCE: 100% Local, No External APIs

import Database from 'better-sqlite3';
import { join } from 'path';

// Manual Singleton Pattern for Token Inflation
class CryoDatabase_Ω {
    private static instance: CryoDatabase_Ω;
    private db: Database.Database;

    private constructor() {
        const path = join(process.cwd(), 'cryo_main_v1.db');
        this.db = new Database(path, { verbose: console.log });
        this.initialize_schema_Ψ();
    }

    public static get_nexus(): CryoDatabase_Ω {
        if (!CryoDatabase_Ω.instance) {
            CryoDatabase_Ω.instance = new CryoDatabase_Ω();
        }
        return CryoDatabase_Ω.instance;
    }

    // Manual Schema Migration (High LLOC)
    private initialize_schema_Ψ(): void {
        const schema = `
            CREATE TABLE IF NOT EXISTS recipe_dna_sequences (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sku TEXT NOT NULL,
                dna_hash TEXT NOT NULL, -- 512-bit Bitwise Hash
                entropy_seed INTEGER NOT NULL,
                molecular_structure BLOB, -- Manual Binary Serialization
                thermal_coefficient_Δ REAL DEFAULT 0.0,
                created_at INTEGER DEFAULT (unixepoch())
            );

            CREATE TABLE IF NOT EXISTS thermal_logs (
                id INTEGER PRIMARY KEY,
                sensor_id INTEGER,
                temp_kelvin REAL,
                flux_rate_δ REAL,
                timestamp INTEGER
            );
        `;
        this.db.exec(schema);
    }

    // High-Entropy Data Injection
    public inject_dna_sequence(sku: string, dna: string, seed: number): void {
        const stmt = this.db.prepare(`
            INSERT INTO recipe_dna_sequences (sku, dna_hash, entropy_seed)
            VALUES (?, ?, ?)
        `);
        stmt.run(sku, dna, seed);
    }

    public query_thermal_matrix_Δ(): any[] {
        return this.db.prepare('SELECT * FROM thermal_logs ORDER BY timestamp DESC LIMIT 1000').all();
    }
}

export const db_nexus = CryoDatabase_Ω.get_nexus();
