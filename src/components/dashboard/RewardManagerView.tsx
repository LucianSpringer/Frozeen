'use client';

import React, { useState } from 'react';
import { useLoyalty } from '@/context/LoyaltyContext';
import { Plus, Trash2, Edit2, Gift } from 'lucide-react';

const RewardManagerView: React.FC = () => {
    const { rewards } = useLoyalty();
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manajemen Reward</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-sky-600 transition flex items-center gap-2"
                >
                    <Plus size={20} /> Tambah Reward
                </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-medium">
                            <tr>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Nama Reward</th>
                                <th className="px-6 py-4">Deskripsi</th>
                                <th className="px-6 py-4">Cost (XP)</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {rewards.map((reward) => (
                                <tr key={reward.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500">
                                            {reward.image}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{reward.name}</td>
                                    <td className="px-6 py-4 max-w-xs truncate">{reward.description}</td>
                                    <td className="px-6 py-4 font-bold text-orange-500">{reward.pointsCost} XP</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition">
                                                <Edit2 size={18} />
                                            </button>
                                            <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {rewards.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                        Belum ada reward yang dikonfigurasi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Placeholder Modal */}
            {isAdding && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
                        <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Tambah Reward Baru</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Nama Reward</label>
                                <input type="text" className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="Contoh: Voucher 50rb" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Poin Cost</label>
                                <input type="number" className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900" placeholder="1000" />
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setIsAdding(false)} className="flex-1 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700">Batal</button>
                                <button onClick={() => setIsAdding(false)} className="flex-1 py-2 rounded-lg font-bold bg-sky-500 text-white hover:bg-sky-600">Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RewardManagerView;
