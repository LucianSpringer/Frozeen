// src/app/products/[id]/page.tsx
'use client';

import React, { useState, use } from 'react'; // 'use' is for unwrapping params in Next.js 15
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft, Tag, Truck, ShieldCheck, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { products, user, addToCart } = useStore();
    const router = useRouter();
    const [qty, setQty] = useState(1);

    const product = products.find(p => p.id === resolvedParams.id);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Produk Tidak Ditemukan</h2>
                <button onClick={() => router.push('/products')} className="mt-4 text-sky-600 hover:underline">
                    Kembali ke Katalog
                </button>
            </div>
        );
    }

    const isReseller = user?.role === 'reseller';
    const price = isReseller ? product.resellerPrice : product.price;
    const isOutOfStock = product.stock <= 0;

    const handleAddToCart = () => {
        if (!isOutOfStock) {
            addToCart(product); // Note: Context needs to handle qty if you want that feature
            alert('Produk masuk keranjang!');
        }
    };

    const incrementQty = () => setQty(prev => Math.min(prev + 1, product.stock));
    const decrementQty = () => setQty(prev => Math.max(1, prev - 1));

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 pt-24 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-slate-600 hover:text-sky-600 font-medium transition">
                        <ArrowLeft size={20} /> Kembali
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0 md:gap-8">
                        <div className="bg-gray-100 dark:bg-slate-700 relative h-96 md:h-auto min-h-[400px]">
                            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
                            {isReseller && (
                                <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2">
                                    <Tag size={16} /> Harga Khusus Reseller
                                </div>
                            )}
                        </div>

                        <div className="p-8 flex flex-col">
                            <div className="mb-auto">
                                <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                                    {product.category}
                                </span>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{product.name}</h1>
                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="text-3xl font-bold text-sky-600">Rp {price.toLocaleString('id-ID')}</span>
                                    {isReseller && (
                                        <span className="text-lg text-slate-400 line-through">Rp {product.price.toLocaleString('id-ID')}</span>
                                    )}
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mb-8">{product.description}</p>
                            </div>

                            <div className="border-t pt-6 flex gap-4">
                                <div className="flex items-center border rounded-xl px-2">
                                    <button onClick={decrementQty} className="p-3"><Minus size={20} /></button>
                                    <span className="w-12 text-center font-bold">{qty}</span>
                                    <button onClick={incrementQty} className="p-3"><Plus size={20} /></button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                    className="flex-1 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition"
                                >
                                    {isOutOfStock ? 'Stok Habis' : 'Tambah Keranjang'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
