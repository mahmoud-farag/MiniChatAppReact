import { createContext, useEffect, useState } from 'react';


type ThemeType = 'light' | 'dark';

export interface IThemeContext {
    theme: ThemeType;
    toggleTheme: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<IThemeContext | null>(null);


interface IProps {
    children: React.ReactNode;
};
export default function ThemeProvider ({ children }: IProps) {

    const [theme, setTheme] = useState<ThemeType>(() => {

        const storedTheme = localStorage.getItem('chatAppTheme') as ThemeType;

        if (storedTheme) 
            return storedTheme;

        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        
        return preferredTheme;
    });


    useEffect(() => {

        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('chatAppTheme', theme);

    }, [theme]);


    const toggleTheme = () => {
        return setTheme((prev) => prev === 'dark' ? 'light' : 'dark');
    }


    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
    </ThemeContext.Provider>
};



