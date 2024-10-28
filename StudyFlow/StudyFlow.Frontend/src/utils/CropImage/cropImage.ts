export default async function getCroppedImg(
    imageSrc: string,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
): Promise<string> {
    const image = new Image();
    image.src = imageSrc;

    // Espera a que la imagen se cargue completamente
    await new Promise<void>((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
    });

    // Crear un canvas temporal con el tamaño exacto del área de recorte
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = croppedAreaPixels.width;
    tempCanvas.height = croppedAreaPixels.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) {
        throw new Error('No se pudo obtener el contexto del canvas temporal.');
    }

    // Dibuja la sección recortada en el canvas temporal
    tempCtx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
    );

    // Crear el canvas final de 256x256 para escalar la imagen recortada
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 256;
    finalCanvas.height = 256;
    const finalCtx = finalCanvas.getContext('2d');

    if (!finalCtx) {
        throw new Error('No se pudo obtener el contexto del canvas final.');
    }

    // Escalar la imagen recortada al tamaño de 256x256
    finalCtx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, 256, 256);

    // Convertir el canvas a una imagen en base64 y eliminar el prefijo
    return new Promise((resolve, reject) => {
        finalCanvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Error al generar el blob'));
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                // Remover el prefijo "data:image/png;base64," para que solo quede el contenido base64
                const base64Data = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
                resolve(base64Data);
            };
        }, 'image/png'); // Establecer el tipo de imagen en 'image/png' o 'image/jpeg'
    });
}
