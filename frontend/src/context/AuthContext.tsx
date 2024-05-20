import { createContext, useReducer, useEffect } from 'react';

export const AuthContext = createContext(null);

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

// @ts-ignore
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    useEffect(() => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user')!);
            if (user) {
                dispatch({ type: 'LOGIN', payload: user })
            }
        }
    }, []);

    console.log('AuthContext state:', state);


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );

}