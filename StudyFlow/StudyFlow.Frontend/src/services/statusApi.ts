import api from './apiConfig';

export const checkBackendStatus = async (callback: (isReady: boolean) => void) => {
    try {
        console.log("Checking backend status...");
        const response = await api.get('/Status');
        console.log("Backend response:", response.data);

        if (response.data.status === 'ready') {
            console.log("Backend is ready, setting backendReady to true");
            callback(true); // Backend is ready
        } else {
            console.warn("Backend is not ready. Retrying in 2 seconds...");
            setTimeout(() => checkBackendStatus(callback), 2000); // Retry after 2 seconds
        }
    } catch (error) {
        console.error("Error while checking backend status:", error);
        setTimeout(() => checkBackendStatus(callback), 2000); // Retry after 2 seconds on error
    }
};