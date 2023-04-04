import React, { useContext } from 'react';
import { auth, provider,db } from  '@/config/firebase'
import { signInWithPopup } from 'firebase/auth';
import { collection, addDoc, setDoc, doc, query, where, getDocs } from "firebase/firestore";
import styles from '@/styles/Login.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';


interface User {
    uid: string;
    displayName: string | null;
}

const Login: React.FC = () => {

    const router = useRouter();




    const createSubcollection = async (userId: string, displayName: string) => {
    const userRef = doc(db, 'users', userId);
    const displayNameRef = collection(userRef, displayName);

    try {
        await setDoc(doc(displayNameRef, 'exampleDoc'), { exampleData: 'Hello, world!' });
    } catch (error) {
        console.error('Error creating subcollection:', error);
    }
    };

    const createInitialFirestoreStructure = async (userId: string) => {
    try {
      // Check if the user already has boards
        const boardsCollection = collection(db, "boards");
        const q = query(boardsCollection, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

      // If no boards exist for the user, create the initial structure
        if (querySnapshot.empty) {
        // Create a new board document with a generated ID
        const newBoardDoc = await addDoc(boardsCollection, {
            name: "New Board",
            userId: userId
        });

        // Create columns subcollection with a few example columns
        const columnsCollection = collection(newBoardDoc, "columns");
        const column1 = await addDoc(columnsCollection, { name: "Todo" });
        const column2 = await addDoc(columnsCollection, { name: "Doing" });
        const column3 = await addDoc(columnsCollection, { name: "Done" });

        // Create tasks subcollection with an example task
        const tasksCollection = collection(newBoardDoc, "tasks");
        await addDoc(tasksCollection, {
            title: "Example Task",
            description: "",
            status: "Todo",
            columnId: column1.id,
            subtasks: [
            { title: "Subtask 1", isCompleted: false },
            { title: "Subtask 2", isCompleted: false }
            ]
        });
        }
    } catch (error) {
        console.error("Error creating initial Firestore structure:", error);
    }
    };

    const signInWithPopupGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                localStorage.setItem("IsAuth", JSON.stringify(true));
        
                // Create initial Firestore structure for the logged-in user
                createInitialFirestoreStructure(result.user.uid);
        
                // Redirect the user to the main component
                router.push('/');
            })
            .catch((error) => {
                console.log(error);
            });
        };
        

    return (
        <div className={styles.loginDiv}>
            <h1 className={styles.loginTitle}>Sign up with your Google account</h1>
            <button className={styles.loginWithGoogleBtn} 
                onClick={() => signInWithPopupGoogle()}
            >
                <Image src='/assets/icons-google.svg' alt="Google logo" width={48} height={48}  /> Sign in with Google
            </button>
        </div>
    );
};

export default Login;
