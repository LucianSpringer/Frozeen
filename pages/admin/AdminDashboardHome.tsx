import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Link } from 'react-router-dom';
import {
    DollarSign, ShoppingCart, Users, Package,
    ArrowUpRight, ArrowDownRight, Bell, Search, Menu
} from 'lucide-react';

// Mock Chart Component (Visual Placeholder untuk High Yield)
const SimpleLineChart = () => (
    <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-l border-slate-200 dark:border-slate-700">
        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
            <div key={i} className="w-full bg-sky-500/20 hover:bg-sky-500 transition-all rounded-t-sm relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {h * 1000} Sales
                </div>
            </div>
        ))}
    </div>
);

const AdminDashboardHome: React.FC = () => {
    const { orders, products, users, newOrderIds } = useStore();

    // Kalkulasi Statistik Real-time (Logic Density)
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.date.startsWith(today));
    const totalOmzet = orders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const todayOmzet = todayOrders.reduce((acc, curr) => acc + curr.totalAmount, 0);
    const lowStockProducts = products.filter(p => p.stock < 20);

    const stats = [
        {
            label: 'Omzet Hari Ini',
            value: `Rp ${todayOmzet.toLocaleString('id-ID')}`,
            change: +12.5,
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            label: 'Total Order Hari Ini',
            value: todayOrders.length,
            change: -2.4,
            icon: ShoppingCart,
            color: 'bg-blue-500'
        },
        {
            label: 'Reseller Baru',
            value: users.filter(u => u.role === 'reseller' && u.status === 'pending').length,
            change: +5.0,
            icon: Users,
            color: 'bg-purple-500'
        },
        {
            label: 'Stok Kritis',
            value: lowStockProducts.length,
            change: 0,
            icon: Package,
            color: 'bg-red-500'
        }
    ];

    return (
        <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h2>
                    <p className="text-slate-500 mt-1">Selamat datang kembali, Admin Frozeen.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell className="text-slate-600 dark:text-slate-300 cursor-pointer hover:text-sky-500" />
                        {newOrderIds.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                        )}
                        {newOrderIds.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=Admin+Frozeen" alt="Admin" />
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
                                <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
                            </div>
                            {stat.change !== 0 && (
                                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${stat.change > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {stat.change > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {Math.abs(stat.change)}%
                                </div>
                            )}
                        </div>
                        <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Sales Chart Area */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Analitik Penjualan</h3>
                        <select className="bg-slate-50 dark:bg-slate-700 border-none text-sm rounded-lg px-3 py-1 outline-none cursor-pointer">
                            <option>30 Hari Terakhir</option>
                            <option>7 Hari Terakhir</option>
                            <option>Tahun Ini</option>
                        </select>
                    </div>
                    <SimpleLineChart />
                </div>

                {/* Low Stock Alert */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Stok Menipis</h3>
                        <Link to="/admin/products" className="text-sm text-sky-500 hover:underline">Lihat Semua</Link>
                    </div>
                    <div className="space-y-4">
                        {lowStockProducts.slice(0, 5).map(p => (
                            <div key={p.id} className="flex items-center gap-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                                <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{p.name}</p>
                                    <p className="text-xs text-red-500 font-medium">Sisa: {p.stock} pcs</p>
                                </div>
                                <button className="px-3 py-1 bg-white dark:bg-slate-700 text-xs font-bold rounded shadow-sm hover:bg-slate-50">Restock</button>
                            </div>
                        ))}
                        {lowStockProducts.length === 0 && (
                            <div className="text-center py-8 text-slate-400">
                                <Package size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Semua stok aman!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
