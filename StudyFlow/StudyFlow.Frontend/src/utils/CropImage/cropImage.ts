import { PixelCrop } from 'react-image-crop';

export default async function getCroppedImg(imageSrc: string, crop: PixelCrop): Promise<string> {
    const image = new Image();
    image.src = imageSrc;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const targetWidth = 512;
    const targetHeight = 512;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    if (!ctx) {
        throw new Error('No se pudo obtener el contexto del canvas.');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        targetWidth,
        targetHeight
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Error al generar el blob'));
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
        });
    });
}