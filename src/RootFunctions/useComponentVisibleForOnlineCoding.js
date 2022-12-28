import { useState, useEffect, useRef } from 'react';

export default function useComponentVisibleForOnlineCoding(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);

    const myRef = useRef(null);

    const handleClickOutside = (event) => {
        if (myRef.current && !myRef.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);



    return { myRef, isComponentVisible, setIsComponentVisible };
}
