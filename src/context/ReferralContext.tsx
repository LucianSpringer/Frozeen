'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { RewardEngine } from '@/lib/RewardEngine';

interface ReferralContextType {
    referralCode: string;
    downlines: any[];
    earnings: number;
    generateCode: () => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useStore();
    const [referralCode, setReferralCode] = useState('');
    const [downlines, setDownlines] = useState<any[]>([]);
    const [earnings, setEarnings] = useState(0);

    useEffect(() => {
        if (user) {
            setReferralCode(user.referralCode || '');
            // Mock downlines
            setDownlines([
                { id: 'd1', name: 'Downline 1', joinedAt: '2023-01-01', totalSales: 500000 },
                { id: 'd2', name: 'Downline 2', joinedAt: '2023-02-01', totalSales: 1200000 },
            ]);
            setEarnings(150000); // Mock earnings
        }
    }, [user]);

    const generateCode = () => {
        if (user && !referralCode) {
            const newCode = (user.name.substring(0, 3) + Math.floor(Math.random() * 1000)).toUpperCase();
            setReferralCode(newCode);
            // In real app, save to DB
        }
    };

    return (
        <ReferralContext.Provider value={{ referralCode, downlines, earnings, generateCode }}>
            {children}
        </ReferralContext.Provider>
    );
};

export const useReferral = () => {
    const context = useContext(ReferralContext);
    if (context === undefined) throw new Error("useReferral must be used within ReferralProvider");
    return context;
};
