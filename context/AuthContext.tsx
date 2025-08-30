import {Session, User} from "@supabase/supabase-js";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {supabase} from "../utils/supabaseClient";


interface AuthContextData {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (
        email: string,
        password: string,
        firstName: string,
        userName?: string,
    ) => Promise<any>;
    signIn: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<any>;
    isAuthenticated: () => boolean;

}

const AuthContext = createContext<AuthContextData | null>(null);


export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}


interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        })

        const {
            data: {subscription},
        }
            = supabase.auth.onAuthStateChange(
            (event, session) => {
                console.log("Auth event: " + event);
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            });

        return () => subscription.unsubscribe();
    }, []);


    const signUp = async (
        email: string,
        password: string,
        firstName: string,
        userName?: string,
    ) => {
        try {
            const {data, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        userName: userName ?? email.split("@")[0],
                    },
                },
            });
            return {data, error};
        } catch (error) {
            console.error("SignUp error: ", error)

            return {data: null, error};
        }
    }

    const signIn = async (email: string, password: string) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            return {data, error};
        } catch (error) {
            console.error("SignIn error: ", error)

            return {data: null, error};
        }
    }

    const signOut = async () => {
        try {
            const {error} = await supabase.auth.signOut();
            if (error) {
                console.error("SignOut error: ", error)
            } else {
                setUser(null);
                setSession(null);
            }
        } catch (error) {
            console.error("SignOut error: ", error)
        }
    }


    const isAuthenticated = () => {
        return !!user && !!session;
    };


    const value: AuthContextData = {
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        isAuthenticated,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;

}
