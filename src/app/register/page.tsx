// src/app/register/page.tsx
'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { Suspense } from 'react';

function RegisterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role');
    const { login } = useStore(); // Simplified: we'll use login to simulate reg

    const [role, setRole] = useState<'member' | 'reseller'>(roleParam === 'reseller' ? 'reseller' : 'member');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app: call register API
        // Simulation:
        login(email, role);
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-sky-50 dark:bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white">Daftar Akun Baru</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input required className="w-full border rounded-lg px-4 py-2" placeholder="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} />
                    <input required type="email" className="w-full border rounded-lg px-4 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setRole('member')} className={`p-3 border rounded-lg text-center ${role === 'member' ? 'bg-sky-50 border-sky-500 text-sky-600' : ''}`}>Pelanggan</button>
                        <button type="button" onClick={() => setRole('reseller')} className={`p-3 border rounded-lg text-center ${role === 'reseller' ? 'bg-orange-50 border-orange-500 text-orange-600' : ''}`}>Reseller</button>
                    </div>

                    <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600">
                        Daftar Sekarang
                    </button>
                </form>
                <p className="text-center mt-4 text-sm">Sudah punya akun? <Link href="/login" className="text-sky-600 font-bold">Masuk</Link></p>
            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RegisterContent />
        </Suspense>
    );
}
