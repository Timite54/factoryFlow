import React, {createContext, useContext, useEffect, useState,} from 'react';
import axios from "axios";

const userContext = createContext();

const AuthContext = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setUser(null);
                }
                const response = await axios.get(
                    "http://localhost:3000/api/auth/verify",{
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                });
                // const data = await response.json();
                if (response.data.success) {
                    setUser(response.data.user);
                }else {
                    setUser(null);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response && !error.response.data.error){
                    setUser(null);
                }
            }finally {
                setLoading(false);
            }
        }
        verifyUser();
    }, []);
    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    }
    return (
        <userContext.Provider value={{user, login, logout, loading}}>
            {children}
        </userContext.Provider>
    );
};
export const useAuth = () => useContext(userContext)
export default AuthContext;