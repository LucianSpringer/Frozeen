import { User, Order, Product } from '../types';

// Virtual Types untuk Engine
export interface PointTransaction {
    id: string;
    userId: string;
    amount: number;
    type: 'earn' | 'redeem' | 'expire' | 'bonus' | 'referral';
    description: string;
    date: string;
    expiryDate?: string;
}

export interface Commission {
    id: string;
    uplineId: string;
    sourceUserId: string; // Downline
    level: 1 | 2;
    amount: number;
    date: string;
    status: 'pending' | 'paid';
}

export class RewardEngine {
    private static instance: RewardEngine;

    // Konfigurasi Konstanta (Admin Configurable di Real App)
    private readonly POINTS_PER_100K = 100;
    private readonly LEVEL_1_COMMISSION = 0.05; // 5%
    private readonly LEVEL_2_COMMISSION = 0.02; // 2%
    private readonly RECRUIT_BONUS = 25000;
    private readonly EXPIRY_MONTHS = 6;

    // In-Memory Storage (Simulasi DB)
    private transactions: PointTransaction[] = [];
    private commissions: Commission[] = [];

    private constructor() { }

    public static getInstance(): RewardEngine {
        if (!RewardEngine.instance) {
            RewardEngine.instance = new RewardEngine();
        }
        return RewardEngine.instance;
    }

    // --- CORE LOGIC: ORDER COMPLETION ---

    public processOrderCompletion(order: Order, buyer: User, allUsers: User[]): { pointsEarned: number, commissions: Commission[] } {
        console.log(`[RewardEngine] Processing Order #${order.id} for User ${buyer.name}`);

        // 1. Hitung Poin Belanja
        const points = Math.floor(order.totalAmount / 100000) * this.POINTS_PER_100K;
        this.addPoints(buyer.id, points, `Belanja #${order.id}`);

        // 2. Hitung Referral (MLM Logic)
        const newCommissions: Commission[] = [];

        // Level 1 Upline
        if (buyer.uplineId) {
            const upline1 = allUsers.find(u => u.id === buyer.uplineId);
            if (upline1) {
                const comm1 = order.totalAmount * this.LEVEL_1_COMMISSION;
                newCommissions.push(this.createCommission(upline1.id, buyer.id, 1, comm1));

                // Level 2 Upline (Upline dari Upline)
                if (upline1.uplineId) {
                    const upline2 = allUsers.find(u => u.id === upline1.uplineId);
                    if (upline2) {
                        const comm2 = order.totalAmount * this.LEVEL_2_COMMISSION;
                        newCommissions.push(this.createCommission(upline2.id, buyer.id, 2, comm2));
                    }
                }
            }
        }

        return { pointsEarned: points, commissions: newCommissions };
    }

    // --- HELPER METHODS ---

    private addPoints(userId: string, amount: number, desc: string) {
        const tx: PointTransaction = {
            id: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            userId,
            amount,
            type: amount > 0 ? 'earn' : 'redeem',
            description: desc,
            date: new Date().toISOString(),
            expiryDate: amount > 0 ? this.calculateExpiry() : undefined
        };
        this.transactions.push(tx);
        // Di real app, simpan ke DB di sini
    }

    private createCommission(uplineId: string, downlineId: string, level: 1 | 2, amount: number): Commission {
        const comm: Commission = {
            id: `COM-${Date.now()}-${Math.random()}`,
            uplineId,
            sourceUserId: downlineId,
            level,
            amount,
            date: new Date().toISOString(),
            status: 'pending'
        };
        this.commissions.push(comm);
        return comm;
    }

    private calculateExpiry(): string {
        const d = new Date();
        d.setMonth(d.getMonth() + this.EXPIRY_MONTHS);
        return d.toISOString();
    }

    // --- CRON JOB SIMULATION ---

    public runExpiryCheck(): number {
        console.log('[RewardEngine] Running Monthly Expiry Check...');
        const now = new Date();
        let expiredCount = 0;

        // Filter transaksi 'earn' yang belum redeem dan sudah lewat expiryDate
        // (Logic penyederhanaan untuk demo: anggap saldo global dikurangi jika ada batch kadaluarsa)
        // Implementasi real membutuhkan FIFO (First-In First-Out) ledger.

        return expiredCount;
    }

    // --- PUBLIC GETTERS (API Simulation) ---

    public getTransactions(userId: string) {
        return this.transactions.filter(t => t.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    public getCommissions(userId: string) {
        return this.commissions.filter(c => c.uplineId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    public getBalance(userId: string): number {
        return this.transactions
            .filter(t => t.userId === userId)
            .reduce((sum, t) => sum + t.amount, 0);
    }
}
