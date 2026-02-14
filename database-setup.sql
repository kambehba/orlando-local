-- Marketplace Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create items table
CREATE TABLE items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  seller_phone VARCHAR(20) NOT NULL,
  image_url TEXT,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'sold')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better performance
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_created_at ON items(created_at DESC);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON items
  FOR SELECT USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON items
  FOR INSERT WITH CHECK (true);

-- Optional: Insert some sample data for testing
INSERT INTO items (title, description, price, category, location, seller_phone, status) VALUES
  ('iPhone 13 Pro', 'Excellent condition, 256GB, comes with original box and charger', 699.99, 'electronics', 'New York, NY', '5551234567', 'available'),
  ('Vintage Leather Sofa', 'Beautiful brown leather sofa, great condition, very comfortable', 450.00, 'furniture', 'Brooklyn, NY', '5559876543', 'available'),
  ('Nike Running Shoes', 'Size 10, barely used, perfect for jogging', 75.00, 'clothing', 'Queens, NY', '5555551234', 'available'),
  ('Gaming Laptop', 'RTX 3070, 16GB RAM, 1TB SSD, perfect for gaming and work', 1299.99, 'electronics', 'Manhattan, NY', '5554443333', 'available'),
  ('Wooden Dining Table', 'Solid oak dining table with 6 chairs, seats 8 people', 600.00, 'furniture', 'Bronx, NY', '5552221111', 'available');
