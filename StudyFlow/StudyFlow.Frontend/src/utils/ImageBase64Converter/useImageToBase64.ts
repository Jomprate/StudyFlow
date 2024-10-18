// useImageToBase64.ts
import { useState } from 'react';

const useImageToBase64 = () => {
    // Estado para almacenar el Base64 generado
    const [base64, setBase64] = useState<string | null>(null);

    // Función que convierte una imagen (File) a una cadena Base64
    const convertImageToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                const result = reader.result as string;
                setBase64(result); // Almacena el resultado en el estado
                resolve(result); // Devuelve el resultado como promesa
            };

            reader.onerror = (error) => {
                reject(`Error al convertir la imagen a Base64: ${error}`);
            };

            // Leer el archivo y convertirlo a Base64
            reader.readAsDataURL(file);
        });
    };

    return { base64, convertImageToBase64 };
};

export default useImageToBase64;