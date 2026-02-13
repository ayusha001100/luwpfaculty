// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyB-DVKR_6PgidEt7smqiTUXpbLvBuq4fBg",
  authDomain: "landingpage-10420.firebaseapp.com",
  projectId: "landingpage-10420",
  storageBucket: "landingpage-10420.firebasestorage.app",
  messagingSenderId: "802825132220",
  appId: "1:802825132220:web:ea1843a054bcafa2f858b9",
  measurementId: "G-3RVDH1009D"
};


// Initialize Firebase (check if already initialized for Next.js hot reloading)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics (only in client-side and if supported)
let analytics = null;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, db, analytics };
export default app;
