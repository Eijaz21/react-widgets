import { useState, useEffect } from "react";

export default function Route({ path, children }) {

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {

        // Effect
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener('popstate', onLocationChange);

        return () => {
            // Cleanup
            window.removeEventListener('popstate', onLocationChange);
        }
    }, [])
   
    return  currentPath === path 
            ? children
            : null
    
};