// src/app/dashboard/page.tsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useStore } from '@/context/StoreContext';
import { useRouter, useSearchParams } from 'next/navigation';

// VIEWS
import AdminView from '@/components/dashboard/AdminView';
import ResellerView from '@/components/dashboard/ResellerView';
import MemberView from '@/components/dashboard/MemberView';
import ReferralView from '@/components/dashboard/ReferralView';
import RewardView from '@/components/dashboard/RewardView';
import RewardManagerView from '@/components/dashboard/RewardManagerView';

// SIDEBARS
import AdminSidebar from '@/components/admin/AdminSidebar';
import ResellerSidebar from '@/components/reseller/ResellerSidebar';
import MemberSidebar from '@/components/member/MemberSidebar';

function DashboardContent() {
    const { user } = useStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get('view') || 'overview'; // Default to overview
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!user) {
        // Prevent hydration mismatch by checking window
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    // DYNAMIC VIEW SWITCHER
    const renderContent = () => {
        // ADMIN VIEWS
        if (user.role === 'admin') {
            if (currentView === 'loyalty') return <RewardManagerView />;
            // Add other admin views here if you separated them, otherwise default:
            return <AdminView />;
        }

        // RESELLER VIEWS
        if (user.role === 'reseller') {
            if (currentView === 'downlines') return <ReferralView />; // Reusing ReferralView for Downlines
            if (currentView === 'finance') return <ReferralView />;   // Reusing ReferralView for Finance
            if (currentView === 'rewards') return <RewardView />;
            return <ResellerView />;
        }

        // MEMBER VIEWS
        if (user.role === 'member' || user.role === 'customer') {
            if (currentView === 'rewards') return <RewardView />;
            if (currentView === 'referral') return <ReferralView />;
            return <MemberView />;
        }

        return <div>Access Denied</div>;
    };

    const renderSidebar = () => {
        const props = { isOpen: isSidebarOpen, setIsOpen: setIsSidebarOpen };
        switch (user.role) {
            case 'admin': return <AdminSidebar />;
            case 'reseller': return <ResellerSidebar {...props} />;
            default: return <MemberSidebar {...props} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="hidden md:block">{renderSidebar()}</div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white dark:bg-slate-800 z-50 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between">
                <span className="font-bold text-sky-600">Frozeen</span>
                <button onClick={() => setIsSidebarOpen(true)}>Menu</button>
            </div>

            <main className="flex-1 p-4 md:p-8 md:ml-64 mt-16 md:mt-0 overflow-x-hidden">
                {renderContent()}
            </main>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading Dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
