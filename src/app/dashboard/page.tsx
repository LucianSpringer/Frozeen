// src/app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { useRouter, useSearchParams } from 'next/navigation';

// IMPORT THE RESTORED VIEWS
import AdminView from '@/components/dashboard/AdminView';
import ResellerView from '@/components/dashboard/ResellerView';
import MemberView from '@/components/dashboard/MemberView';
import ReferralView from '@/components/dashboard/ReferralView';
import RewardView from '@/components/dashboard/RewardView';
import RewardManagerView from '@/components/dashboard/RewardManagerView';

// IMPORT SIDEBARS
import AdminSidebar from '@/components/admin/AdminSidebar';
import ResellerSidebar from '@/components/reseller/ResellerSidebar';
import MemberSidebar from '@/components/member/MemberSidebar';

function DashboardContent() {
    const { user } = useStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const viewParam = searchParams.get('view');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Sync state with URL param or default
    const currentView = viewParam || 'dashboard';

    if (!user) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    // LOGIC DENSITY: Role-Based View Switcher
    const renderContent = () => {
        if (user.role === 'admin') {
            if (currentView === 'manage-rewards') return <RewardManagerView />;
            return <AdminView />;
        }
        if (user.role === 'reseller') {
            if (currentView === 'referral') return <ReferralView />;
            if (currentView === 'rewards') return <RewardView />;
            return <ResellerView />;
        }
        if (user.role === 'member') {
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
            case 'member': return <MemberSidebar {...props} />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
            <div className="hidden md:block">{renderSidebar()}</div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-white z-50 border-b p-4 flex justify-between">
                <span className="font-bold">Frozeen</span>
                <button onClick={() => setIsSidebarOpen(true)}>Menu</button>
            </div>

            <main className="flex-1 p-4 md:p-8 md:ml-64 mt-16 md:mt-0">
                {renderContent()}
            </main>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </React.Suspense>
    );
}
