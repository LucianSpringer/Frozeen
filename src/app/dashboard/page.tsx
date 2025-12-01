'use client';

import React, { useState, Suspense } from 'react';
import { useStore } from '@/context/StoreContext';
import { useSearchParams } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ResellerSidebar from '@/components/reseller/ResellerSidebar';
import MemberSidebar from '@/components/member/MemberSidebar';
import AdminView from '@/components/dashboard/AdminView';
import ResellerView from '@/components/dashboard/ResellerView';
import MemberView from '@/components/dashboard/MemberView';
import RewardView from '@/components/dashboard/RewardView';
import ReferralView from '@/components/dashboard/ReferralView';
import RewardManagerView from '@/components/dashboard/RewardManagerView';
import { useRouter } from 'next/navigation';

function DashboardContent() {
    const { user } = useStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const view = searchParams.get('view');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Auth Guard
    if (!user) {
        if (typeof window !== 'undefined') router.push('/login');
        return null;
    }

    const renderSidebar = () => {
        switch (user.role) {
            case 'admin': return <AdminSidebar />;
            case 'reseller': return <ResellerSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />;
            case 'member': return <MemberSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />;
            default: return null;
        }
    };

    const renderContent = () => {
        // Common Views
        if (view === 'rewards') return <RewardView />;

        // Role Specific Views
        switch (user.role) {
            case 'admin':
                if (view === 'manage-rewards') return <RewardManagerView />;
                return <AdminView />;
            case 'reseller':
                if (view === 'referral') return <ReferralView />;
                return <ResellerView />;
            case 'member':
                if (view === 'referral') return <ReferralView />;
                return <MemberView />;
            default: return <div>Unknown Role</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                {renderSidebar()}
            </div>

            {/* Mobile Sidebar Toggle Area */}
            <div className="md:hidden fixed top-0 w-full bg-white z-50 border-b p-4 flex justify-between items-center">
                <span className="font-bold text-sky-600">Frozeen</span>
                <button onClick={() => setIsSidebarOpen(true)}>Menu</button>
            </div>

            {/* Main Content Area */}
            <main className="flex-1 p-8 md:ml-64 mt-16 md:mt-0">
                {renderContent()}
            </main>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading Dashboard...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
