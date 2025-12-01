'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    LayoutDashboard, ShoppingBag, ShoppingCart,
    Users, DollarSign, User, Share2, LogOut,
    Target
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const ResellerSidebar: React.FC<{ isOpen: boolean, setIsOpen: (v: boolean) => void }> = ({ isOpen, setIsOpen }) => {
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'dashboard';
    const { logout, user } = useStore();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard?view=dashboard', view: 'dashboard' },
        { icon: ShoppingBag, label: 'Katalog Produk', path: '/products', view: null },
        { icon: ShoppingCart, label: 'Keranjang', path: '/cart', view: null, badge: true },
        { icon: Users, label: 'Downline Saya', path: '/dashboard?view=downlines', view: 'downlines' },
        { icon: DollarSign, label: 'Komisi & Bonus', path: '/dashboard?view=finance', view: 'finance' },
        { icon: Target, label: 'Target & Reward', path: '/dashboard?view=rewards', view: 'rewards' },
        { icon: Share2, label: 'Materi Promosi', path: '/dashboard?view=marketing', view: 'marketing' },
        { icon: User, label: 'Profil Akun', path: '/dashboard?view=profile', view: 'profile' },
    ];

    const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`;

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}

            <aside className={sidebarClasses}>
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-sky-50/50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-blue-600 p-0.5">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                                alt="Profile"
                                className="w-full h-full rounded-full border-2 border-white dark:border-slate-900"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white truncate max-w-[120px]">{user?.name}</h3>
                            <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">GOLD RESELLER</span>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
                    {menuItems.map((item) => {
                        const isActive = item.view ? currentView === item.view : false;
                        return (
                            <Link
                                key={item.label}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-sky-600 text-white shadow-md'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <item.icon size={20} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-500'} />
                                <span className="font-medium text-sm">{item.label}</span>
                                {item.badge && <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 dark:border-slate-800">
                    <button onClick={logout} className="flex items-center gap-2 w-full py-2.5 text-red-500 hover:bg-red-50 rounded-lg transition font-medium text-sm justify-center">
                        <LogOut size={18} /> Keluar Aplikasi
                    </button>
                </div>
            </aside>
        </>
    );
};

export default ResellerSidebar;
