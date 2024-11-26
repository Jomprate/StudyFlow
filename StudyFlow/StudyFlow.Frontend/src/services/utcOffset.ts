import api from './apiConfig';

interface AdjustDateRequest {
    date: string; // Fecha en formato ISO
    utcOffset: number; // Offset en horas, positivo o negativo
}

interface AdjustDateResponse {
    originalDateUtc: string; // Fecha original en UTC
    adjustedDate: string; // Fecha ajustada
    utcOffset: number; // Offset aplicado
}

const adjustDate = async (request: AdjustDateRequest): Promise<AdjustDateResponse> => {
    try {
        const response = await api.post<AdjustDateResponse>("localization/adjust-date", request);
        return response.data;
    } catch (error) {
        console.error("Error adjusting date:", error);
        throw error;
    }
};

export default adjustDate;