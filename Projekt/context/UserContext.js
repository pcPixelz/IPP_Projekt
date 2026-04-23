import { createContext, useState } from "react";

export const UserContext = createContext(); // skapa context objekt, detta är en global behållare

export function UserProvider({ children }) {

    const [currentUser, setCurrentUser] = useState('(ej inloggad)');
    const [isUserSelected, setIsUserSelected] = useState(false);

    return(
        <UserContext.Provider
        value={{
            currentUser, setCurrentUser, isUserSelected, setIsUserSelected
        }}
        >
            {children} 
            { /*allt som inkapslas i UserContext.Provider i App.js */ }
        </UserContext.Provider>
    );
}