import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingBag, Package, Users,
    FileText, Settings, MessageSquare, LogOut,
    TrendingUp, Shield, Award
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const { logout } = useStore();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard Home', path: '/admin/dashboard' },
        { icon: ShoppingBag, label: 'Pesanan Masuk', path: '/admin/orders', badge: true }, // Logic badge nanti dihubungkan
        { icon: Package, label: 'Manajemen Produk', path: '/admin/products' },
        { icon: Users, label: 'Reseller & User', path: '/admin/users' },
        { icon: Award, label: 'Loyalty System', path: '/admin/loyalty' },
        { icon: TrendingUp, label: 'Keuangan & Laporan', path: '/admin/finance' },
        { icon: MessageSquare, label: 'Broadcast WA', path: '/admin/broadcast' },
        { icon: Settings, label: 'Pengaturan Website', path: '/admin/settings' },
        { icon: Shield, label: 'Log Aktivitas', path: '/admin/logs' },
    ];

    return (
        <div className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto z-50">
            <div className="p-6 border-b border-slate-800">
                <h1 className="text-2xl font-bold tracking-wider text-sky-400">Frozeen<span className="text-white">Admin</span></h1>
                <p className="text-xs text-slate-500 mt-1">Enterprise Management v2.0</p>
            </div>

            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium text-sm">{item.label}</span>
                            {item.badge && (
                                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                                    NEW
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto absolute bottom-0 w-full border-t border-slate-800">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl transition"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Logout System</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
