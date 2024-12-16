export const cleanBase64 = (base64String: string): string => {
    return base64String.replace(/^data:image\/[a-z]+;base64,/, '');
};

export const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};