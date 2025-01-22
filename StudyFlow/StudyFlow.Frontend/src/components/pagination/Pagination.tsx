import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';
import { useTranslation } from 'react-i18next';
import './pagination.css';

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    recordsPerPage: number;
    onRecordsPerPageChange: (recordsPerPage: number, newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    onPageChange,
    recordsPerPage,
    onRecordsPerPageChange,
}) => {
    const { theme } = useTheme();
    const { t } = useTranslation();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const RecordsPerPageOptions = {
        Five: 5,
        Ten: 10,
        Twenty: 20,
        Fifty: 50,
        All: 1000,
    };

    const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
    const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

    const handleRecordsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRecordsPerPage = parseInt(event.target.value, 10);
        const newPage = Math.floor(((currentPage - 1) * recordsPerPage) / newRecordsPerPage) + 1;
        onRecordsPerPageChange(newRecordsPerPage, newPage);
    };

    return (
        <div className={`pagination-container ${theme}`}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                {isSmallScreen ? '◀' : t('pagination_previous')}
            </button>

            <span>
                {isSmallScreen
                    ? `${currentPage}/${totalPages}`
                    : t('pagination_pageInfo', { currentPage, totalPages })}
            </span>

            <button onClick={handleNext} disabled={currentPage >= totalPages}>
                {isSmallScreen ? '▶' : t('pagination_next')}
            </button>

            {!isSmallScreen && (
                <div className="records-per-page-container">
                    <label htmlFor="recordsPerPage">{t('pagination_recordsPerPage')}</label>
                    <select
                        id="recordsPerPage"
                        value={recordsPerPage}
                        onChange={handleRecordsPerPageChange}
                    >
                        {Object.values(RecordsPerPageOptions).map((value) => (
                            <option key={value} value={value}>
                                {value === RecordsPerPageOptions.All
                                    ? t('pagination_showAll')
                                    : value}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Pagination;
