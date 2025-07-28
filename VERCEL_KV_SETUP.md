# Vercel KV Setup for RSVP Data Storage

This project uses Vercel KV (Redis) to store RSVP form submissions without needing a traditional backend.

## Setup Instructions

### 1. Deploy to Vercel
First, deploy your Next.js app to Vercel:
```bash
npm run build
vercel --prod
```

### 2. Add Vercel KV Database
1. Go to your Vercel dashboard
2. Select your project
3. Go to the "Storage" tab
4. Click "Create Database"
5. Choose "KV" (Redis)
6. Select a region close to your users
7. Click "Create"

### 3. Configure Environment Variables
Vercel will automatically add the required environment variables to your project:
- `KV_URL`
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`
- `KV_REST_API_READ_ONLY_TOKEN`

### 4. Redeploy
After adding the KV database, redeploy your application:
```bash
vercel --prod
```

## How It Works

### API Routes
- `POST /api/rsvp` - Submits RSVP data to KV storage
- `GET /api/rsvp` - Retrieves all RSVP submissions

### Admin Page
- Visit `/admin/rsvp` to view all submissions
- Shows attendance statistics
- Displays all form data with timestamps

### Data Structure
Each RSVP submission includes:
```json
{
  "id": "timestamp",
  "name": "Guest Name",
  "attendance": "yes|no|maybe",
  "phone": "Phone Number",
  "message": "Optional message",
  "timestamp": "ISO date string"
}
```

## Alternative Options

If you don't want to use Vercel KV, here are other options:

### 1. Supabase (PostgreSQL)
- Free tier available
- Easy to set up
- Great for relational data

### 2. PlanetScale (MySQL)
- Serverless MySQL
- Free tier available
- Great performance

### 3. MongoDB Atlas
- NoSQL database
- Free tier available
- Flexible schema

### 4. Firebase Firestore
- Google's NoSQL database
- Free tier available
- Real-time updates

## Security Considerations

- The admin page (`/admin/rsvp`) is currently public
- Consider adding authentication for the admin page
- You can use Next.js middleware or a simple password protection

## Cost
- Vercel KV has a generous free tier
- Pay-as-you-go pricing after free tier
- Very cost-effective for small to medium projects 