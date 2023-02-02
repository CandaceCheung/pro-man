import { useEffect } from "react";

export const useScreenSize = (setScreenSize: React.Dispatch<React.SetStateAction<string | null>>) => {
    useEffect(() => {
        function handleOrientationChange() {
            if (window.innerHeight <= 550) {
                setScreenSize("s");
            } else if (window.innerHeight >= 800) {
                setScreenSize("l");
            } else {
                setScreenSize("m");
            }
        }
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    },[setScreenSize]);
};