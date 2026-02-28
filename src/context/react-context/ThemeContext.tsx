import { createContext, useEffect, useState } from 'react';
import type { THEMES } from '../../constants';


type ThemeType = typeof THEMES[number];

export interface IThemeContext {
    theme: ThemeType;
    updateTheme: (theme: ThemeType) => void;
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


    const updateTheme = (theme: ThemeType) => {
        return setTheme(() => theme );
    }


    return <ThemeContext.Provider value={{ theme, updateTheme }}>
        {children}
    </ThemeContext.Provider>
};



