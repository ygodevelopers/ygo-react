import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const currentuser = auth.currentUser;

    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (currentuser) => {
            if(currentuser){
                setIsAuthenticated(true);
                setUser({...user, email: currentuser.email, id: currentuser.uid });
                updateUserData(currentuser.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });

        return unsub;
    }, []);

    const updateUserData = async (userId) => {
        const docRef = doc(db,'users', userId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            let data = docSnap.data();
            setUser(data);
            console.log('update user data:', user);
        }
    }


    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            updateUserData(response?.user?.uid);

            return {success: true, data: response?.user}
        }
        catch (e) {
            return {success: false, msg: e.message}
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return {success: true}
        }
        catch (e) {
            return {success: false, msg: e.message, error: e}
        }
    }

    const register = async (email, password, firstName, profileImageUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user:', response?.user);

            await setDoc(doc(db, "users", response?.user?.uid),{
                email,
                firstName,
                id: response?.user?.uid,
                profileImageUrl
            });

            return {success: true, data: response?.user}
        }   
        catch (e) {
            return {success: false, msg: e.message};
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}