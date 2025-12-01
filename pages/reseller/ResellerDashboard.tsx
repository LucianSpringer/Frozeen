import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
    Copy, Wallet, Users, ShoppingBag,
    ChevronRight, Trophy, TrendingUp,
    ExternalLink, MessageCircle, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ResellerDashboard: React.FC = () => {
    const { user, orders } = useStore();
    const [copied, setCopied] = useState(false);

    // Simulasi Data High Yield
    const commissionBalance = user?.walletBalance || 2500000;
    const monthlyTarget = 10000000;
    const currentSpending = orders.reduce((acc, o) => acc + o.totalAmount, 0); // Logic penyederhanaan
    const progressPercent = Math.min((currentSpending / monthlyTarget) * 100, 100);

    const handleCopyReferral = () => {
        navigator.clipboard.writeText(`https://frozeen.id/register?ref=${user?.referralCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-4 md:p-8 pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">

            {/* 1. Header Welcome & Support Floating */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Dashboard Juragan <span className="text-sky-500">{user?.name}</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Pantau bisnismu, kejar targetmu! 🚀
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition font-bold shadow-lg shadow-green-500/30">
                        <MessageCircle size={18} /> Support VIP
                    </button>
                </div>
            </div>

            {/* 2. Stats Cards (Eye Catching) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                {/* Saldo Komisi - The Hero Card */}
                <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/20 rounded-lg"><Wallet size={24} /></div>
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">Update: Realtime</span>
                    </div>
                    <p className="text-sky-100 text-sm">Saldo Komisi Aktif</p>
                    <h3 className="text-3xl font-extrabold mb-4">Rp {commissionBalance.toLocaleString('id-ID')}</h3>
                    <button className="w-full bg-white text-sky-700 font-bold py-2 rounded-lg hover:bg-sky-50 transition flex items-center justify-center gap-2 text-sm">
                        Tarik Dana <ChevronRight size={16} />
                    </button>
                </div>

                {/* Kode Referral */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="text-purple-500" size={20} />
                            <span className="font-bold text-slate-700 dark:text-slate-200">Kode Referral</span>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 flex justify-between items-center mb-3">
                            <code className="font-mono font-bold text-lg text-slate-800 dark:text-white tracking-wider">{user?.referralCode}</code>
                            <button onClick={handleCopyReferral} className="text-slate-400 hover:text-sky-500">
                                {copied ? <span className="text-green-500 text-xs font-bold">Copied!</span> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-green-100 text-green-700 py-2 rounded-lg text-xs font-bold hover:bg-green-200 transition">Share WA</button>
                        <button className="bg-pink-100 text-pink-700 py-2 rounded-lg text-xs font-bold hover:bg-pink-200 transition">Share IG</button>
                    </div>
                </div>

                {/* Total Belanja & Peringkat */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                        <ShoppingBag className="text-orange-500" size={20} />
                        <span className="font-bold text-slate-700 dark:text-slate-200">Performa Bulan Ini</span>
                    </div>
                    <div className="mb-4">
                        <p className="text-xs text-slate-500">Total Belanja Pribadi</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">Rp {currentSpending.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <Trophy size={16} className="text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-700 dark:text-yellow-500">Peringkat #42 Nasional</span>
                    </div>
                </div>

                {/* Downline Stats */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-teal-500" size={20} />
                        <span className="font-bold text-slate-700 dark:text-slate-200">Jaringan Tim</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-xl">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Level 1</p>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-700 rounded-xl">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">45</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold">Level 2</p>
                        </div>
                    </div>
                    <Link to="/reseller/downlines" className="block text-center mt-3 text-xs font-bold text-sky-600 hover:underline">
                        Lihat Detail Tim &rarr;
                    </Link>
                </div>
            </div>

            {/* 3. Monthly Target Gamification */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-4">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <Target className="text-red-500" /> Target Bonus Bulanan
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                            Belanja <b>Rp {(monthlyTarget - currentSpending).toLocaleString('id-ID')}</b> lagi untuk dapatkan <span className="text-orange-500 font-bold">Freezer 100L Gratis!</span>
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-sky-600">{progressPercent.toFixed(1)}%</span>
                        <span className="text-xs text-slate-400 block">Progress</span>
                    </div>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-orange-400 to-red-500 h-full rounded-full transition-all duration-1000 relative"
                        style={{ width: `${progressPercent}%` }}
                    >
                        <div className="absolute top-0 right-0 bottom-0 w-full animate-pulse bg-white/20"></div>
                    </div>
                </div>
            </div>

            {/* 4. Recent Actions & Promo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-900 dark:text-white">Materi Promosi Terbaru</h3>
                        <Link to="/reseller/marketing" className="text-sm text-sky-600 font-bold">Lihat Semua</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group relative rounded-xl overflow-hidden aspect-square bg-slate-100 cursor-pointer">
                                <img src={`https://picsum.photos/seed/promo${i}/300/300`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" alt="Promo" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-2">
                                    <button className="bg-white text-slate-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <ExternalLink size={12} /> Download
                                    </button>
                                    <button className="bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Copy size={12} /> Copy Caption
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">Komunitas</h3>
                    <div className="space-y-3">
                        <button className="w-full p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex items-center gap-3 hover:bg-green-100 transition group">
                            <div className="bg-green-500 text-white p-2 rounded-full group-hover:scale-110 transition"><MessageCircle size={20} /></div>
                            <div className="text-left">
                                <h4 className="font-bold text-green-800 dark:text-green-300">Grup VIP WhatsApp</h4>
                                <p className="text-xs text-green-700 dark:text-green-400">Diskusi & Info Pusat</p>
                            </div>
                        </button>
                        <button className="w-full p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 flex items-center gap-3 hover:bg-purple-100 transition group">
                            <div className="bg-purple-500 text-white p-2 rounded-full group-hover:scale-110 transition"><Users size={20} /></div>
                            <div className="text-left">
                                <h4 className="font-bold text-purple-800 dark:text-purple-300">Kelas Mentoring</h4>
                                <p className="text-xs text-purple-700 dark:text-purple-400">Zoom Tiap Sabtu</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ResellerDashboard;
