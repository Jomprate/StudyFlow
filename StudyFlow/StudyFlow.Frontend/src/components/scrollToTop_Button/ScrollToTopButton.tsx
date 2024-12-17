import React, { useState, useEffect } from 'react';
import './scrollToTopButton.css';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            setIsVisible(scrollTop > 20);
        };

        document.documentElement.addEventListener('scroll', toggleVisibility);
        document.body.addEventListener('scroll', toggleVisibility);

        return () => {
            document.documentElement.removeEventListener('scroll', toggleVisibility);
            document.body.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const handleScrollToTop = () => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
        document.body.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'show' : 'hide'}`}
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTopButton;