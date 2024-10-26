import React from 'react';
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

    enum RecordsPerPageOptions {
        Five = 5,
        Ten = 10,
        Twenty = 20,
        Fifty = 50,
        All = -1,
    }

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const handleRecordsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRecordsPerPage = parseInt(event.target.value, 10);

        // Calcula la nueva página actual basada en la posición del primer elemento y el nuevo límite de registros
        const firstItemIndex = (currentPage - 1) * recordsPerPage;
        const newPage = Math.floor(firstItemIndex / newRecordsPerPage) + 1;

        onRecordsPerPageChange(newRecordsPerPage, newPage);
    };

    return (
        <div className={`pagination-container ${theme}`}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                {t('pagination_previous')}
            </button>
            <span>{t('pagination_pageInfo', { currentPage, totalPages })}</span>
            <button onClick={handleNext} disabled={currentPage >= totalPages}>
                {t('pagination_next')}
            </button>
            <div className="records-per-page-container">
                <label htmlFor="recordsPerPage">{t('pagination_recordsPerPage')}</label>
                <select
                    id="recordsPerPage"
                    value={recordsPerPage}
                    onChange={handleRecordsPerPageChange}
                >
                    <option value={RecordsPerPageOptions.Five}>5</option>
                    <option value={RecordsPerPageOptions.Ten}>10</option>
                    <option value={RecordsPerPageOptions.Twenty}>20</option>
                    <option value={RecordsPerPageOptions.Fifty}>50</option>
                    <option value={RecordsPerPageOptions.All}>{t('pagination_showAll')}</option>
                </select>
            </div>
        </div>
    );
};

export default Pagination;
