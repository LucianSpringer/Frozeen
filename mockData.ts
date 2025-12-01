import { User } from './types';

export const MOCK_USERS: User[] = [
    {
        id: 'admin1',
        name: 'Admin Frozeen',
        email: 'admin@frozeen.id',
        role: 'admin',
        status: 'active',
        phone: '08123456789'
    },
    {
        id: 'reseller1',
        name: 'Budi Santoso',
        email: 'budi@gmail.com',
        role: 'reseller',
        status: 'active',
        phone: '08198765432',
        referralCode: 'BUDI123',
        walletBalance: 1500000
    },
    {
        id: 'cust1',
        name: 'Siti Aminah',
        email: 'siti@gmail.com',
        role: 'customer',
        status: 'active',
        phone: '08567890123'
    }
];
