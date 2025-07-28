# Firebase Setup Guide for RSVP System

This guide will help you set up Firebase Firestore to store your RSVP data permanently.

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Click "Create a project"** or "Add project"
3. **Enter project name**: `reyna-wedding-rsvp` (or any name you prefer)
4. **Enable Google Analytics**: Optional (you can disable it)
5. **Click "Create project"**

## Step 2: Set Up Firestore Database

1. **In your Firebase project**, click "Firestore Database" in the left sidebar
2. **Click "Create database"**
3. **Choose security rules**: Select "Start in test mode" (we'll secure it later)
4. **Choose location**: Select a region close to your users
5. **Click "Done"**

## Step 3: Get Firebase Configuration

1. **Click the gear icon** (⚙️) next to "Project Overview"
2. **Select "Project settings"**
3. **Scroll down to "Your apps"** section
4. **Click the web icon** (</>)
5. **Register app**: Enter app nickname (e.g., "reyna-wedding-web")
6. **Copy the configuration** (it looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 4: Create Environment Variables

Create a file called `.env.local` in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the values with your actual Firebase configuration.

## Step 5: Test Your Setup

1. **Start your development server**: `npm run dev`
2. **Go to your RSVP page**: `http://localhost:3000/rsvp`
3. **Submit a test RSVP**
4. **Check Firebase Console**: Go to Firestore Database to see your data

## Step 6: Deploy to Production

1. **Add environment variables to Vercel**:
   - Go to your Vercel project dashboard
   - Click "Settings" → "Environment Variables"
   - Add all the Firebase environment variables
2. **Deploy**: `vercel --prod`

## Security Rules (Optional but Recommended)

In Firebase Console → Firestore Database → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvp-submissions/{document} {
      allow read, write: if true; // For now, allow all access
    }
  }
}
```

## Troubleshooting

### "Firebase not available" in console
- Check that your environment variables are correct
- Make sure `.env.local` is in the project root
- Restart your development server

### "Permission denied" errors
- Check Firestore security rules
- Make sure you're in "test mode" for development

### Data not appearing
- Check the browser console for errors
- Verify your Firebase project ID is correct
- Check that Firestore is enabled in your project

## Benefits of Firebase

✅ **Free Tier**: 1GB storage, 50,000 reads/day, 20,000 writes/day
✅ **Real-time Updates**: Data syncs instantly
✅ **Scalable**: Handles any number of RSVPs
✅ **Reliable**: Google's infrastructure
✅ **Easy to Use**: Simple API

## Cost

- **Free tier**: Perfect for wedding RSVPs
- **Paid**: Only if you exceed free limits (very unlikely for a wedding)

Your RSVP system will now store data permanently in Firebase Firestore! 🎉 