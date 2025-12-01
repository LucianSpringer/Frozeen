// src/app/products/page.tsx
'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function ProductCatalog() {
    const { products, addToCart } = useStore();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 pt-24">
                <h1 className="text-3xl font-bold mb-8 text-slate-800 dark:text-white">Katalog Produk</h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden group">
                            <div className="relative h-48 bg-gray-200">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
                                <p className="text-sky-600 font-bold">Rp {product.price.toLocaleString('id-ID')}</p>
                                <div className="mt-4 flex gap-2">
                                    <Link href={`/products/${product.id}`} className="flex-1 py-2 text-center border rounded-lg text-sm font-bold">
                                        Detail
                                    </Link>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="flex-1 py-2 bg-sky-600 text-white rounded-lg text-sm font-bold flex justify-center items-center gap-2 hover:bg-sky-700"
                                    >
                                        <ShoppingCart size={16} /> +Keranjang
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
