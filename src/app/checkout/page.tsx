// src/app/checkout/page.tsx
'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, user } = useStore(); // Assume placeOrder is not in the simplified Context, we simulate it
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: user?.name || '', address: '', city: '' });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => setStep(2), 1000); // Simulate processing
    };

    if (step === 2) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={48} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Pesanan Berhasil!</h2>
                    <button onClick={() => router.push('/dashboard')} className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl mt-6">
                        Ke Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 pt-24">
                <h1 className="text-2xl font-bold mb-8">Checkout</h1>
                <form onSubmit={handleOrder} className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold flex items-center gap-2 mb-4"><MapPin /> Alamat Pengiriman</h3>
                            <input required className="w-full border rounded-lg p-3 mb-3" placeholder="Nama Penerima" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <textarea required className="w-full border rounded-lg p-3" placeholder="Alamat Lengkap" rows={3} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="font-bold mb-4">Ringkasan</h3>
                            <div className="flex justify-between text-xl font-bold border-t pt-4">
                                <span>Total Bayar</span>
                                <span className="text-orange-500">Rp {total.toLocaleString()}</span>
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-600">
                            Bayar Sekarang
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
