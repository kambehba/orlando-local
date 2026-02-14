# Marketplace App

A modern, responsive marketplace application built with SvelteKit, TypeScript, Tailwind CSS, and Supabase. This application allows users to list items for sale and contact sellers directly via SMS.

## Features

- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🎨 **Beautiful UI** - Custom design with Tailwind CSS and smooth animations
- 🔍 **Category Filtering** - Browse items by category
- 📸 **Image Upload** - Add photos to your listings
- 💬 **SMS Integration** - Contact sellers directly through SMS
- 🚀 **No Authentication Required** - Simple and fast listing process
- ⚡ **Real-time Updates** - Powered by Supabase

## Tech Stack

- **Frontend Framework**: SvelteKit
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend & Database**: Supabase
- **SMS**: Native device SMS integration

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- A Supabase account (free tier works great)
- npm or yarn package manager

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized

### 2. Create the Database Table

Run the following SQL in the Supabase SQL Editor:

```sql
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

-- Create index for faster queries
CREATE INDEX idx_items_category ON items(category);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_created_at ON items(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read items
CREATE POLICY "Allow public read access" ON items
  FOR SELECT USING (true);

-- Create policy to allow anyone to insert items
CREATE POLICY "Allow public insert access" ON items
  FOR INSERT WITH CHECK (true);
```

### 3. Set Up Storage for Images

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `item-images`
3. Make the bucket **public**
4. Set the following policies for the bucket:

```sql
-- Allow public to upload images
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'item-images');

-- Allow public to read images
CREATE POLICY "Allow public reads" ON storage.objects
  FOR SELECT USING (bucket_id = 'item-images');
```

### 4. Get Your Supabase Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy your **Project URL** and **anon/public key**

## Installation

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```
   PUBLIC_SUPABASE_URL=your_supabase_project_url
   PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to `http://localhost:5173`

## Project Structure

```
marketplace-app/
├── src/
│   ├── lib/
│   │   ├── supabase.ts      # Supabase client and data functions
│   │   └── sms.ts           # SMS utility functions
│   ├── routes/
│   │   ├── +layout.svelte   # Main layout with header/footer
│   │   ├── +page.svelte     # Home page (browse items)
│   │   ├── sell/
│   │   │   └── +page.svelte # Sell item page
│   │   └── item/[id]/
│   │       └── +page.svelte # Item detail page
│   ├── app.css              # Global styles
│   └── app.html             # HTML template
├── static/                  # Static assets
├── .env.example             # Environment variables template
├── package.json
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Usage

### Browsing Items

- Navigate to the home page to see all available items
- Use the category filter dropdown to filter by category
- Click on any item card to view full details

### Listing an Item

1. Click "Sell Item" in the navigation
2. Fill out the form with item details:
   - Title
   - Description
   - Price
   - Category
   - Location
   - Contact phone number
   - Optional: Upload an image
3. Click "Create Listing"
4. You'll be redirected to your new listing

### Contacting a Seller

1. Navigate to any item detail page
2. Click "Contact Seller via SMS"
3. Customize your message (optional)
4. Click "Send SMS"
5. Your device's SMS app will open with the pre-filled message

## SMS Integration

The SMS functionality uses the native `sms:` URL scheme, which:
- Opens the default SMS app on mobile devices
- May prompt to pair with a phone on desktop
- Works without any third-party services or API keys

The format is: `sms:PHONE_NUMBER?body=MESSAGE`

## Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: { /* your primary colors */ },
  secondary: { /* your secondary colors */ }
}
```

### Fonts

The app uses:
- **Display font**: Crimson Pro (for headings)
- **Body font**: Inter (for content)

Change these in `tailwind.config.js` and `src/app.html`

### Categories

Add or modify categories in:
- `src/routes/+page.svelte` (home page)
- `src/routes/sell/+page.svelte` (sell page)

## Building for Production

```bash
npm run build
```

The built files will be in the `build/` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment

This app can be deployed to:

- **Vercel** (recommended for SvelteKit)
- **Netlify**
- **Cloudflare Pages**
- Any Node.js hosting platform

Make sure to set your environment variables in your deployment platform.

## Troubleshooting

### Images not uploading

1. Check that the `item-images` bucket exists in Supabase Storage
2. Verify the bucket is set to **public**
3. Ensure the storage policies are correctly set

### Items not appearing

1. Check your Supabase connection in the browser console
2. Verify the `items` table exists
3. Check RLS policies are set correctly

### SMS not working

- SMS integration requires a device with SMS capabilities
- On desktop, it may not work unless paired with a phone
- Some browsers may block the `sms:` protocol - try a different browser

## Features to Add

Some ideas for enhancement:

- User authentication and user profiles
- Favorite/saved items
- Search functionality
- Item editing and deletion
- Mark items as sold
- Email notifications
- Image gallery (multiple images per item)
- Messaging system within the app
- Reviews and ratings

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review Supabase documentation at [supabase.com/docs](https://supabase.com/docs)
3. Check SvelteKit documentation at [kit.svelte.dev](https://kit.svelte.dev)

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

Built with ❤️ using SvelteKit, TypeScript, Tailwind CSS, and Supabase
