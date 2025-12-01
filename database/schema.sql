-- src/database/schema.sql
-- ARCHITECTURE: Enterprise Loyalty & Referral System (PostgreSQL Compatible)

-- 1. EXTENDED USER PROFILE (MLM Support)
ALTER TABLE users ADD COLUMN referral_code VARCHAR(20) UNIQUE;
ALTER TABLE users ADD COLUMN upline_id UUID REFERENCES users(id);
ALTER TABLE users ADD COLUMN tier VARCHAR(20) DEFAULT 'regular'; -- regular, silver, gold
ALTER TABLE users ADD COLUMN total_referral_earnings DECIMAL(15, 2) DEFAULT 0;

-- 2. LOYALTY POINTS LEDGER (Double-Entry Banking)
CREATE TABLE point_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(20) CHECK (type IN ('EARN', 'REDEEM', 'EXPIRE', 'ADJUSTMENT')),
    amount INTEGER NOT NULL, -- Positif/Negatif
    balance_after INTEGER NOT NULL,
    description TEXT,
    reference_id VARCHAR(100), -- OrderID or ReferralUserID
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE -- Nullable
);

-- 3. REWARD INVENTORY
CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    points_cost INTEGER NOT NULL,
    type VARCHAR(20) CHECK (type IN ('VOUCHER', 'PRODUCT', 'PHYSICAL', 'SHIPPING')),
    value_idr DECIMAL(10, 2), -- Nilai rupiah jika voucher
    stock_qty INTEGER DEFAULT 0,
    min_tier VARCHAR(20) DEFAULT 'regular',
    is_active BOOLEAN DEFAULT TRUE
);

-- 4. REFERRAL COMMISSION LOG (Audit Trail)
CREATE TABLE referral_commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    upline_id UUID NOT NULL REFERENCES users(id),
    downline_id UUID NOT NULL REFERENCES users(id),
    order_id UUID NOT NULL, -- Triggering Order
    level INTEGER CHECK (level IN (1, 2)),
    amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('PENDING', 'PAID')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. REDEMPTION REQUESTS
CREATE TABLE redemptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    reward_id UUID NOT NULL REFERENCES rewards(id),
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PROCESSED, SHIPPED
    shipping_notes TEXT,
    processed_at TIMESTAMP WITH TIME ZONE
);
