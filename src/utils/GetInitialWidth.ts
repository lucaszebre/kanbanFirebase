export const getInitialWindowWidth = () => {
    // Check if the window object is available
    if (typeof window !== 'undefined') {
        return window.innerWidth;
    }
    // Return a default width if the window object is not available
    return 1024;
};