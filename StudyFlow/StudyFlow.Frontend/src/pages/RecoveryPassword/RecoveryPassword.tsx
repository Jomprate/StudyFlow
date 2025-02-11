import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from '../../components/modals/PopUp/PopUp';
import './RecoveryPassword.css';
import { authApi } from '../../services/api';

const ResetPasswordPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const ResetPasswordRequestDTO: { UserId: string; NewPassword: string; Token: string; } = {
        UserId: '',
        NewPassword: '',
        Token: '',
    };
    /*const query = new URLSearchParams(useLocation().search);*/
    const token = decodeURIComponent(new URLSearchParams(location.search).get('token') || '');
    const userid = new URLSearchParams(location.search).get('user');

    if (token == null || userid == null) {
        //setPopupMessage('Error'); // Establecer el mensaje del Popup
        //setShowPopup(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        try {
            ResetPasswordRequestDTO.NewPassword = newPassword;
            ResetPasswordRequestDTO.UserId = userid || '';
            ResetPasswordRequestDTO.Token = token || '';
            let result = await authApi.ResetPassword(ResetPasswordRequestDTO);
            setSuccessMessage("Contraseña restablecida con éxito.");
            setPopupMessage(result);
            setShowPopup(true);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage("Error al restablecer la contraseña. Inténtalo de nuevo.");
            setSuccessMessage('');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Restablecer Contraseña</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newPassword">Nueva Contraseña:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Restablecer Contraseña</button>
            </form>
            {/* Renderización condicional del Popup */}
            {
                showPopup && (
                    <Popup
                        message={popupMessage}
                        onClose={() => { setShowPopup(false); navigate('/') }} // Cerrar el popup cuando el usuario haga clic en OK
                    />
                )
            }
        </div >
    );
};

export default ResetPasswordPage;