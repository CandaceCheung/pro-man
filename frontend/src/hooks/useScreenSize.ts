import { useEffect } from "react";

export const useScreenSize = (setScreenSize: React.Dispatch<React.SetStateAction<string | null>>) => {
    useEffect(() => {
        function handleScreenSize() {
            if (window.innerHeight <= 550) {
                setScreenSize("s");
            } else if (window.innerHeight >= 800) {
                setScreenSize("l");
            } else {
                setScreenSize("m");
            }
        }
        window.addEventListener('load', handleScreenSize);
        window.addEventListener('orientationchange', handleScreenSize);
        return () => {
            window.removeEventListener('load', handleScreenSize);
            window.removeEventListener('orientationchange', handleScreenSize);
        };
    },[setScreenSize]);
};