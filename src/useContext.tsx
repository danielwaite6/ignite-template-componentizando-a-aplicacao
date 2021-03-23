import { createContext, ReactNode, useState } from "react";

interface TransactionsProviderProps {
    children: ReactNode;
};


export const TransactionsContext = createContext({
    data: {},
    toggleTheme: (val: number) => {
        return val
    },
});

export function TransactionsProvider({children}: TransactionsProviderProps) {

    const [valor, setValor] = useState(1);

    return (
        <TransactionsContext.Provider value={{
            data: valor,
            toggleTheme: (val: number) => {
                setValor(val)
                return val
            },
            
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}