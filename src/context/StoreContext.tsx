// src/context/StoreContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, CartItem, Order, UserRole } from '@/types';
import { InventoryFabricator } from '@/core/simulation/InventoryFabricator'; // CONNECTED!

interface Notification {
    id: string;
    type: 'success' | 'info' | 'error';
    title: string;
    message: string;
}

interface StoreContextType {
    user: User | null;
    products: Product[];
    cart: CartItem[];
    orders: Order[];
    notifications: Notification[];
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    login: (email: string, role: UserRole) => boolean;
    logout: () => void;
    register: (name: string, email: string, role: UserRole) => { success: boolean; message: string };
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateCartQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    placeOrder: (shippingAddress: string, paymentMethod: string) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    addNotification: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
    removeNotification: (id: string) => void;
    newOrderIds: string[];
    users: User[]; // For admin
    cartTotal: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [newOrderIds, setNewOrderIds] = useState<string[]>([]);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // 1. HIGH YIELD: Initialize Procedural Inventory
    useEffect(() => {
        // Generates 1000 unique SKUs on client mount
        const generatedInventory = InventoryFabricator.synthesizeBatch(1000);
        setProducts(generatedInventory);
    }, []);

    // 2. Theme Logic
    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
        if (theme === 'light') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    };

    // 3. Cart Logic (Restored)
    const addToCart = (product: Product, quantity: number = 1) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                addNotification('success', 'Updated', `${product.name} +${quantity}`);
                return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
            }
            addNotification('success', 'Added', `${product.name} added to cart.`);
            return [...prev, { ...product, quantity }];
        });
    };

    const updateCartQuantity = (productId: string, quantity: number) => {
        setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item));
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    // 4. Auth Logic (Simulation)
    const login = (email: string, role: UserRole): boolean => {
        // Simulating a successful login for demo
        const mockUser: User = {
            id: `U-${Date.now()}`,
            name: 'Demo User',
            email,
            role,
            status: 'active',
            walletBalance: 0,
            rewardPoints: 0
        };
        setUser(mockUser);
        addNotification('success', 'Welcome', `Logged in as ${role}`);
        return true;
    };

    const logout = () => {
        setUser(null);
        setCart([]);
        addNotification('info', 'Goodbye', 'Logged out successfully');
    };

    const register = (name: string, email: string, role: UserRole) => {
        login(email, role); // Auto login on register for demo
        return { success: true, message: 'Account created' };
    };

    // 5. Order Logic
    const placeOrder = (shippingAddress: string, paymentMethod: string) => {
        if (!user) return;
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            userId: user.id,
            items: [...cart],
            totalAmount: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            status: 'pending',
            date: new Date().toISOString(),
            shippingAddress,
            paymentMethod
        };
        setOrders(prev => [newOrder, ...prev]);
        setNewOrderIds(prev => [newOrder.id, ...prev]);
        clearCart();
    };

    const updateOrderStatus = (id: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    }

    const addNotification = (type: any, title: string, message: string) => {
        const id = Date.now().toString();
        setNotifications(prev => [...prev, { id, type, title, message }]);
        setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 3000);
    };

    const removeNotification = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

    return (
        <StoreContext.Provider value={{
            user, products, cart, orders, notifications, newOrderIds, theme,
            toggleTheme, login, logout, register,
            addToCart, removeFromCart, updateCartQuantity, clearCart,
            placeOrder, updateOrderStatus,
            addNotification, removeNotification,
            users: [], cartTotal: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) throw new Error('useStore must be used within a StoreProvider');
    return context;
};
