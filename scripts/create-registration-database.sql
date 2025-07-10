-- Create database schema for Aniyor seller registration
-- This script creates all necessary tables to capture registration data

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(15) UNIQUE,
    verification_method VARCHAR(10) NOT NULL CHECK (verification_method IN ('email', 'mobile')),
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seller profiles table
CREATE TABLE IF NOT EXISTS seller_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    store_name VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    registration_status VARCHAR(20) DEFAULT 'pending' CHECK (registration_status IN ('pending', 'in_progress', 'completed', 'rejected')),
    registration_step INTEGER DEFAULT 1,
    selected_plan JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Business details table
CREATE TABLE IF NOT EXISTS business_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    has_gst BOOLEAN NOT NULL,
    gst_type VARCHAR(20) CHECK (gst_type IN ('regular', 'composition', 'none')),
    gstin VARCHAR(15),
    gst_verified BOOLEAN DEFAULT FALSE,
    gst_verified_at TIMESTAMP,
    enrollment_id VARCHAR(50),
    enrollment_verified BOOLEAN DEFAULT FALSE,
    enrollment_verified_at TIMESTAMP,
    business_name VARCHAR(255),
    pan_number VARCHAR(10),
    business_type VARCHAR(50),
    business_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pickup addresses table
CREATE TABLE IF NOT EXISTS pickup_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    use_gst_address BOOLEAN DEFAULT TRUE,
    room_number VARCHAR(255),
    street_locality VARCHAR(255),
    landmark VARCHAR(255),
    pincode VARCHAR(6),
    city VARCHAR(100),
    state VARCHAR(100),
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bank details table
CREATE TABLE IF NOT EXISTS bank_details (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    account_number VARCHAR(20) NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    bank_name VARCHAR(255),
    beneficiary_name VARCHAR(255),
    bank_verified BOOLEAN DEFAULT FALSE,
    bank_verified_at TIMESTAMP,
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registration logs for tracking progress
CREATE TABLE IF NOT EXISTS registration_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    step_name VARCHAR(50) NOT NULL,
    step_data JSONB,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- API keys for external integrations
CREATE TABLE IF NOT EXISTS api_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'shopify', 'aniyor_app', etc.
    api_key VARCHAR(255),
    webhook_url VARCHAR(500),
    integration_status VARCHAR(20) DEFAULT 'pending' CHECK (integration_status IN ('pending', 'active', 'inactive', 'failed')),
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_seller_profiles_user_id ON seller_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_business_details_seller_id ON business_details(seller_id);
CREATE INDEX IF NOT EXISTS idx_business_details_gstin ON business_details(gstin);
CREATE INDEX IF NOT EXISTS idx_pickup_addresses_seller_id ON pickup_addresses(seller_id);
CREATE INDEX IF NOT EXISTS idx_bank_details_seller_id ON bank_details(seller_id);
CREATE INDEX IF NOT EXISTS idx_registration_logs_seller_id ON registration_logs(seller_id);
CREATE INDEX IF NOT EXISTS idx_api_integrations_seller_id ON api_integrations(seller_id);

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seller_profiles_updated_at BEFORE UPDATE ON seller_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_business_details_updated_at BEFORE UPDATE ON business_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pickup_addresses_updated_at BEFORE UPDATE ON pickup_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bank_details_updated_at BEFORE UPDATE ON bank_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_api_integrations_updated_at BEFORE UPDATE ON api_integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
