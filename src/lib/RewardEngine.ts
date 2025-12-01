// src/lib/RewardEngine.ts
// CORE LOGIC: MLM Commission & Point Ledger System

export interface PointTransaction {
    id: string;
    userId: string;
    amount: number;
    type: 'earn' | 'redeem' | 'expire';
    date: string;
}

export class RewardEngine {
    private static instance: RewardEngine;
    private readonly POINTS_PER_100K = 100;
    private readonly LEVEL_1_COMMISSION = 0.05;
    private readonly LEVEL_2_COMMISSION = 0.02;

    private constructor() { }

    public static getInstance(): RewardEngine {
        if (!RewardEngine.instance) {
            RewardEngine.instance = new RewardEngine();
        }
        return RewardEngine.instance;
    }

    public calculateCommission(orderAmount: number, level: 1 | 2): number {
        if (level === 1) return Math.floor(orderAmount * this.LEVEL_1_COMMISSION);
        if (level === 2) return Math.floor(orderAmount * this.LEVEL_2_COMMISSION);
        return 0;
    }

    public processPoints(userId: string, orderAmount: number): PointTransaction {
        const points = Math.floor(orderAmount / 100000) * this.POINTS_PER_100K;
        return {
            id: `TX-${Date.now().toString(16).toUpperCase()}`,
            userId,
            amount: points,
            type: 'earn',
            date: new Date().toISOString()
        };
    }
}
