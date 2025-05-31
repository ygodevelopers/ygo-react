import { createContext, useContext, useEffect, useState } from "react";
import { getDocs, query, where } from 'firebase/firestore'
import { pillarRef } from '@/firebaseConfig'
import { useAuth } from '@/context/authContext'

export const PillarContext = createContext();
export const PillarContextProvider = ({children}) => {
    const [selectedColor, setSelectedColor] = useState("orange");
    const [pillarname, setpillarName] = useState('');
    const [selectedicon,setselectedicon] = useState('📸');
    const {user} = useAuth();

    // const [Pillars, setPillars] = useState<Pillar[]>([]);
    // interface Pillar {
    //     color: string;   
    //     icon: string;       
    //     id: string; 
    //     subPillars: string[];
    //     title: string;
    //     type: string;
    //     userId: string;
    //     // Add other fields as needed
    // }
    const [Pillars, setPillars] = useState([]);

    const getPillars = async()=>{
        //fetch pillars
        const q = query(pillarRef, where('userId','==',user?.id));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({...doc.data() });
        })
        console.log("fetch Pillars: ", data);
        setPillars(data);
    }
    

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
            getPillars
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