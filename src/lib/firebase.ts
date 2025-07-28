import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection reference
export const rsvpCollection = collection(db, 'rsvp-submissions');

// Helper functions
export const addRSVP = async (data: {
  name: string;
  attendance: string;
  phone: string;
  message: string;
}) => {
  try {
    const docRef = await addDoc(rsvpCollection, {
      ...data,
      timestamp: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding RSVP:', error);
    throw error;
  }
};

export const getRSVPs = async () => {
  try {
    const q = query(rsvpCollection, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    const submissions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return submissions;
  } catch (error) {
    console.error('Error getting RSVPs:', error);
    throw error;
  }
};

export const deleteRSVP = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'rsvp-submissions', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting RSVP:', error);
    throw error;
  }
}; 