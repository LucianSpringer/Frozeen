'use client';

import React from 'react';
import { useReferral } from '@/context/ReferralContext';
import { Copy, Users, TrendingUp } from 'lucide-react';

const ReferralView: React.FC = () => {
    const { referralCode, downlines, earnings, generateCode } = useReferral();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralCode);
        alert('Kode referral disalin!');
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg shadow-purple-500/20">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Program Partner</h2>
                        <p className="text-purple-100 max-w-lg">
                            Ajak teman bergabung dan dapatkan komisi seumur hidup dari setiap transaksi mereka.
                        </p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20 text-center min-w-[200px]">
                        <p className="text-sm text-purple-200 mb-1">Total Komisi</p>
                        <h3 className="text-2xl font-bold">Rp {earnings.toLocaleString()}</h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Kode Referral Anda</h3>
                    {referralCode ? (
                        <div className="flex gap-2">
                            <div className="flex-1 bg-slate-100 dark:bg-slate-900 p-3 rounded-lg font-mono text-center text-lg font-bold tracking-widest border border-slate-200 dark:border-slate-700">
                                {referralCode}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition"
                            >
                                <Copy size={24} />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={generateCode}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
                        >
                            Generate Kode Referral
                        </button>
                    )}
                    <p className="text-xs text-slate-500 mt-3 text-center">
                        Bagikan kode ini kepada calon reseller atau member baru.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Statistik Jaringan</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-2 text-blue-600">
                                <Users size={18} />
                                <span className="font-bold text-sm">Total Downline</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{downlines.length}</p>
                        </div>
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-2 text-green-600">
                                <TrendingUp size={18} />
                                <span className="font-bold text-sm">Active Rate</span>
                            </div>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">85%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Daftar Downline</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-medium">
                            <tr>
                                <th className="px-6 py-4">Nama</th>
                                <th className="px-6 py-4">Bergabung</th>
                                <th className="px-6 py-4">Omzet</th>
                                <th className="px-6 py-4">Komisi Anda</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {downlines.map((d) => (
                                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{d.name}</td>
                                    <td className="px-6 py-4">{d.joinedAt}</td>
                                    <td className="px-6 py-4">Rp {d.totalSales.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-green-600 font-bold">
                                        Rp {(d.totalSales * 0.05).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {downlines.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-400">
                                        Belum ada data. Mulai ajak teman!
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

export default ReferralView;
