'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';

// Define types locally or import
interface LoyaltyReward {
    id: string;
    name: string;
    pointsCost: number;
    description: string;
    image: string;
}

interface LoyaltyContextType {
    points: number;
    rewards: LoyaltyReward[];
    redeemReward: (rewardId: string) => void;
    history: any[];
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useStore();
    const [points, setPoints] = useState(0);
    const [rewards, setRewards] = useState<LoyaltyReward[]>([]);
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            setPoints(user.rewardPoints || 0);
            // Mock rewards
            setRewards([
                { id: 'r1', name: 'Free Shipping Voucher', pointsCost: 500, description: 'Free shipping up to 2kg', image: 'voucher.png' },
                { id: 'r2', name: '50k Discount', pointsCost: 1000, description: 'Direct discount on checkout', image: 'discount.png' },
            ]);
        }
    }, [user]);

    const redeemReward = (rewardId: string) => {
        const reward = rewards.find(r => r.id === rewardId);
        if (reward && points >= reward.pointsCost) {
            setPoints(prev => prev - reward.pointsCost);
            setHistory(prev => [...prev, { id: Date.now(), rewardId, date: new Date().toISOString() }]);
            alert(`Redeemed ${reward.name}!`);
        } else {
            alert('Insufficient points');
        }
    };

    return (
        <LoyaltyContext.Provider value={{ points, rewards, redeemReward, history }}>
            {children}
        </LoyaltyContext.Provider>
    );
};

export const useLoyalty = () => {
    const context = useContext(LoyaltyContext);
    if (context === undefined) throw new Error('useLoyalty must be used within LoyaltyProvider');
    return context;
};
