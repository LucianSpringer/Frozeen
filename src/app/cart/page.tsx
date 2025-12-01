// src/app/cart/page.tsx
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();
    const router = useRouter();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 pt-24">
                <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>

                {cart.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">Keranjang kosong.</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-xl flex gap-4 items-center shadow-sm">
                                    <img src={item.image} className="w-20 h-20 rounded-lg object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-sky-600">Rp {item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 bg-slate-100 rounded">-</button>
                                        <span className="font-bold">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 bg-slate-100 rounded">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 size={20} /></button>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
                            <h3 className="font-bold mb-4">Ringkasan</h3>
                            <div className="flex justify-between mb-4 text-xl font-bold">
                                <span>Total</span>
                                <span>Rp {cartTotal.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={() => router.push('/checkout')} // You need to create this page too
                                className="w-full bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700"
                            >
                                Checkout Sekarang
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
