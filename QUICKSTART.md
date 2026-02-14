# Quick Start Guide

Get your Marketplace app running in 5 minutes!

## 🚀 Super Quick Setup

### 1. Install Dependencies (1 minute)

```bash
cd marketplace-app
npm install
```

### 2. Set Up Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose any region)
3. While it's setting up, go to **SQL Editor**
4. Copy and paste the entire contents of `database-setup.sql`
5. Click **Run** to create the table

### 3. Set Up Image Storage (1 minute)

1. In Supabase, go to **Storage** → **New bucket**
2. Name it `item-images` and check **Public bucket**
3. Go to **Policies** tab → **New Policy**
4. Create two simple policies:
   - **For INSERT**: Name it "Allow uploads", use template "Allow public uploads"
   - **For SELECT**: Name it "Allow reads", use template "Allow public reads"

See `STORAGE_SETUP.md` for detailed instructions.

### 4. Configure Environment (30 seconds)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. In Supabase, go to **Settings** → **API**

3. Copy these values to your `.env` file:
   - `PUBLIC_SUPABASE_URL` = Project URL
   - `PUBLIC_SUPABASE_ANON_KEY` = anon/public key

### 5. Start the App! (30 seconds)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## ✅ Quick Test

1. Click **"Sell Item"** in the navigation
2. Fill out the form and upload an image
3. Click **"Create Listing"**
4. Your item should appear on the home page!

## 📱 Test SMS

1. Click on any item
2. Click **"Contact Seller via SMS"**
3. On a mobile device, it will open your SMS app
4. On desktop, it may prompt to pair with your phone

## 🎨 What You Get

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Beautiful UI with custom animations
- ✅ Category filtering
- ✅ Image upload
- ✅ SMS integration
- ✅ Real-time data from Supabase

## 🔧 Common Issues

**Can't upload images?**
- Make sure the storage bucket is set to **public**
- Check that both INSERT and SELECT policies exist

**Items not showing?**
- Run the `database-setup.sql` script again
- Check browser console for errors

**SMS not working?**
- SMS requires a device with SMS capabilities
- On desktop, try from your mobile device

## 📚 Next Steps

- Read `README.md` for full documentation
- Check `DEPLOYMENT.md` to deploy your app
- Customize colors in `tailwind.config.js`
- Add more features!

## 🎯 Project Structure

```
marketplace-app/
├── src/
│   ├── lib/          # Supabase & SMS utilities
│   ├── routes/       # Pages (home, sell, item detail)
│   ├── app.css       # Global styles
│   └── app.html      # HTML template
├── .env              # Your environment variables
├── package.json      # Dependencies
└── README.md         # Full documentation
```

## 💡 Tips

- The sample data in `database-setup.sql` helps you test the app
- All code is TypeScript for better type safety
- Tailwind CSS makes styling super easy
- No authentication needed - perfect for local marketplaces!

---

**Need help?** Check the full `README.md` or `DEPLOYMENT.md` files!

**Ready to deploy?** See `DEPLOYMENT.md` for Vercel, Netlify, and more!

Enjoy your marketplace! 🎉
