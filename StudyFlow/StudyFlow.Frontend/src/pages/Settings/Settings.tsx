import React, { useState } from 'react';
import './settings.css';
import { useTheme } from '../../ThemeContext';
import UpdateUserModal from '../../components/modals/updateUserModal/UpdateUserModal';
import UpdatePasswordModal from '../../components/modals/updatePasswordModal/UpdatePasswordModal';
import { useAuth } from '../../contexts/AuthContext';

const Settings: React.FC = () => {
    const { theme } = useTheme();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
    const { state } = useAuth();
    const { userName } = state;

    // Función para abrir el modal
    const handleOpenModal = () => {
        setIsUpdateModalOpen(true);
    };
    const handleOpenUpdatePasswordModal = () => {
        setIsUpdatePasswordModalOpen(true); //
    };

    return (
        <div className={`settings_page ${theme}`}>
            <div className="settings-container">
                <h1>Settings</h1>
                <p>Here are your settings.</p>

                <button onClick={handleOpenModal}>Update</button>
                <h1>a</h1>
                <button onClick={handleOpenUpdatePasswordModal}>UpdatePassword</button>

                {isUpdateModalOpen && (
                    <UpdateUserModal
                        open={isUpdateModalOpen}
                        setOpen={setIsUpdateModalOpen}
                        userId={userName ?? ''}
                        targetUserId={userName ?? undefined}
                    />
                )}

                {isUpdatePasswordModalOpen && (
                    <UpdatePasswordModal
                        open={isUpdatePasswordModalOpen}
                        setOpen={setIsUpdatePasswordModalOpen}
                        userId={userName ?? ''}
                    />
                )}
            </div>
        </div>
    );
};

export default Settings;