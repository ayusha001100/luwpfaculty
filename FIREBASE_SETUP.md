# Firebase Setup Instructions

## Step 1: Get Your Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Click on the **Settings** gear icon → **Project Settings**
4. Scroll down to **Your apps** section
5. If you haven't added a web app yet:
   - Click **Add app** → Select **Web** (</> icon)
   - Register your app with a nickname
6. Copy the `firebaseConfig` object values

## Step 2: Update .env.local File

Replace the placeholder values in `.env.local` with your actual Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
```

## Step 3: Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (or test mode for development)
4. Select your preferred location
5. Click **Enable**

## Step 4: Create the Collection

The app will automatically create an `enquiries` collection when the first form is submitted.

Alternatively, you can manually create it:
1. In Firestore, click **Start collection**
2. Collection ID: `enquiries`
3. Add a test document (it will be auto-deleted later)

## Step 5: Set Up Firestore Rules (Optional but Recommended)

Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow write to enquiries collection from client
    match /enquiries/{document=**} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

This allows anyone to create (submit) enquiries but prevents reading/updating/deleting from the client side.

## Step 6: Restart Your Development Server

After updating `.env.local`, restart your dev server:

```bash
npm run dev
```

## Data Structure

Each enquiry document will contain:
- `name` - Full name
- `email` - Email address
- `designation` - Current designation
- `organization` - Organization name
- `phone` - Mobile number
- `countryCode` - Country phone code (e.g., "91")
- `country` - Country name
- `state` - State name
- `city` - City name
- `timestamp` - Server timestamp
- `status` - "new" (can be updated later to "contacted", "converted", etc.)

## Viewing Submissions

1. Go to Firebase Console → Firestore Database
2. Click on the `enquiries` collection
3. You'll see all form submissions with their details

## Security Note

⚠️ **Never commit `.env.local` to Git!** 
It's already in `.gitignore` to prevent accidental commits.
