// themeContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvidered = (props: ThemeProviderProps) => {
    const [theme, setTheme] = useState<string>('light');

useEffect(() => {
    // Check if the window object is available and if the user has set a preferred theme in their browser
    if (typeof window !== 'undefined') {
        const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(preferredTheme);
    }
}, []);

return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        {props.children}
    </ThemeContext.Provider>
);
};
