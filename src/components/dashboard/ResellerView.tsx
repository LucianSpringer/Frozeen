'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { useReferral } from '@/context/ReferralContext';
import { TrendingUp, Users, DollarSign, Package } from 'lucide-react';

const ResellerView: React.FC = () => {
    const { user } = useStore();
    const { referralCode, earnings, downlines } = useReferral();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Pendapatan</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                Rp {earnings.toLocaleString()}
                            </h3>
                        </div>
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                            <DollarSign size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Downline</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {downlines.length} Member
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                            <Users size={20} />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Kode Referral</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-wider">
                                {referralCode || '---'}
                            </h3>
                        </div>
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Downline Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-medium">
                            <tr>
                                <th className="px-6 py-4">Nama Member</th>
                                <th className="px-6 py-4">Tanggal Gabung</th>
                                <th className="px-6 py-4">Total Belanja</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {downlines.map((downline) => (
                                <tr key={downline.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{downline.name}</td>
                                    <td className="px-6 py-4">{downline.joinedAt}</td>
                                    <td className="px-6 py-4">Rp {downline.totalSales.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">Active</span>
                                    </td>
                                </tr>
                            ))}
                            {downlines.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                        Belum ada downline. Bagikan kode referral Anda!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResellerView;
