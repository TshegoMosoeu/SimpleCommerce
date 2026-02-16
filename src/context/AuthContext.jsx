import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

/**
 * Provides authentication state and actions to descendant components via AuthContext.
 *
 * Initializes user state from localStorage's "currentUserEmail" and supplies `signUp`, `login`, `logout`, and the current `user` through the context value.
 *
 * @param {{children: import('react').ReactNode}} props - Component children to be wrapped by the provider.
 * @returns {import('react').ReactElement} A React context provider that supplies authentication state and actions to its children.
 */
export default function AuthProvider({children}) {
    const [user, setUser] = useState(localStorage.getItem("currentUserEmail")?{email: localStorage.getItem("currentUserEmail")}:
                            null
                        );

    function signUp(email, password) {
        const users = JSON.parse(localStorage.getItem('users')) || "[]";

        if (users.find(u => u.email === email)) {
            return {success: false, error: "Email already exists"}
        }


        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("currentUserEmail",email)

        setUser({email})

        return {success: true}
    }


    function login(email, password) {

        const users = JSON.parse(localStorage.getItem('users')) || "[]";

        const user = users.find((u)=> u.email === email && u.password === password);

        if (!user) {
            return {success: false, error:"Nvalid email or password"}
        }

        localStorage.setItem("currentUserEmail",email);
        setUser({email});

        return {success: true}

    }

    function logout() {
        localStorage.removeItem("currentUserEmail");
        setUser(null);
    }

    return (
    <AuthContext.Provider value={{signUp, user, logout,login}}>{children}</AuthContext.Provider>
)

}

/**
 * Access the authentication context for the calling component.
 * @returns {{ signUp: (email: string, password: string) => { success: boolean, error?: string }, login: (email: string, password: string) => { success: boolean, error?: string }, logout: () => void, user: { email: string } | null }} The auth context object with `signUp`, `login`, and `logout` methods and the current `user` (or `null` if not authenticated).
 */
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}