// Import Firebase
import {initializeApp} from 'firebase/app';

// Import Firestore, Auth, and Storage
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYc2AoOdb6ucFY_qnzbqs3NJ5a_4_X0_c",
  authDomain: "inkwellapp-615d0.firebaseapp.com",
  projectId: "inkwellapp-615d0",
  storageBucket: "inkwellapp-615d0.firebasestorage.app",
  messagingSenderId: "1059018701196",
  appId: "1:1059018701196:web:8bc70e08dfdf465971fea9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);
// Initialize Storage
const storage = getStorage(app);
// Initialize Auth
const auth = getAuth(app);

export { app, db, auth, storage };