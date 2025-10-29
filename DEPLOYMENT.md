# 🚀 Deployment Guide - Apple Financial Dashboard

This guide covers multiple deployment options for your production-ready dashboard.

---

## ✅ Pre-Deployment Checklist

- [x] All features implemented
- [x] Build successful (`npm run build`)
- [x] No TypeScript errors
- [x] All pages rendering correctly
- [x] CSV files in `/public/data/`
- [x] Performance optimized
- [x] Production-ready code

---

## 🌟 Option 1: Vercel (RECOMMENDED)

### Why Vercel?
- ✅ Built by Next.js creators
- ✅ Zero configuration
- ✅ Automatic deployments
- ✅ Built-in CDN
- ✅ Free for personal projects
- ✅ HTTPS included

### Deployment Steps

#### Method A: Via GitHub (Recommended)

1. **Initialize Git Repository**
   ```bash
   cd "/Users/prasanthkumar/Desktop/FINANCIAL DATA/apple-dashboard"
   git init
   git add .
   git commit -m "Initial commit: Apple Financial Dashboard"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/apple-dashboard.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js
   - Click "Deploy"
   - ✅ Done! Your dashboard is live

#### Method B: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd "/Users/prasanthkumar/Desktop/FINANCIAL DATA/apple-dashboard"
   vercel
   ```

4. **Follow prompts**
   - Set up and deploy? Yes
   - Which scope? Your account
   - Link to existing project? No
   - Project name? apple-dashboard
   - Directory? ./
   - Override settings? No

5. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Post-Deployment
- ✅ Your dashboard will be live at: `https://apple-dashboard.vercel.app`
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Analytics included

---

## 🔷 Option 2: Netlify

### Deployment Steps

1. **Build the App**
   ```bash
   cd "/Users/prasanthkumar/Desktop/FINANCIAL DATA/apple-dashboard"
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

### Configuration
Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## ☁️ Option 3: AWS (S3 + CloudFront)

### Steps

1. **Build Static Export**
   Update `next.config.js`:
   ```javascript
   module.exports = {
     output: 'export',
   }
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy to S3**
   ```bash
   aws s3 sync out/ s3://your-bucket-name --delete
   ```

4. **Configure CloudFront**
   - Create CloudFront distribution
   - Point to S3 bucket
   - Enable HTTPS

---

## 🐳 Option 4: Docker

### Dockerfile

Create `Dockerfile` in root:
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Commands

```bash
# Build image
docker build -t apple-dashboard .

# Run container
docker run -p 3000:3000 apple-dashboard

# Push to registry
docker tag apple-dashboard:latest YOUR_REGISTRY/apple-dashboard:latest
docker push YOUR_REGISTRY/apple-dashboard:latest
```

---

## 🌐 Option 5: Traditional Hosting (cPanel, Nginx)

### Steps

1. **Build the App**
   ```bash
   npm run build
   ```

2. **Install Dependencies on Server**
   ```bash
   npm ci --production
   ```

3. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "apple-dashboard" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
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

---

## 📊 Environment Variables

### Create `.env.local` (if needed)

```env
# Application
NEXT_PUBLIC_APP_NAME="Apple Financial Dashboard"
NEXT_PUBLIC_APP_VERSION="1.0.0"

# Analytics (optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# API Keys (if you add external APIs later)
# NEXT_PUBLIC_API_KEY="your-api-key"
```

**Note**: Currently, your app doesn't use env variables, but this is for future use.

---

## 🔒 Security Checklist

- [ ] Enable HTTPS
- [ ] Set up CSP headers
- [ ] Configure CORS properly
- [ ] Remove console.logs in production
- [ ] Enable rate limiting
- [ ] Set up monitoring

---

## 📈 Performance Optimization

### Before Deployment

1. **Analyze Bundle**
   ```bash
   npm install -D @next/bundle-analyzer
   ```
   
   Update `next.config.js`:
   ```javascript
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   })
   
   module.exports = withBundleAnalyzer({})
   ```
   
   Run:
   ```bash
   ANALYZE=true npm run build
   ```

2. **Lighthouse Audit**
   - Open Chrome DevTools
   - Go to Lighthouse tab
   - Run audit
   - Fix any issues

3. **Image Optimization**
   - Compress images
   - Use WebP format
   - Implement lazy loading

---

## 🔧 Custom Domain Setup

### Vercel

1. Go to Project Settings
2. Click "Domains"
3. Add your domain
4. Update DNS records:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Netlify

1. Go to Domain Settings
2. Add custom domain
3. Follow DNS instructions

---

## 📊 Monitoring & Analytics

### Add Google Analytics (Optional)

1. **Install Package**
   ```bash
   npm install @next/third-parties
   ```

2. **Update Layout**
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="G-XXXXXXXXXX" />
         </body>
       </html>
     )
   }
   ```

### Add Error Tracking (Optional)

Use Sentry, LogRocket, or similar:
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 🧪 Pre-Launch Testing

### Local Testing
```bash
# Production build locally
npm run build
npm start

# Open in browser
open http://localhost:3000
```

### Testing Checklist
- [ ] All pages load correctly
- [ ] Charts render properly
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] CSV data loads
- [ ] Performance is good
- [ ] Accessibility passes

---

## 🚀 Launch Checklist

- [ ] Domain configured
- [ ] HTTPS enabled
- [ ] Analytics set up
- [ ] Error tracking configured
- [ ] Performance optimized
- [ ] SEO meta tags added
- [ ] Social sharing images
- [ ] 404 page works
- [ ] Loading states work
- [ ] Error boundaries work

---

## 📱 Post-Launch

### Share Your Dashboard

1. **Get the URL**
   - Vercel: `https://apple-dashboard.vercel.app`
   - Custom domain: `https://yourdomain.com`

2. **Test on Multiple Devices**
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS, Android)
   - Tablet

3. **Monitor Performance**
   - Check Vercel/Netlify analytics
   - Monitor error rates
   - Track load times

---

## 🔄 Continuous Deployment

### Automatic Deployments

With GitHub + Vercel/Netlify:
1. Push to `main` branch
2. Automatic build triggers
3. Deploys to production
4. ✅ Zero downtime

### Preview Deployments

- Every PR gets a preview URL
- Test changes before merging
- Share with stakeholders

---

## 💡 Quick Tips

1. **Keep Dependencies Updated**
   ```bash
   npm outdated
   npm update
   ```

2. **Monitor Bundle Size**
   ```bash
   npm run build
   # Check .next folder size
   ```

3. **Test Production Build Locally**
   ```bash
   npm run build && npm start
   ```

4. **Use Environment Variables**
   - Never commit secrets
   - Use `.env.local` for local dev
   - Use platform secrets for production

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### 404 on Refresh
- Configure rewrite rules
- Use `next.config.js` redirects

### Slow Performance
- Enable ISR (Incremental Static Regeneration)
- Use Image optimization
- Implement code splitting

---

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Guides**: https://vercel.com/guides
- **Netlify Docs**: https://docs.netlify.com
- **Web.dev**: https://web.dev

---

## ✅ Recommended: Deploy to Vercel Now

**Quickest Path to Production:**

```bash
cd "/Users/prasanthkumar/Desktop/FINANCIAL DATA/apple-dashboard"
npx vercel
```

Follow prompts → Dashboard is LIVE in 2 minutes! 🚀

---

**Your dashboard is production-ready and can be deployed immediately!**
