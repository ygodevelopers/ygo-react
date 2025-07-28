
import { createContext, useContext, useEffect, useState } from "react";
import { getDocs, setDoc, doc, query, where, updateDoc ,arrayUnion } from 'firebase/firestore'
import { pillarRef } from '@/firebaseConfig'
import { useAuth } from '@/context/authContext'
import { db } from "../firebaseConfig";


export const PillarContext = createContext();
export const PillarContextProvider = ({children}) => {
    const [selectedColor, setSelectedColor] = useState("orange");
    const [pillarname, setpillarName] = useState('');
    const [selectedicon,setselectedicon] = useState('📸');
    const [modalNewVisible, setModalNewVisible] = useState(false);
    const [subpillar, setsubpillar] = useState(false);
    const {user} = useAuth();
     
    const [Pillars, setPillars] = useState([]);
    const [currentPillar, setcurrentPillar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ currentThread, setCurrentThread ] = useState(null);

    const getPillars = async()=>{
        //fetch pillars
        setLoading(true);
        const q = query(pillarRef, where('userId','==',user?.id));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data() });
        })
        console.log("fetch Pillars: ", data);
        setPillars(data);
        setLoading(false);
    }
    
    //save pillars to firestore
    const savePillars = async(PillarID, pillarname, selectedColor, selectedicon)=>{
       try {
        
             await setDoc(doc(db, "pillars", PillarID),{
                color: selectedColor,
                icon: selectedicon,
                id: PillarID,
                title: pillarname,
                type: "main",
                userId: user?.id,
                subPillars: []
            });

            return {success: true}
        }   
        catch (e) {
            return {success: false, msg: e.message};
        }
    }

    const addSubPillar = async (parentPillarId, newSubPillar) => {
        try {
    
            const pillarRef = doc(db, 'pillars', parentPillarId);

            await updateDoc(pillarRef, {
            subPillars: arrayUnion(newSubPillar)
            });

            return { success: true };
        } catch (e) {
            return { success: false, msg: e.message };
        }
    };

    return (
        <PillarContext.Provider value={{
            selectedColor, 
            setSelectedColor, 
            pillarname, 
            setpillarName,
            selectedicon,
            setselectedicon,
            Pillars,
            setPillars,
            getPillars,
            savePillars,
            modalNewVisible,
            setModalNewVisible,
            subpillar,
            setsubpillar,
            currentPillar,
            setcurrentPillar,
            addSubPillar,
            currentThread,
            setCurrentThread
            }}>
            {children}
        </PillarContext.Provider>
    )
}

export const usePillar = () => {
    const value = useContext(PillarContext);

    if(!value) {
        throw new Error('usePillar must be wrapped inside PillarContextProvider');
    }
    return value;
}