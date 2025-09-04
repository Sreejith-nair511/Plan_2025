# Placement Prep Buddy 🎯

A comprehensive AI-powered platform for campus placement preparation built with Next.js, TypeScript, and modern web technologies.

## Features ✨

- **AI-Powered Quizzes**: Personalized quiz questions generated using Google Gemini API
- **Gamified Learning**: Streaks, badges, and leaderboards to keep you motivated
- **Interview Experiences**: Share and browse real interview experiences from peers
- **Progress Tracking**: Detailed analytics and performance insights
- **Premium Subscription**: Advanced features with Razorpay integration
- **Dark Mode**: Beautiful UI with light/dark theme support
- **Mobile-First**: Fully responsive design optimized for all devices

## Tech Stack 🛠️

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Google Gemini API
- **Payments**: Razorpay
- **UI Components**: Radix UI
- **Deployment**: Vercel

## Getting Started 🚀

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd placement-prep-buddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/placement_prep_buddy"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key_here

   # Razorpay
   RAZORPAY_KEY_ID=rzp_test_your_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure 📁

```
placement-prep-buddy/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding script
├── src/
│   ├── app/                  # Next.js app directory
│   │   ├── api/             # API routes
│   │   ├── dashboard/       # Dashboard page
│   │   ├── interviews/      # Interview experiences
│   │   ├── leaderboard/     # Leaderboard page
│   │   ├── payment/         # Payment page
│   │   ├── sign-in/         # Authentication pages
│   │   └── sign-up/
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components
│   │   ├── navbar.tsx      # Navigation component
│   │   ├── quiz-card.tsx   # Quiz component
│   │   └── ...
│   └── lib/                # Utilities and configurations
│       ├── db.ts           # Database connection
│       ├── gemini.ts       # AI integration
│       └── utils.ts        # Helper functions
├── .env.example            # Environment variables template
├── middleware.ts           # Clerk middleware
└── package.json
```

## API Endpoints 🔌

- `GET /api/quiz` - Get quiz questions
- `POST /api/evaluate` - Evaluate quiz answers
- `GET /api/leaderboard` - Get leaderboard data
- `POST /api/leaderboard` - Update leaderboard
- `GET /api/interviews` - Get interview experiences
- `POST /api/interviews` - Create interview experience
- `POST /api/payment/webhook` - Handle payment webhooks

## Database Schema 🗃️

The application uses the following main entities:

- **Users**: User profiles and subscription status
- **Questions**: Quiz questions with AI-generated content
- **QuizAttempts**: User quiz attempts and scores
- **Leaderboard**: User rankings and achievements
- **InterviewExperiences**: Shared interview experiences

## Deployment 🚀

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your app

### Database Setup

1. **Create a PostgreSQL database** (recommended: Supabase, Railway, or Neon)
2. **Update DATABASE_URL** in your environment variables
3. **Run migrations**: `npx prisma db push`
4. **Seed the database**: `npx prisma db seed`

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

If you have any questions or need help, please:

1. Check the [documentation](README.md)
2. Open an [issue](https://github.com/your-username/placement-prep-buddy/issues)
3. Contact support at support@placementprepbuddy.com

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for authentication
- [Prisma](https://prisma.io/) for database management
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Radix UI](https://radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

will work on payment integration 

Made with ❤️ for students preparing for campus placements
