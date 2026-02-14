# Deployment Guide

This guide covers deploying your Marketplace app to various platforms.

## Deploying to Vercel (Recommended)

Vercel is the recommended platform for deploying SvelteKit applications.

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your code pushed to a GitHub repository

### Steps

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect SvelteKit

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     - `PUBLIC_SUPABASE_URL` = your Supabase project URL
     - `PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like `your-app.vercel.app`

5. **Set up Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Auto-Deployments

Once connected, Vercel will automatically deploy:
- Every push to `main` branch → Production
- Every pull request → Preview deployment

## Deploying to Netlify

### Steps

1. **Build Configuration**
   
   Create `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Add environment variables in Site settings → Environment variables

3. **Enable Automatic Deployments**
   - Netlify will auto-deploy on every git push

## Deploying to Cloudflare Pages

### Steps

1. **Prepare Adapter**
   
   Install Cloudflare adapter:
   ```bash
   npm install -D @sveltejs/adapter-cloudflare
   ```
   
   Update `svelte.config.js`:
   ```javascript
   import adapter from '@sveltejs/adapter-cloudflare';
   ```

2. **Deploy**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure:
     - Build command: `npm run build`
     - Build output: `build`
   - Add environment variables

## Deploying to a VPS (Ubuntu/Debian)

For self-hosting on a server:

### Prerequisites
- Ubuntu/Debian server with Node.js 18+
- Domain name pointed to your server
- SSH access

### Steps

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone Repository**
   ```bash
   cd /var/www
   git clone your-repo-url marketplace
   cd marketplace
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Set Environment Variables**
   ```bash
   nano .env
   # Add your environment variables
   ```

5. **Build the Application**
   ```bash
   npm run build
   ```

6. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

7. **Start Application**
   ```bash
   pm2 start build/index.js --name marketplace
   pm2 startup
   pm2 save
   ```

8. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

9. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Environment Variables

Make sure to set these on your deployment platform:

```
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Post-Deployment Checklist

- ✅ Test all pages load correctly
- ✅ Verify Supabase connection works
- ✅ Test item creation and image upload
- ✅ Test SMS functionality on mobile devices
- ✅ Check responsive design on different devices
- ✅ Verify category filtering works
- ✅ Test navigation and links

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check for TypeScript errors: `npm run check`

### Environment Variables Not Working
- Ensure variables start with `PUBLIC_` for client-side access
- Restart the build after adding variables
- Check variable names match exactly

### 404 Errors
- Ensure proper redirect rules are set
- Check that adapter is configured correctly

### Images Not Loading
- Verify Supabase storage bucket is public
- Check CORS settings in Supabase
- Ensure image URLs are accessible

## Monitoring

Consider setting up monitoring:

- **Vercel**: Built-in analytics and logging
- **Netlify**: Analytics and deploy notifications
- **Self-hosted**: 
  - Use PM2 logs: `pm2 logs marketplace`
  - Set up log rotation: `pm2 install pm2-logrotate`
  - Monitor with tools like Datadog or New Relic

## Backup Strategy

Regular backups are important:

1. **Database**: Supabase provides automatic daily backups
2. **Code**: Keep in GitHub with proper version control
3. **Images**: Supabase storage is redundant, but consider periodic exports

## Scaling Considerations

As your marketplace grows:

- **Database**: Upgrade Supabase plan for more rows and storage
- **Images**: Enable Supabase CDN for faster image delivery
- **Caching**: Implement edge caching with your deployment platform
- **Search**: Add full-text search capabilities
- **Analytics**: Track user behavior and popular items

---

Need help? Check the main README.md for support resources.
