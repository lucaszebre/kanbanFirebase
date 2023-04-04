// customTheme.js or customTheme.ts
import { extendTheme } from "@chakra-ui/react";

    const customTheme = extendTheme({
    styles: {
        global: {
        // styles for the `body`
        body: {
            bg: "#20212C", // Replace with your desired color, e.g., "gray.100".
        },
        },
    },
    });

export default customTheme;