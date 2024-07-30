// firebaseUtils.js
import { db } from './firebase'; // Adjust the import path as needed
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

// Collection reference
const cleanersCollectionRef = collection(db, 'cleaners');

// Fetch all cleaners
export const fetchCleaners = async () => {
  const cleanersSnapshot = await getDocs(cleanersCollectionRef);
  return cleanersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Add new cleaner
export const addCleaner = async (cleanerData) => {
  const docRef = await addDoc(cleanersCollectionRef, cleanerData);
  return { id: docRef.id, ...cleanerData };
};

// Delete cleaner
export const deleteCleaner = async (id) => {
  const cleanerDocRef = doc(db, 'cleaners', id);
  await deleteDoc(cleanerDocRef);
};

// Update cleaner
export const updateCleaner = async (id, updatedData) => {
  const cleanerDocRef = doc(db, 'cleaners', id);
  await updateDoc(cleanerDocRef, updatedData);
};
