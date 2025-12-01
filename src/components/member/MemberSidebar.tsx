'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    LayoutGrid, ShoppingBag, ShoppingCart,
    MapPin, Heart, Clock, Star,
    LogOut, Gift, User as UserIcon,
    TrendingUp
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const MemberSidebar: React.FC<{ isOpen: boolean, setIsOpen: (v: boolean) => void }> = ({ isOpen, setIsOpen }) => {
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'dashboard';
    const { logout, user } = useStore();

    const menuItems = [
        { icon: LayoutGrid, label: 'Beranda Member', path: '/dashboard?view=dashboard', view: 'dashboard' },
        { icon: ShoppingBag, label: 'Katalog Belanja', path: '/products', view: null },
        { icon: ShoppingCart, label: 'Keranjang Saya', path: '/cart', view: null, badge: true },
        { icon: Clock, label: 'Riwayat Pesanan', path: '/dashboard?view=orders', view: 'orders' },
        { icon: Heart, label: 'Produk Favorit', path: '/dashboard?view=wishlist', view: 'wishlist' },
        { icon: MapPin, label: 'Alamat', path: '/dashboard?view=addresses', view: 'addresses' },
        { icon: Gift, label: 'Poin & Reward', path: '/dashboard?view=rewards', view: 'rewards' },
        { icon: TrendingUp, label: 'Program Partner', path: '/dashboard?view=referral', view: 'referral' },
        { icon: Star, label: 'Ulasan Saya', path: '/dashboard?view=reviews', view: 'reviews' },
        { icon: UserIcon, label: 'Profil', path: '/dashboard?view=profile', view: 'profile' },
    ];

    const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`;

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

            <aside className={sidebarClasses}>
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-sky-50/30 dark:bg-slate-800/50">
                    {/* Profile Header */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
                                <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white dark:border-slate-900 text-slate-900 shadow-sm">MEMBER</div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 dark:text-white truncate">{user?.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-280px)]">
                    {menuItems.map((item) => {
                        const isActive = item.view ? currentView === item.view : false;
                        return (
                            <Link
                                key={item.label}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-sky-50 dark:bg-slate-800 text-sky-600 font-bold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-sky-600' : 'text-slate-400'} />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={logout} className="flex items-center justify-center gap-2 w-full py-2.5 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 rounded-lg transition font-medium text-sm">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default MemberSidebar;
