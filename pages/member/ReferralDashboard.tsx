import React from 'react';
import { useReferral } from '../../context/ReferralContext';
import { useStore } from '../../context/StoreContext';
import { Users, DollarSign, Share2, TrendingUp, Award, ChevronRight } from 'lucide-react';

const ReferralDashboard: React.FC = () => {
    const { user } = useStore();
    const { commissions, totalReferralEarnings, downlineCount } = useReferral();

    return (
        <div className="p-4 md:p-8 pt-24 min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Program Partner Frozeen</h1>
                            <p className="text-blue-100 max-w-lg">
                                Dapatkan passive income seumur hidup! Komisi 5% dari belanja Level 1 dan 2% dari belanja Level 2.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center min-w-[200px]">
                            <p className="text-xs uppercase tracking-widest text-blue-200 mb-1">Total Pendapatan</p>
                            <h2 className="text-3xl font-extrabold">Rp {totalReferralEarnings.toLocaleString('id-ID')}</h2>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Users size={20} /></div>
                            <span className="font-bold text-slate-700 dark:text-slate-200">Tim Level 1</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{downlineCount.level1} <span className="text-sm text-slate-400 font-normal">Member</span></p>
                        <p className="text-xs text-green-500 mt-1 font-medium flex items-center gap-1"><TrendingUp size={12} /> Komisi 5%</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><Users size={20} /></div>
                            <span className="font-bold text-slate-700 dark:text-slate-200">Tim Level 2</span>
                        </div>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{downlineCount.level2} <span className="text-sm text-slate-400 font-normal">Member</span></p>
                        <p className="text-xs text-green-500 mt-1 font-medium flex items-center gap-1"><TrendingUp size={12} /> Komisi 2%</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><Share2 size={20} /></div>
                            <span className="font-bold text-slate-700 dark:text-slate-200">Kode Referral</span>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg text-center border border-dashed border-slate-300 dark:border-slate-600 mb-2">
                            <code className="text-xl font-bold text-sky-600">{user?.referralCode || 'GENERATE'}</code>
                        </div>
                        <button className="w-full bg-sky-600 text-white py-2 rounded-lg text-xs font-bold hover:bg-sky-700 transition">
                            Salin Link Ajak Teman
                        </button>
                    </div>
                </div>

                {/* Commission Table */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Riwayat Komisi Masuk</h3>
                        <button className="text-sky-600 text-sm font-bold hover:underline">Download Laporan</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-700">
                                <tr>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Tanggal</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Sumber (Downline)</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Level</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 text-right">Jumlah</th>
                                    <th className="p-4 text-xs font-bold uppercase text-slate-500 dark:text-slate-400 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {commissions.length > 0 ? commissions.map((comm) => (
                                    <tr key={comm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="p-4 text-sm text-slate-600 dark:text-slate-300">
                                            {new Date(comm.date).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">
                                            User #{comm.sourceUserId.substring(0, 8)}...
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${comm.level === 1 ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                                Level {comm.level}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm font-bold text-right text-green-600">
                                            +Rp {comm.amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                                {comm.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-500">
                                            Belum ada komisi. Yuk mulai ajak teman!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReferralDashboard;
