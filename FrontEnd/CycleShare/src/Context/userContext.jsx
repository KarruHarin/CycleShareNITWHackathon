import { createContext } from "react";
export const userContext = createContext({})

export const userProvider=({children})=>{
    const [user, setUser] = useState({});

    return(
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}