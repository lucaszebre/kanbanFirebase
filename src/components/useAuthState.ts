import { useState, useEffect } from 'react';
import { Auth, onAuthStateChanged, User } from 'firebase/auth';

const useAuthState = (authInstance: Auth): [User | null, boolean, Error | null] => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
        authInstance,
        (user) => {
            setUser(user);
            setLoading(false);
        },
        (error) => {
            setError(error);
            setLoading(false);
        }
    );

    return () => {
        unsubscribe();
    };
    }, [authInstance]);

    return [user, loading, error];
};

export default useAuthState;
