'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types locally or import from a shared types file if available
// For now, defining here to ensure self-containment during migration
export interface Product {
    id: string;
    sku: string;
    name: string;
    category: string;
    description: string;
    price: number;
    resellerPrice: number;
    image: string;
    stock: number;
    weight: number;
    minOrder: number;
    composition?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'reseller' | 'member';
    referralCode?: string;
    uplineId?: string;
    walletBalance: number;
    rewardPoints: number;
    memberTier: 'regular' | 'silver' | 'gold' | 'platinum';
}

interface StoreContextType {
    user: User | null;
    products: Product[];
    cart: any[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    login: (email: string, role: User['role']) => void;
    logout: () => void;
    notifications: any[];
    addNotification: (n: any) => void;
    removeNotification: (id: string) => void;
    users: User[]; // For admin/referral logic
    orders: any[];
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Mock Data Injection for UI Stability
    useEffect(() => {
        const mockProducts: Product[] = [
            {
                id: 'p1', sku: 'NUG-001', name: 'Chicken Nugget Premium', category: 'Nugget & Tempura',
                description: 'Nugget ayam dengan daging dada pilihan, tanpa pengawet.',
                price: 45000, resellerPrice: 35000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500',
                stock: 150, weight: 500, minOrder: 1, composition: 'Daging Ayam, Tepung Roti, Bumbu'
            },
            // ... more products can be added here
        ];
        setProducts(mockProducts);
    }, []);

    const addToCart = (product: Product) => {
        console.log('Adding to cart:', product.name);
        // Implementation skipped for brevity in shim
    };

    const removeFromCart = (productId: string) => { };
    const updateCartQuantity = (productId: string, quantity: number) => { };

    const login = (email: string, role: User['role']) => {
        setUser({
            id: 'u1', name: 'Demo User', email, role,
            walletBalance: 0, rewardPoints: 0, memberTier: 'regular'
        });
    };

    const logout = () => setUser(null);
    const addNotification = (n: any) => { };
    const removeNotification = (id: string) => { };

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
        if (theme === 'light') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <StoreContext.Provider value={{
            user, products, cart, addToCart, removeFromCart, updateCartQuantity,
            login, logout, notifications, addNotification, removeNotification,
            users: [], orders: [], theme, toggleTheme
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error("useStore must be used within StoreProvider");
    return context;
};
