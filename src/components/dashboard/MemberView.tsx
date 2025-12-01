'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { useLoyalty } from '@/context/LoyaltyContext';
import { ShoppingBag, Heart, Clock, Gift } from 'lucide-react';
import Link from 'next/link';

const MemberView: React.FC = () => {
    const { user } = useStore();
    const { points, history } = useLoyalty();

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white shadow-lg shadow-sky-500/20 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2">Halo, {user?.name}!</h2>
                    <p className="text-sky-100 mb-6 max-w-lg">
                        Selamat datang kembali di Frozeen Enterprise. Cek promo terbaru dan tukarkan poin Anda hari ini.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/products" className="bg-white text-sky-600 px-6 py-2.5 rounded-full font-bold hover:bg-sky-50 transition shadow-lg">
                            Belanja Sekarang
                        </Link>
                        <Link href="/member/rewards" className="bg-sky-700/50 text-white px-6 py-2.5 rounded-full font-bold hover:bg-sky-700 transition backdrop-blur-sm">
                            Tukar Poin
                        </Link>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mb-16 blur-3xl"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Loyalty Points</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {points.toLocaleString()} XP
                            </h3>
                        </div>
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-lg">
                            <Gift size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Pesanan Aktif</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                2 Pesanan
                            </h3>
                        </div>
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                            <ShoppingBag size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Wishlist</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                12 Item
                            </h3>
                        </div>
                        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 rounded-lg">
                            <Heart size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Belanja</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                Rp 2.5M
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                            <Clock size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Aktivitas Terakhir</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-6">
                        {history.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                                    <Gift size={18} />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">Redeemed Reward</p>
                                    <p className="text-xs text-slate-500">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                <span className="ml-auto font-bold text-red-500">-500 XP</span>
                            </div>
                        ))}
                        {history.length === 0 && (
                            <p className="text-slate-500 text-center py-4">Belum ada aktivitas.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberView;
