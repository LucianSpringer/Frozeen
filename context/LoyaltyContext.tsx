import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoyaltyReward, PointTransaction, LoyaltyRule } from '../types';
import { useStore } from './StoreContext';

interface LoyaltyContextType {
    pointsBalance: number;
    transactions: PointTransaction[];
    rewards: LoyaltyReward[];
    rules: LoyaltyRule;
    // Actions
    earnPoints: (userId: string, amount: number, source: string, refId?: string) => void;
    redeemReward: (userId: string, rewardId: string) => boolean;
    addReward: (reward: LoyaltyReward) => void;
    updateRules: (newRules: Partial<LoyaltyRule>) => void;
    calculatePotentialPoints: (purchaseAmount: number) => number;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

// Default Rules
const DEFAULT_RULES: LoyaltyRule = {
    earnRate: 100, // 100 poin per 100rb
    registrationBonus: 1000,
    reviewBonus: 200,
    referralBonus: 2500,
    birthdayBonus: 5000,
    pointExpiryMonths: 12,
    isDoublePointActive: false,
};

// Mock Rewards Database
const MOCK_REWARDS: LoyaltyReward[] = [
    {
        id: 'r1', name: 'Voucher Diskon 10rb', description: 'Potongan belanja tanpa min. pembelian',
        pointsRequired: 1000, type: 'voucher_discount', value: 10000, stock: 9999,
        image: 'https://cdn-icons-png.flaticon.com/512/726/726476.png', isActive: true
    },
    {
        id: 'r2', name: 'Gratis Ongkir (Jawa)', description: 'Subsidi ongkir s/d 20rb',
        pointsRequired: 2500, type: 'voucher_shipping', value: 20000, stock: 9999,
        image: 'https://cdn-icons-png.flaticon.com/512/411/411763.png', isActive: true
    },
    {
        id: 'r3', name: 'Freezer Mini 100L', description: 'Freezer box hemat listrik',
        pointsRequired: 150000, type: 'physical_item', stock: 5,
        image: 'https://cdn-icons-png.flaticon.com/512/3081/3081840.png', isActive: true, minTier: 'gold'
    }
];

export const LoyaltyProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useStore();
    const [rewards, setRewards] = useState<LoyaltyReward[]>(MOCK_REWARDS);
    const [transactions, setTransactions] = useState<PointTransaction[]>([]);
    const [rules, setRules] = useState<LoyaltyRule>(DEFAULT_RULES);

    // Helper: Hitung Saldo Aktif
    const pointsBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);

    const calculatePotentialPoints = (amount: number) => {
        const basePoints = Math.floor(amount / 100000) * rules.earnRate;
        return rules.isDoublePointActive ? basePoints * 2 : basePoints;
    };

    const earnPoints = (userId: string, amount: number, source: string, refId?: string) => {
        const newTx: PointTransaction = {
            id: `TX-${Date.now()}`,
            userId,
            type: 'earn',
            amount,
            description: source,
            date: new Date().toISOString(),
            referenceId: refId,
            expiryDate: new Date(new Date().setMonth(new Date().getMonth() + rules.pointExpiryMonths)).toISOString()
        };
        setTransactions(prev => [newTx, ...prev]);
    };

    const redeemReward = (userId: string, rewardId: string): boolean => {
        const reward = rewards.find(r => r.id === rewardId);
        if (!reward) return false;
        if (pointsBalance < reward.pointsRequired) return false;
        if (reward.stock <= 0) return false;

        // Deduksi Poin
        const newTx: PointTransaction = {
            id: `TX-${Date.now()}`,
            userId,
            type: 'redeem',
            amount: -reward.pointsRequired,
            description: `Penukaran: ${reward.name}`,
            date: new Date().toISOString()
        };

        // Update Stock (Jika fisik)
        if (reward.type === 'product' || reward.type === 'physical_item') {
            setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, stock: r.stock - 1 } : r));
        }

        setTransactions(prev => [newTx, ...prev]);
        return true;
    };

    const addReward = (reward: LoyaltyReward) => {
        setRewards(prev => [...prev, reward]);
    };

    const updateRules = (newRules: Partial<LoyaltyRule>) => {
        setRules(prev => ({ ...prev, ...newRules }));
    };

    return (
        <LoyaltyContext.Provider value={{
            pointsBalance, transactions, rewards, rules,
            earnPoints, redeemReward, addReward, updateRules, calculatePotentialPoints
        }}>
            {children}
        </LoyaltyContext.Provider>
    );
};

export const useLoyalty = () => {
    const context = useContext(LoyaltyContext);
    if (context === undefined) throw new Error('useLoyalty must be used within LoyaltyProvider');
    return context;
};
