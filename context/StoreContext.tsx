
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, CartItem, Order, UserRole } from '../types';
import { MOCK_USERS } from '../mockData';
import { InventoryFabricator } from '../utils/InventoryFabricator';

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
  users: User[]; // Admin needs to see all users
  approveReseller: (userId: string) => void;
  register: (name: string, email: string, role: UserRole, referralCode?: string) => { success: boolean; message: string };
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (shippingAddress: string, paymentMethod: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  addNotification: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  removeNotification: (id: string) => void;
  newOrderIds: string[]; // For Admin highlighting
  clearNewOrderHighlight: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Initialize Procedural Inventory
  useEffect(() => {
    const generatedInventory = InventoryFabricator.synthesizeBatch(10000);
    setProducts(generatedInventory);
  }, []);

  // Thermodynamic Decay Service (Physics Layer)
  useEffect(() => {
    const decayInterval = setInterval(() => {
      setCart(currentCart => {
        return currentCart.map(item => {
          // Ambient Temperature Simulation (fluctuates between 20C and 30C)
          const ambientTempK = 293.15 + (Math.sin(Date.now() / 10000) * 5);
          const meltingPoint = item.thermodynamics.melting_point;

          // If ambient > melting point, integrity degrades
          if (ambientTempK > meltingPoint) {
            // Complex decay formula based on specific heat and thermal conductivity
            const deltaT = ambientTempK - meltingPoint;
            const decayRate = (deltaT * item.thermodynamics.thermal_conductivity) / item.thermodynamics.specific_heat_capacity;

            // Update bio_metrics (simulate bacterial growth)
            // Note: In a real app we would update the actual item state, but here we just log or maybe trigger a visual effect
            // For now, let's just console log high decay events to show it's running
            if (Math.random() > 0.99) {
              console.log(`[THERMO-PHYSICS] Item ${item.sku} is decaying! Rate: ${decayRate.toFixed(4)}`);
            }
          }
          return item;
        });
      });
    }, 5000); // Run every 5 seconds

    return () => clearInterval(decayInterval);
  }, []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newOrderIds, setNewOrderIds] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('frozeen_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('frozeen_theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  // Simulate persistent login for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('frozeen_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addNotification = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const login = (email: string, role: UserRole): boolean => {
    const foundUser = users.find(u => u.email === email && u.role === role);

    if (foundUser) {
      if (foundUser.status === 'rejected') {
        addNotification('error', 'Login Gagal', 'Akun Anda ditolak oleh Admin.');
        return false;
      }
      if (foundUser.status === 'pending' && role === 'reseller') {
        // Allow login but restrict access in UI? Or block?
        // Let's allow login so they can see "Waiting for Approval" dashboard
      }

      setUser(foundUser);
      localStorage.setItem('frozeen_user', JSON.stringify(foundUser));
      addNotification('success', 'Login Berhasil', `Selamat datang kembali, ${foundUser.name}`);
      return true;
    }

    addNotification('error', 'Login Gagal', 'Email tidak ditemukan atau role salah.');
    return false;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('frozeen_user');
    addNotification('info', 'Logout', 'Anda telah keluar.');
  };

  const register = (name: string, email: string, role: UserRole, referralCode?: string): { success: boolean; message: string } => {
    const exists = users.some(u => u.email === email);
    if (exists) {
      return { success: false, message: 'Email sudah terdaftar. Silakan login.' };
    }

    let uplineId: string | undefined;
    if (referralCode) {
      const upline = users.find(u => u.referralCode === referralCode && u.role === 'reseller');
      if (upline) uplineId = upline.id;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      status: role === 'reseller' ? 'pending' : 'active',
      walletBalance: role === 'reseller' ? 0 : undefined,
      referralCode: role === 'reseller' ? `REF${Math.floor(Math.random() * 10000)}` : undefined,
      usedReferralCode: referralCode,
      uplineId
    };

    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    localStorage.setItem('frozeen_user', JSON.stringify(newUser));

    if (role === 'reseller') {
      addNotification('info', 'Pendaftaran Berhasil', 'Akun Reseller menunggu persetujuan Admin.');
    } else {
      addNotification('success', 'Registrasi Berhasil', 'Akun Anda telah dibuat.');
    }
    return { success: true, message: 'Success' };
  };

  const approveReseller = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'active' } : u));
    addNotification('success', 'Reseller Disetujui', 'User kini bisa akses harga reseller.');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        addNotification('success', 'Keranjang Diupdate', `${product.name} jumlah ditambah.`);
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      addNotification('success', 'Berhasil', `${product.name} masuk keranjang.`);
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.id === productId) {
        const newQty = Math.max(1, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (shippingAddress: string, paymentMethod: string) => {
    if (!user) return;

    const totalAmount = cart.reduce((sum, item) => {
      const price = user.role === 'reseller' ? item.resellerPrice : item.price;
      return sum + (price * item.quantity);
    }, 0);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: [...cart],
      totalAmount,
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress,
      paymentMethod
    };

    // Commission Logic
    if (user.uplineId) {
      const commission = totalAmount * 0.05; // 5% commission
      setUsers(prev => prev.map(u => {
        if (u.id === user.uplineId) {
          return { ...u, walletBalance: (u.walletBalance || 0) + commission };
        }
        return u;
      }));
      // In a real app, we would record a transaction history here
    }

    setOrders(prev => [newOrder, ...prev]);
    setNewOrderIds(prev => [newOrder.id, ...prev]); // Add to highlight list

    // Trigger Admin Notification (Simulated)
    addNotification('info', 'Notifikasi Admin', `Pesanan Baru #${newOrder.id} masuk!`);

    // Simulate WhatsApp Notification
    const waMessage = `Halo Admin, ada pesanan baru!\nID: ${newOrder.id}\nTotal: Rp ${newOrder.totalAmount.toLocaleString('id-ID')}\nMetode: ${newOrder.paymentMethod}`;
    console.log(`[WHATSAPP API] Sending to Admin: ${waMessage}`);

    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addNotification('info', 'Status Update', `Order ${orderId} diubah ke ${status}`);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addNotification('success', 'Produk Dihapus', 'Produk berhasil dihapus dari sistem.');
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const clearNewOrderHighlight = (id: string) => {
    setNewOrderIds(prev => prev.filter(oid => oid !== id));
  };

  return (
    <StoreContext.Provider value={{
      user, users, products, cart, orders, notifications, newOrderIds, theme,
      login, logout, register, toggleTheme, approveReseller,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      placeOrder, updateOrderStatus, addProduct, deleteProduct, getProductById,
      addNotification, removeNotification, clearNewOrderHighlight
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
