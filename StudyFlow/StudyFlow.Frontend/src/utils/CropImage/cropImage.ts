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

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = croppedAreaPixels.width;
    tempCanvas.height = croppedAreaPixels.height;
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) {
        throw new Error('No se pudo obtener el contexto del canvas temporal.');
    }

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

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = 256;
    finalCanvas.height = 256;
    const finalCtx = finalCanvas.getContext('2d');

    if (!finalCtx) {
        throw new Error('No se pudo obtener el contexto del canvas final.');
    }

    finalCtx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, 256, 256);

    return new Promise((resolve, reject) => {
        finalCanvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Error al generar el blob'));
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64Data = (reader.result as string).replace(/^data:image\/[a-z]+;base64,/, '');
                resolve(base64Data);
            };
        }, 'image/png');
    });
}