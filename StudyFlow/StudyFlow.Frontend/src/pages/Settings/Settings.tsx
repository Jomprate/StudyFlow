import React, { useState } from 'react';
import './settings.css';
import { useTheme } from '../../ThemeContext';
import UpdateUserModal from '../../components/modals/updateUserModal/UpdateUserModal';
import { useAuth } from '../../contexts/AuthContext';

const Settings: React.FC = () => {
    const { theme } = useTheme();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const { state } = useAuth(); // Obtener el estado de autenticación desde el contexto
    const { userName } = state; // Suponiendo que el userId está en el estado de autenticación

    // Función para abrir el modal
    const handleOpenModal = () => {
        setIsUpdateModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsUpdateModalOpen(false);
    };

    return (
        <div className={`settings_page ${theme}`}>
            <div className="settings-container">
                <h1>Settings</h1>
                <p>Here are your settings.</p>

                {/* Botón para abrir el modal */}
                <button onClick={handleOpenModal}>Update</button>

                {/* Mostrar el modal solo cuando el estado isUpdateModalOpen sea true */}
                {isUpdateModalOpen && (
                    <UpdateUserModal
                        open={isUpdateModalOpen}
                        setOpen={setIsUpdateModalOpen}
                        userId={userName ?? ''} // Pasar el userId del usuario autenticado
                        targetUserId={userName ?? undefined}  // Pasar también el userId como targetUserId para auto-actualización
                    />
                )}
            </div>
        </div>
    );
};

export default Settings;