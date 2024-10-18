// useBase64ToImage.ts
const useBase64ToImage = () => {
    // Función para convertir una cadena Base64 en una URL de imagen
    const convertBase64ToImage = (base64: string): string => {
        // Simplemente devolver la cadena Base64 como fuente de imagen
        return base64;
    };

    return { convertBase64ToImage };
};

export default useBase64ToImage;