import React from 'react';
import { useTheme } from '../../ThemeContext';
import { useTranslation } from 'react-i18next';
import './pagination.css';

interface PaginationProps {
    totalPages: number; // Total de páginas calculadas en el componente principal
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

    // Navegar a la página anterior
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    // Navegar a la página siguiente
    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // Manejar el cambio en la cantidad de registros por página
    const handleRecordsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRecordsPerPage = parseInt(event.target.value, 10);

        // Calcular el índice del primer ítem en la página actual
        const firstItemIndex = (currentPage - 1) * recordsPerPage;

        // Calcular la nueva página en función del nuevo número de registros por página
        const newPage = Math.floor(firstItemIndex / newRecordsPerPage) + 1;

        // Pasamos el nuevo número de registros y la nueva página calculada
        onRecordsPerPageChange(newRecordsPerPage, newPage);
    };

    return (
        <div className={`pagination-container ${theme}`}>
            <button onClick={handlePrev} disabled={currentPage === 1}>
                {t('pagination_previous')}
            </button>
            <span>{t('pagination_pageInfo', { currentPage, totalPages })}</span> {/* Mostrar página actual y total */}
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                {t('pagination_next')}
            </button>
            <div className="records-per-page-container">
                <label htmlFor="recordsPerPage">{t('pagination_recordsPerPage')}</label> {/* Traducción para "Records per page" */}
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