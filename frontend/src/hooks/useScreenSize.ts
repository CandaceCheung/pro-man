import { useEffect } from "react";

export const useScreenSize = (setScreenSize: React.Dispatch<React.SetStateAction<string | null>>) => {
    useEffect(() => {
        handleScreenSize();
        function handleScreenSize() {
            if (window.innerHeight <= 550) {
                setScreenSize("s");
            } else if (window.innerHeight >= 800) {
                setScreenSize("l");
            } else {
                setScreenSize("m");
            }
        }
        window.addEventListener('orientationchange', handleScreenSize);
        return () => {
            window.removeEventListener('orientationchange', handleScreenSize);
        };
    },[setScreenSize]);
};