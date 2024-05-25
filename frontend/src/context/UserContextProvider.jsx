import { useState, useEffect } from "react";
import UserContext from "./UserContext";

export const UserContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(true);
    useEffect(() => {
        const accessToken = sessionStorage.getItem("token");
        if (accessToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn, }}>
            {children}
        </UserContext.Provider>
    );
};
