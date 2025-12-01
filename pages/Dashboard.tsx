
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Package, Users, DollarSign, TrendingUp, Plus, Check, Truck, XCircle, ShoppingBag, BellRing, Trash2, AlertCircle, Upload } from 'lucide-react';
import { Product, CATEGORIES } from '../types';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboardHome from './admin/AdminDashboardHome';
import ResellerSidebar from '../components/reseller/ResellerSidebar';
import ResellerDashboard from './reseller/ResellerDashboard';
import MemberSidebar from '../components/member/MemberSidebar';
import MemberDashboard from './member/MemberDashboard';

const Dashboard: React.FC = () => {
  const { user, orders, products, addProduct, updateOrderStatus, newOrderIds, clearNewOrderHighlight, deleteProduct, users, approveReseller } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', category: CATEGORIES[1], price: 0, resellerPrice: 0, stock: 0, description: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  // --- ADMIN VIEW ---
  if (user.role === 'admin') {
    return (
      <div className="flex bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors">
        <AdminSidebar />
        <div className="flex-1 ml-64">
          <AdminDashboardHome />
        </div>
      </div>
    );
  }

  // --- RESELLER / CUSTOMER VIEW ---
  if (user.role === 'reseller') {
    return (
      <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
        <ResellerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="flex-1 md:ml-64 transition-all duration-300">
          {/* Mobile Header Toggle */}
          <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 z-40 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="font-bold text-lg text-sky-600">Frozeen</div>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>
          <ResellerDashboard />
        </div>
      </div>
    );
  }

  // --- MEMBER / CUSTOMER VIEW ---
  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <MemberSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:ml-72 transition-all duration-300">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-900 z-40 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="font-bold text-lg text-sky-600">Frozeen</div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        <MemberDashboard />
      </div>
    </div>
  );
};

export default Dashboard;
