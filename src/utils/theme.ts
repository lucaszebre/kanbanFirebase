import { Theme, createTheme } from '@mui/material/styles';

const lightTheme: Theme = createTheme({
    palette: {
        mode: 'light',
        // Add any additional theme customizations here
    },
    });

    const darkTheme: Theme = createTheme({
    palette: {
        mode: 'dark',
        // Add any additional theme customizations here
    },
});

export { lightTheme, darkTheme };