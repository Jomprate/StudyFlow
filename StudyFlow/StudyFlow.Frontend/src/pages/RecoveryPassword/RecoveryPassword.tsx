import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Popup from '../../components/modals/PopUp/PopUp'; // Importar el Popup
import './RecoveryPassword.css';
import { ResetPassword } from '../../services/api'; // Aseg�rate de importar tu funci�n de API

const ResetPasswordPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Para redireccionar
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el popup
    const [popupMessage, setPopupMessage] = useState(''); // Estado para el mensaje del Popup

    const ResetPasswordRequestDTO: { UserId: string; NewPassword: string; Token: string; } = {
        UserId: '',
        NewPassword: '',
        Token: '',
    };
    // Obtener el token de los par�metros de la URL
    const query = new URLSearchParams(useLocation().search);
    const token = decodeURIComponent(query.get('token')); // Decodificar el token
    const userid = new URLSearchParams(location.search).get('user');

    if (token == null || userid == null) {
        //setPopupMessage('Error'); // Establecer el mensaje del Popup
        //setShowPopup(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage("Las contrase�as no coinciden.");
            return;
        }

        try {
            ResetPasswordRequestDTO.NewPassword = newPassword;
            ResetPasswordRequestDTO.UserId = userid || '';
            ResetPasswordRequestDTO.Token = token || '';
            let result = await ResetPassword(ResetPasswordRequestDTO); // Asumiendo que tu funci�n de API acepta el token y la nueva contrase�a
            setSuccessMessage("Contrase�a restablecida con �xito.");
            setPopupMessage(result); // Establecer el mensaje del Popup
            setShowPopup(true);
            setErrorMessage(''); // Limpiar el mensaje de error si fue exitoso
        } catch (error) {
            setErrorMessage("Error al restablecer la contrase�a. Int�ntalo de nuevo.");
            setSuccessMessage(''); // Limpiar el mensaje de �xito si ocurri� un error
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Restablecer Contrase�a</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="newPassword">Nueva Contrase�a:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar Contrase�a:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Restablecer Contrase�a</button>
            </form>
            {/* Renderizaci�n condicional del Popup */}
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