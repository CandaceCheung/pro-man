import { useEffect } from "react";

export const useOrientation = (setLandscape: React.Dispatch<React.SetStateAction<boolean>>) => {
    useEffect(() => {
        function handleOrientationChange() {
            setLandscape(window.innerWidth > window.innerHeight);
        }
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    },[setLandscape]);
};