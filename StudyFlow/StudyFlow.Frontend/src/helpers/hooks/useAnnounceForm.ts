import { announceApi } from '../../services/api';

interface UseAnnounceFormParams {
    youtubeLinksManager: { links: string[]; clearLinks: () => void };
    googleDriveLinksManager: { links: string[]; clearLinks: () => void };
    otherLinksManager: { links: string[]; clearLinks: () => void };
    editorRef: React.RefObject<HTMLDivElement>;
    courseId: string | undefined;
    state: { userName?: string; fullName?: string };
    title: string;
    onAnnounceCreated: (data: any) => void;
}

export const useAnnounceForm = ({
    youtubeLinksManager,
    googleDriveLinksManager,
    otherLinksManager,
    editorRef,
    courseId,
    state,
    title,
    onAnnounceCreated,
}: UseAnnounceFormParams) => {
    const validateForm = (): boolean => {
        if (!editorRef.current || !courseId) {
            console.error("Editor or courseId is missing.");
            return false;
        }
        if (!state.userName) {
            console.error("UserID is missing.");
            return false;
        }
        if (!title.trim()) {
            console.error("Title is missing.");
            return false;
        }
        return true;
    };

    const buildAnnounceDTO = () => {
        const htmlContent = editorRef.current!.innerHTML.trim();
        return {
            title,
            htmlContent,
            userId: state.userName!.toString(),
            courseId: courseId!,
            youTubeVideos: youtubeLinksManager.links,
            googleDriveLinks: googleDriveLinksManager.links,
            alternateLinks: otherLinksManager.links,
        };
    };

    const resetForm = () => {
        youtubeLinksManager.clearLinks();
        googleDriveLinksManager.clearLinks();
        otherLinksManager.clearLinks();
        if (editorRef.current) editorRef.current.innerHTML = '';
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const addAnnounceDTO = buildAnnounceDTO();

        try {
            const response = await announceApi.createAnnounce(addAnnounceDTO);

            if (response.data) {
                onAnnounceCreated({
                    ...response.data,
                    creationDate: new Date().toISOString(),
                    userName: state.fullName || "Unknown User",
                });
                resetForm();
            }
        } catch (error: any) {
            console.error("Error creating announcement:", error.message || error);
        }
    };

    return { handleSubmit };
};