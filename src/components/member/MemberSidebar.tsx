import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
    LayoutGrid, ShoppingBag, ShoppingCart,
    MapPin, Heart, Clock, Star,
    LogOut, Gift, MessageCircle, User as UserIcon,
    TrendingUp
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const MemberSidebar: React.FC<{ isOpen: boolean, setIsOpen: (v: boolean) => void }> = ({ isOpen, setIsOpen }) => {
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'overview';
    const { logout, user } = useStore();

    const menuItems = [
        { icon: LayoutGrid, label: 'Beranda Member', path: '/dashboard?view=overview', view: 'overview' },
        { icon: ShoppingBag, label: 'Katalog Belanja', path: '/products', view: null },
        { icon: ShoppingCart, label: 'Keranjang Saya', path: '/cart', view: null, badge: true },
        { icon: Clock, label: 'Riwayat Pesanan', path: '/dashboard?view=orders', view: 'orders' },
        { icon: Heart, label: 'Produk Favorit', path: '/dashboard?view=wishlist', view: 'wishlist' },
        { icon: MapPin, label: 'Alamat Pengiriman', path: '/dashboard?view=addresses', view: 'addresses' },
        { icon: Gift, label: 'Poin & Reward', path: '/dashboard?view=rewards', view: 'rewards' },
        { icon: TrendingUp, label: 'Program Partner', path: '/dashboard?view=referral', view: 'referral' },
        { icon: Star, label: 'Ulasan Saya', path: '/dashboard?view=reviews', view: 'reviews' },
        { icon: UserIcon, label: 'Profil & Password', path: '/dashboard?view=profile', view: 'profile' },
    ];

    const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`;

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={sidebarClasses}>
                {/* User Card */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-sky-50/30 dark:bg-slate-800/50">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white dark:border-slate-900 text-slate-900 shadow-sm">
                                MEMBER
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900 dark:text-white truncate">{user?.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                            <div className="mt-2 flex items-center gap-1">
                                <div className="h-1.5 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-sky-500 w-[60%] rounded-full"></div>
                                </div>
                                <span className="text-[10px] text-sky-600 font-bold">VIP 60%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upgrade Banner (The Upsell) */}
                <div className="px-4 pt-4">
                    <Link href="/register?role=reseller" className="block relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white shadow-lg shadow-orange-500/20 group hover:shadow-orange-500/40 transition-all">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp size={16} className="animate-bounce" />
                                <span className="font-bold text-sm">Upgrade Reseller?</span>
                            </div>
                            <p className="text-xs text-orange-100 leading-tight mb-2">Dapatkan harga pabrik & komisi jutaan rupiah!</p>
                            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded inline-block group-hover:bg-white group-hover:text-orange-600 transition">
                                Daftar Gratis &rarr;
                            </span>
                        </div>
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl"></div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-280px)]">
                    {menuItems.map((item) => {
                        const isActive = item.view ? currentView === item.view : false;
                        return (
                            <Link
                                key={item.label}
                                href={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                    ? 'bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-400 font-bold'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} className={`transition-colors ${isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 group-hover:text-sky-500'}`} />
                                <span className="text-sm">{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                        2
                                    </span>
                                )}
                                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-sky-500 rounded-r-full"></div>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 w-full p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <button
                        onClick={logout}
                        className="flex items-center justify-center gap-2 w-full py-2.5 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-red-500 rounded-lg transition font-medium text-sm"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>
        </>
    );
};

export default MemberSidebar;
