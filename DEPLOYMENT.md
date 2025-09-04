# Local Deployment Guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd placement-prep-buddy
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example environment file
copy .env.example .env.local

# Edit .env.local with your values (or use defaults for testing)
```

### 3. Run the Application
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables (Optional for Testing)

For local testing, you can use these default values in `.env.local`:

```env
# Database (Optional - uses mock data if not provided)
DATABASE_URL="postgresql://localhost:5432/placement_prep_buddy"

# Clerk Authentication (Optional - auth disabled for testing)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_demo
CLERK_SECRET_KEY=sk_test_demo

# Google Gemini AI (Optional - uses fallback questions)
GEMINI_API_KEY=demo_key

# Razorpay (Optional - payment disabled for testing)
RAZORPAY_KEY_ID=rzp_test_demo
RAZORPAY_KEY_SECRET=demo_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_demo
```

## Features Available in Demo Mode

✅ **Working Features:**
- Landing page with full UI
- Quiz functionality with mock questions
- Dashboard with progress tracking
- Leaderboard with sample data
- Interview experiences page
- Payment page UI
- Dark/Light mode toggle
- Fully responsive design

⚠️ **Limited Features (Demo Mode):**
- Authentication (shows demo user)
- Database operations (uses mock data)
- AI question generation (uses fallback questions)
- Payment processing (UI only)

## Production Setup

For full production deployment:

1. **Set up PostgreSQL database**
2. **Configure Clerk authentication**
3. **Add Google Gemini API key**
4. **Set up Razorpay payments**
5. **Run database migrations:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

## Troubleshooting

### Common Issues:

1. **Port 3000 already in use:**
   ```bash
   npm run dev -- -p 3001
   ```

2. **Module not found errors:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TypeScript errors:**
   - The app will still run in development mode
   - Most errors are due to missing dependencies that aren't needed for demo

### Browser Compatibility:
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support  
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design
