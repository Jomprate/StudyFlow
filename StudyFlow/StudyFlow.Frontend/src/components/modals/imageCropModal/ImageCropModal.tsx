import React, { useState, useEffect, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import './imageCropModal.css';
import getCroppedImg from '../../../utils/CropImage/cropImage';

interface ImageCropModalProps {
    open: boolean;
    imageSrc: string | null;
    fileName: string;
    onClose: () => void;
    onCropComplete: (croppedImage: string) => void;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({ open, imageSrc, fileName, onClose, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const [problemMessage, setProblemMessage] = useState<string>('');

    useEffect(() => {
        if (imageSrc) {
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            setCroppedAreaPixels(null);
        }
    }, [imageSrc]);

    const onCropCompleteHandler = useCallback((_, croppedPixels: { x: number; y: number; width: number; height: number }) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    const handleConfirmCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) {
            setProblemMessage('Error: No se pudo recortar la imagen correctamente.');
            return;
        }

        try {
            const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

            // Quita el prefijo "data:image/png;base64," para obtener solo los datos en base64
            const base64Data = croppedImage.replace(/^data:image\/[a-z]+;base64,/, '');

            console.log("Imagen recortada (base64 sin prefijo):", base64Data); // Imprime la imagen recortada sin el prefijo
            onCropComplete(base64Data); // Llama a onCropComplete con solo el base64 sin el prefijo
            onClose();
        } catch (error) {
            console.error('Error al recortar la imagen:', error);
            setProblemMessage('Error al recortar la imagen');
        }
    };

    if (!open || !imageSrc) return null;

    return (
        <div className="modal-overlay show">
            <div className="image-crop-modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2 className="modal-header">Recortar Imagen</h2>

                <div className="cropper-container" style={{ height: '400px', position: 'relative' }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropCompleteHandler}
                        minZoom={1}
                        maxZoom={3}
                    />
                </div>

                <p className="file-name-display">Archivo: {fileName}</p>

                <div className="zoom-slider">
                    <label>Zoom: {zoom.toFixed(2)}x</label>
                    <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="zoom-range"
                    />
                </div>

                <div className="modal-actions">
                    <button className="modal-button" onClick={onClose}>Cancelar</button>
                    <button className="modal-button" onClick={handleConfirmCrop}>Confirmar Recorte</button>
                </div>

                {problemMessage && <p className="error-message">{problemMessage}</p>}
            </div>
        </div>
    );
};

export default ImageCropModal;