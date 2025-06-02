import { Pillar } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { getDocs, setDoc, doc, query, where } from 'firebase/firestore'
import { pillarRef } from '@/firebaseConfig'
import { useAuth } from '@/context/authContext'
import { db } from "../firebaseConfig";


export const PillarContext = createContext();
export const PillarContextProvider = ({children}) => {
    const [selectedColor, setSelectedColor] = useState("orange");
    const [pillarname, setpillarName] = useState('');
    const [selectedicon,setselectedicon] = useState('📸');
    const {user} = useAuth();
     
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
    
    //save pillars to firebase
    const savePillars = async(PillarID, pillarname, selectedColor, selectedicon)=>{
       try {
             await setDoc(doc(db, "pillars", PillarID),{
                color: selectedColor,
                icon: selectedicon,
                id: PillarID,
                title: pillarname,
                type: "main",
                userId: user?.id
            });

            return {success: true}
        }   
        catch (e) {
            return {success: false, msg: e.message};
        }
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
            getPillars,
            savePillars
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