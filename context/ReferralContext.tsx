import React, { createContext, useContext, useState, useEffect } from 'react';
import { useStore } from './StoreContext';
import { RewardEngine, Commission, PointTransaction } from '../lib/RewardEngine';

interface ReferralContextType {
    commissions: Commission[];
    pointHistory: PointTransaction[];
    pointsBalance: number;
    totalReferralEarnings: number;
    downlineCount: { level1: number, level2: number };
    refreshData: () => void;
    processNewOrder: (orderId: string, totalAmount: number) => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider = ({ children }: { children: React.ReactNode }) => {
    const { user, users, orders } = useStore(); // Mengambil data global
    const engine = RewardEngine.getInstance();

    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [pointHistory, setPointHistory] = useState<PointTransaction[]>([]);
    const [pointsBalance, setPointsBalance] = useState(0);

    const refreshData = () => {
        if (user) {
            setCommissions(engine.getCommissions(user.id));
            setPointHistory(engine.getTransactions(user.id));
            setPointsBalance(engine.getBalance(user.id));
        }
    };

    // Simulasi Load Data Awal
    useEffect(() => {
        refreshData();
    }, [user]);

    // Kalkulasi Statistik Downline (Real-time Calculation)
    const getDownlineStats = () => {
        if (!user) return { level1: 0, level2: 0 };

        const level1 = users.filter(u => u.uplineId === user.id);
        const level1Ids = level1.map(u => u.id);
        const level2 = users.filter(u => u.uplineId && level1Ids.includes(u.uplineId));

        return { level1: level1.length, level2: level2.length };
    };

    // Wrapper function untuk trigger engine saat order selesai
    const processNewOrder = (orderId: string, totalAmount: number) => {
        // Di real app, ini dipanggil via Webhook atau Server Action
        // Di sini kita panggil langsung engine
        if (!user) return;

        // Simulasi order object
        const mockOrder: any = { id: orderId, totalAmount };
        engine.processOrderCompletion(mockOrder, user, users);
        refreshData();
    };

    const totalReferralEarnings = commissions.reduce((sum, c) => sum + c.amount, 0);

    return (
        <ReferralContext.Provider value={{
            commissions,
            pointHistory,
            pointsBalance,
            totalReferralEarnings,
            downlineCount: getDownlineStats(),
            refreshData,
            processNewOrder
        }}>
            {children}
        </ReferralContext.Provider>
    );
};

export const useReferral = () => {
    const context = useContext(ReferralContext);
    if (!context) throw new Error("useReferral must be used within ReferralProvider");
    return context;
};
