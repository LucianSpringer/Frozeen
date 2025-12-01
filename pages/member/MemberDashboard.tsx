import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
    Package, Clock, CheckCircle, Truck,
    ChevronRight, Gift, MapPin, Search,
    MessageCircle, Star, AlertCircle, Heart
} from 'lucide-react';

const MemberDashboard: React.FC = () => {
    const { user, orders, products } = useStore();

    // Mock Logic for Display
    const myOrders = orders.filter(o => o.userId === user?.id);
    const activeOrders = myOrders.filter(o => ['pending', 'shipping'].includes(o.status));
    const totalSpend = myOrders.reduce((acc, o) => acc + o.totalAmount, 0);
    const rewardPoints = Math.floor(totalSpend / 10000); // 1 point per 10k

    // Simulated Recommendation Engine
    const recommendedProducts = products.slice(0, 4);

    return (
        <div className="p-4 lg:p-8 pt-24 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">

            {/* 1. Header & Welcome */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        Halo, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Siap stok frozen food lagi hari ini?
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Status: Member Aktif</span>
                    </div>
                </div>
            </div>

            {/* 2. Tracking Widget (Real-time Simulation) */}
            {activeOrders.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 mb-8 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Truck className="text-sky-500" /> Pesanan Dalam Perjalanan
                        </h3>
                        <Link to="/member/orders" className="text-xs font-bold text-sky-600 hover:underline">Lihat Detail</Link>
                    </div>

                    <div className="space-y-6">
                        {activeOrders.slice(0, 1).map(order => (
                            <div key={order.id} className="relative">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-bold text-slate-700 dark:text-slate-200">Order #{order.id}</span>
                                    <span className="text-sky-600 font-medium">Estimasi: Besok, 14:00 WIB</span>
                                </div>
                                {/* Visual Tracking Bar */}
                                <div className="relative h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-4">
                                    <div className="absolute left-0 top-0 h-full bg-sky-500 rounded-full w-[65%]"></div>
                                    <div className="absolute left-[65%] top-1/2 -translate-y-1/2 w-4 h-4 bg-sky-500 border-2 border-white dark:border-slate-800 rounded-full shadow-md"></div>
                                </div>
                                <div className="flex justify-between text-xs text-slate-400">
                                    <span>Diproses</span>
                                    <span className="text-sky-600 font-bold">Sedang Dikirim (JNE - Jakarta)</span>
                                    <span>Diterima</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 3. Core Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Total Spend */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 text-indigo-100">
                            <Package size={20} /> Total Belanja
                        </div>
                        <h3 className="text-3xl font-extrabold mb-1">Rp {totalSpend.toLocaleString('id-ID')}</h3>
                        <p className="text-xs text-indigo-100 opacity-80">Sejak bergabung</p>
                    </div>
                </div>

                {/* Loyalty Points */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition">
                            <Gift size={24} />
                        </div>
                        <Link to="/member/rewards" className="text-xs font-bold text-slate-400 hover:text-orange-500">Tukar Poin</Link>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{rewardPoints} Poin</h3>
                    <p className="text-xs text-slate-500">100 Poin = Voucher 10rb</p>
                    <div className="mt-3 w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 w-[45%]"></div>
                    </div>
                </div>

                {/* Address Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2 text-slate-500">
                            <MapPin size={20} /> <span className="text-sm font-bold">Alamat Utama</span>
                        </div>
                        <button className="text-xs font-bold text-sky-600 hover:underline">Ubah</button>
                    </div>
                    <div className="mb-3">
                        <h4 className="font-bold text-slate-800 dark:text-white">Rumah</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                            Jl. Kebraon V No. 25, Blok D, Surabaya Selatan, Jawa Timur 60222
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">JNE</span>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded">GoSend</span>
                    </div>
                </div>
            </div>

            {/* 4. Promo Banner Slider (Static for now) */}
            <div className="mb-8">
                <div className="relative rounded-2xl overflow-hidden bg-sky-900 h-40 md:h-56 flex items-center px-8 md:px-16 shadow-xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                    <div className="relative z-10 max-w-lg">
                        <span className="bg-yellow-400 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full mb-2 inline-block">FLASH SALE MEMBER</span>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-4">Beli 10 Karton <br />Gratis 1 Karton!</h2>
                        <button className="bg-white text-sky-900 font-bold px-6 py-2.5 rounded-lg hover:scale-105 transition shadow-lg">
                            Serbu Sekarang
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 w-1/3 h-full hidden md:block">
                        <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c1aa.png" alt="Promo" className="w-full h-full object-contain object-bottom transform translate-y-4" />
                    </div>
                </div>
            </div>

            {/* 5. Recommended Products (Algorithm Simulation) */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Rekomendasi Untukmu</h3>
                    <Link to="/products" className="text-sm text-sky-600 font-bold hover:underline">Lihat Semua</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recommendedProducts.map(product => (
                        <div key={product.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl p-3 hover:shadow-md transition group">
                            <div className="relative h-32 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden mb-3">
                                <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={product.name} />
                                <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 dark:bg-black/50 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition backdrop-blur-sm">
                                    <Heart size={16} />
                                </button>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate mb-1">{product.name}</h4>
                            <p className="text-sky-600 font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</p>
                            <div className="flex items-center gap-1 mt-1 mb-3">
                                <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-[10px] text-slate-500">4.9 (86)</span>
                            </div>
                            <button className="w-full py-2 bg-sky-50 dark:bg-slate-700 text-sky-600 dark:text-sky-400 text-xs font-bold rounded-lg hover:bg-sky-600 hover:text-white transition">
                                + Keranjang
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. Floating Support Widget (Internal) */}
            <div className="fixed bottom-6 right-6">
                <button className="bg-sky-600 text-white p-4 rounded-full shadow-lg shadow-sky-600/30 hover:scale-110 transition flex items-center gap-2 font-bold pr-6">
                    <MessageCircle size={24} /> Chat CS
                </button>
            </div>

        </div>
    );
};

export default MemberDashboard;
