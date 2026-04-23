import { createContext, useState } from "react";

export const UserContext = createContext();

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
        </UserContext.Provider>
    );
}