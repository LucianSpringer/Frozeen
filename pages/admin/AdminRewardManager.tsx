import React, { useState } from 'react';
import { useLoyalty } from '../../context/LoyaltyContext';
import {
    Gift, Settings, TrendingUp, Plus, Edit,
    Trash2, Zap, Calendar, Award
} from 'lucide-react';

const AdminRewardManager: React.FC = () => {
    const { rules, updateRules, rewards, addReward } = useLoyalty();
    const [activeTab, setActiveTab] = useState<'rules' | 'rewards' | 'analytics'>('rules');
    const [showAddModal, setShowAddModal] = useState(false);

    // State Form Rules
    const [formRules, setFormRules] = useState(rules);

    const handleSaveRules = () => {
        updateRules(formRules);
        alert('Aturan poin berhasil diperbarui!');
    };

    return (
        <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Award className="text-orange-500" /> Loyalty System Manager
                    </h1>
                    <p className="text-slate-500 text-sm">Atur ekonomi poin dan reward pelanggan.</p>
                </div>
                <div className="flex gap-2">
                    {['rules', 'rewards', 'analytics'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition ${activeTab === tab
                                    ? 'bg-sky-600 text-white shadow-lg'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab: RULES CONFIGURATION */}
            {activeTab === 'rules' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                            <Settings size={20} className="text-slate-400" /> Konfigurasi Dasar
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Earn Rate (Poin per Rp 100k)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={formRules.earnRate}
                                        onChange={e => setFormRules({ ...formRules, earnRate: Number(e.target.value) })}
                                        className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                                    />
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Normal</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bonus Registrasi</label>
                                    <input type="number" value={formRules.registrationBonus} onChange={e => setFormRules({ ...formRules, registrationBonus: Number(e.target.value) })} className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bonus Review</label>
                                    <input type="number" value={formRules.reviewBonus} onChange={e => setFormRules({ ...formRules, reviewBonus: Number(e.target.value) })} className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Masa Berlaku Poin (Bulan)</label>
                                <select
                                    value={formRules.pointExpiryMonths}
                                    onChange={e => setFormRules({ ...formRules, pointExpiryMonths: Number(e.target.value) })}
                                    className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                                >
                                    <option value={6}>6 Bulan</option>
                                    <option value={12}>12 Bulan (1 Tahun)</option>
                                    <option value={24}>24 Bulan (2 Tahun)</option>
                                    <option value={999}>Selamanya</option>
                                </select>
                            </div>

                            <button onClick={handleSaveRules} className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl hover:bg-sky-700 transition mt-4">
                                Simpan Perubahan
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Zap className="text-yellow-300" /> Event Spesial
                        </h3>
                        <p className="text-purple-100 text-sm mb-6">
                            Aktifkan mode event untuk melipatgandakan poin transaksi secara global. Cocok untuk Harbolnas atau Payday Sale.
                        </p>

                        <div className="flex items-center justify-between bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 mb-4">
                            <div>
                                <span className="block font-bold text-lg">Double Point Mode</span>
                                <span className="text-xs text-purple-200">2x Poin untuk semua transaksi</span>
                            </div>
                            <button
                                onClick={() => {
                                    const newState = !formRules.isDoublePointActive;
                                    setFormRules({ ...formRules, isDoublePointActive: newState });
                                    updateRules({ isDoublePointActive: newState });
                                }}
                                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${formRules.isDoublePointActive ? 'bg-green-400' : 'bg-slate-600'}`}
                            >
                                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${formRules.isDoublePointActive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>

                        {formRules.isDoublePointActive && (
                            <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
                                <Calendar size={14} /> Event sedang AKTIF! Jangan lupa matikan setelah periode selesai.
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Tab: REWARD INVENTORY */}
            {activeTab === 'rewards' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Katalog Hadiah</h3>
                        <button onClick={() => setShowAddModal(true)} className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-600 transition">
                            <Plus size={18} /> Tambah Hadiah
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rewards.map(reward => (
                            <div key={reward.id} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden group hover:shadow-lg transition">
                                <div className="h-40 bg-slate-100 dark:bg-slate-700 relative">
                                    <img src={reward.image} alt={reward.name} className="w-full h-full object-contain p-4" />
                                    <div className="absolute top-2 right-2 bg-slate-900/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                        Stok: {reward.stock}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${reward.type.includes('voucher') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {reward.type.replace('_', ' ')}
                                        </span>
                                        <span className="text-orange-500 font-bold flex items-center gap-1">
                                            <Gift size={14} /> {reward.pointsRequired}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{reward.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{reward.description}</p>

                                    <div className="flex gap-2">
                                        <button className="flex-1 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-1">
                                            <Edit size={14} /> Edit
                                        </button>
                                        <button className="flex-1 border border-red-200 dark:border-red-900/30 text-red-500 py-1.5 rounded-lg text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-1">
                                            <Trash2 size={14} /> Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRewardManager;
