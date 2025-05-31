import { createContext, useContext, useEffect, useState } from "react";


export const PillarContext = createContext();

export const PillarContextProvider = ({children}) => {
    const [selectedColor, setSelectedColor] = useState("orange");
    const [pillarname, setpillarName] = useState('');

    return (
        <PillarContext.Provider value={{
            selectedColor, 
            setSelectedColor, 
            pillarname, 
            setpillarName}}>
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