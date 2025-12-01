'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { DollarSign, Users, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';

const AdminView: React.FC = () => {
    const { orders, products, users } = useStore();

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const lowStockProducts = products.filter(p => p.stock < 10).length;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                Rp {totalRevenue.toLocaleString()}
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
                            <p className="text-sm text-slate-500 dark:text-slate-400">Pending Orders</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {pendingOrders} Orders
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
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Users</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {users.length} Users
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
                            <p className="text-sm text-slate-500 dark:text-slate-400">Low Stock Alert</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                                {lowStockProducts} Items
                            </h3>
                        </div>
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg">
                            <AlertCircle size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Recent Orders</h3>
                    <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-900 dark:text-white font-medium">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">#{order.id}</td>
                                    <td className="px-6 py-4">{users.find(u => u.id === order.userId)?.name || order.userId}</td>
                                    <td className="px-6 py-4">Rp {order.totalAmount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-slate-100 text-slate-700'
                                            }`}>
                                            {order.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                        No recent orders found.
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

export default AdminView;
