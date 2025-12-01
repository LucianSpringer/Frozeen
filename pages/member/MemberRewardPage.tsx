import React from 'react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { useStore } from '../../context/StoreContext';
import { Gift, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const MemberRewardPage: React.FC = () => {
    const { user } = useStore();
    const { pointsBalance, rewards, transactions, redeemReward } = useLoyalty();

    const handleRedeem = (rewardId: string) => {
        if (!user) return;
        if (window.confirm('Yakin ingin menukarkan poin Anda dengan hadiah ini?')) {
            const success = redeemReward(user.id, rewardId);
            if (success) {
                alert('Penukaran berhasil! Cek "Reward Saya" atau Email Anda.');
            } else {
                alert('Poin tidak cukup atau stok habis.');
            }
        }
    };

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-12 px-4 md:px-8">

            {/* Hero Stats */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-3xl p-8 text-white shadow-xl mb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                <div className="relative z-10 text-center">
                    <p className="text-orange-100 font-medium mb-2 uppercase tracking-widest text-xs">Loyalty Points</p>
                    <h1 className="text-5xl font-extrabold mb-4">{pointsBalance.toLocaleString('id-ID')} <span className="text-2xl">pts</span></h1>
                    <p className="text-sm opacity-90 max-w-md mx-auto">
                        Kumpulkan terus poinmu dari setiap transaksi. 100 Poin = Rp 1.000 (Setara Cashback 1%).
                    </p>
                    <div className="mt-6 flex justify-center gap-4 text-sm">
                        <button className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition flex items-center gap-2">
                            <Clock size={16} /> Riwayat Poin
                        </button>
                        <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-bold hover:scale-105 transition shadow-lg">
                            Cara Dapat Poin?
                        </button>
                    </div>
                </div>
            </div>

            {/* Rewards Grid */}
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Gift className="text-sky-500" /> Tukarkan Hadiah
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {rewards.map(reward => {
                    const canRedeem = pointsBalance >= reward.pointsRequired && reward.stock > 0;
                    return (
                        <div key={reward.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col group hover:border-orange-200 transition-all">
                            <div className="h-40 bg-slate-50 dark:bg-slate-700 rounded-xl mb-4 relative overflow-hidden">
                                <img src={reward.image} alt={reward.name} className="w-full h-full object-contain p-4 group-hover:scale-110 transition duration-500" />
                                {reward.stock < 10 && (
                                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">
                                        Sisa {reward.stock}!
                                    </span>
                                )}
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">{reward.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{reward.description}</p>

                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-orange-500 font-extrabold">{reward.pointsRequired} Poin</span>
                                <button
                                    onClick={() => handleRedeem(reward.id)}
                                    disabled={!canRedeem}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition ${canRedeem
                                            ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-md shadow-sky-200'
                                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {canRedeem ? 'Tukar' : 'Kurang'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Transaction History (Ledger View) */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Riwayat Transaksi Poin</h3>
                <div className="space-y-4">
                    {transactions.slice(0, 5).map(tx => (
                        <div key={tx.id} className="flex items-center justify-between border-b border-slate-50 dark:border-slate-700 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {tx.amount > 0 ? <CheckCircle size={20} /> : <Gift size={20} />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-white text-sm">{tx.description}</p>
                                    <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()} • {new Date(tx.date).toLocaleTimeString()}</p>
                                </div>
                            </div>
                            <span className={`font-mono font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount} pts
                            </span>
                        </div>
                    ))}
                    {transactions.length === 0 && (
                        <div className="text-center py-8 text-slate-400 text-sm">Belum ada riwayat poin. Yuk belanja sekarang!</div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MemberRewardPage;
