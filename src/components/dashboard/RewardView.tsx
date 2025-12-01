'use client';

import React from 'react';
import { useLoyalty } from '@/context/LoyaltyContext';
import { Gift, Star, Clock } from 'lucide-react';

const RewardView: React.FC = () => {
    const { points, rewards, redeemReward, history } = useLoyalty();

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <Star className="text-yellow-200 animate-pulse" fill="currentColor" />
                        <h2 className="text-3xl font-bold">Loyalty Points</h2>
                    </div>
                    <h1 className="text-5xl font-extrabold mb-4">{points.toLocaleString()} XP</h1>
                    <p className="text-orange-100 max-w-lg">
                        Tukarkan poin Anda dengan voucher belanja, diskon spesial, atau produk gratis.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                        <Gift className="text-sky-500" /> Katalog Hadiah
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {rewards.map((reward) => (
                            <div key={reward.id} className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition group">
                                <div className="aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg mb-4 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold bg-slate-200 dark:bg-slate-600">
                                        {reward.image}
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                        {reward.pointsCost} XP
                                    </div>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{reward.name}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">{reward.description}</p>
                                <button
                                    onClick={() => redeemReward(reward.id)}
                                    disabled={points < reward.pointsCost}
                                    className={`w-full py-2.5 rounded-lg font-bold text-sm transition ${points >= reward.pointsCost
                                            ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-lg shadow-sky-500/30'
                                            : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {points >= reward.pointsCost ? 'Tukar Sekarang' : 'Poin Kurang'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                        <Clock className="text-orange-500" /> Riwayat Penukaran
                    </h3>
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
                        <div className="space-y-4">
                            {history.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 pb-4 border-b border-slate-50 dark:border-slate-700 last:border-0 last:pb-0">
                                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0">
                                        <Gift size={14} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">Redeem Reward</p>
                                        <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                    <span className="ml-auto text-sm font-bold text-red-500">-{rewards.find(r => r.id === item.rewardId)?.pointsCost || '???'} XP</span>
                                </div>
                            ))}
                            {history.length === 0 && (
                                <div className="text-center py-8 text-slate-400 text-sm">
                                    Belum ada riwayat penukaran.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardView;
