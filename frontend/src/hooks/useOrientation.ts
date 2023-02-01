import { useEffect } from "react";

export const useOrientation = (setLandscape: React.Dispatch<React.SetStateAction<boolean>>) => {
    useEffect(() => {
        function handleOrientationChange() {
            // these are width and height of original screen
            // so when original innerWidth < original innerHeight, new orientation will be landscape
            setLandscape(window.innerWidth < window.innerHeight);
        }
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    },[]);
};