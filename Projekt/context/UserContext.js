import { createContext, useState } from "react";

export const UserContext = createContext(); // skapa context objekt, detta är en global behållare

export function UserProvider({ children }) {
    
    const [current_user, setCurrentUser] = useState('(ej inloggad)');
    const [is_user_selected, setIsUserSelected] = useState(false);

    return(
        <UserContext.Provider
        value={{
            current_user, setCurrentUser, is_user_selected, setIsUserSelected
        }}
        >
            {children} 
            { /*allt som inkapslas i UserContext.Provider i App.js */ }
        </UserContext.Provider>
    );
}